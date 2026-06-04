import { ref } from 'vue'

const playing = ref(false)
let ctx = null
let timer = null
let nextTime = 0
let step = 0

const BPM = 152
const T16 = () => (60 / BPM) / 4

const riff = [
  [.85,0],[.45,0],[0,0],[.65,0],  [.45,0],[0,0],[.65,0],[0,0],
  [.85,0],[.45,0],[0,0],[.65,0],  [.45,0],[0,0],[.72,1],[.85,0],
  [.85,0],[.45,0],[0,0],[.65,0],  [.45,0],[0,0],[.65,0],[0,0],
  [.85,0],[0,0],  [.65,0],[0,0],  [.85,2],[.65,1],[.85,0],[0,0],
]

const chords  = [[82.4,123.5],[73.4,110.0],[65.4,98.0]]
const kickP   = [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0]
const snareP  = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
const hhP     = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]

let distCurve = null

function buildDist() {
  const n = 512; distCurve = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i*2)/n - 1
    distCurve[i] = (Math.PI+360)*x / (Math.PI+360*Math.abs(x))
  }
}

function initCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  if (!distCurve) buildDist()
}

function pump() {
  while (nextTime < ctx.currentTime + 0.28) {
    schedStep(step, nextTime)
    step = (step + 1) % 32
    nextTime += T16()
  }
}

function schedStep(s, t) {
  if (kickP[s])  kick(t)
  if (snareP[s]) snare(t)
  if (hhP[s])    hihat(t)
  const [vel, ch] = riff[s]
  if (vel > 0) guitar(t, vel, ch)
}

function guitar(t, vel, ch) {
  const freqs = chords[ch], dur = T16() * 0.62
  const dist = ctx.createWaveShaper(); dist.curve = distCurve; dist.oversample = '4x'
  const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2400; lp.Q.value=1.6
  dist.connect(lp)
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value=-18; comp.ratio.value=6
  lp.connect(comp)
  const env = ctx.createGain()
  env.gain.setValueAtTime(0,t)
  env.gain.linearRampToValueAtTime(vel*.40, t+.006)
  env.gain.exponentialRampToValueAtTime(vel*.28, t+dur*.5)
  env.gain.exponentialRampToValueAtTime(.001, t+dur)
  comp.connect(env); env.connect(ctx.destination)
  freqs.forEach(f => {
    [-1,+1].forEach(d => {
      const o = ctx.createOscillator(); o.type='sawtooth'; o.frequency.value=f*(1+d*.003)
      const g = ctx.createGain(); g.gain.value=.22
      o.connect(g); g.connect(dist); o.start(t); o.stop(t+dur+.01)
    })
  })
  const sub = ctx.createOscillator(); sub.type='sine'; sub.frequency.value=freqs[0]/2
  const se = ctx.createGain()
  se.gain.setValueAtTime(0,t); se.gain.linearRampToValueAtTime(vel*.38,t+.008); se.gain.exponentialRampToValueAtTime(.001,t+dur)
  sub.connect(se); se.connect(ctx.destination); sub.start(t); sub.stop(t+dur+.01)
}

function kick(t) {
  const o = ctx.createOscillator(); o.type='sine'
  o.frequency.setValueAtTime(140,t); o.frequency.exponentialRampToValueAtTime(30,t+.2)
  const e = ctx.createGain(); e.gain.setValueAtTime(1.5,t); e.gain.exponentialRampToValueAtTime(.001,t+.3)
  o.connect(e); e.connect(ctx.destination); o.start(t); o.stop(t+.32)
  const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate*.015), ctx.sampleRate)
  const d = b.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1
  const ns = ctx.createBufferSource(); ns.buffer=b
  const g = ctx.createGain(); g.gain.value=.55
  ns.connect(g); g.connect(ctx.destination); ns.start(t)
}

function snare(t) {
  const o = ctx.createOscillator(); o.type='triangle'
  o.frequency.setValueAtTime(230,t); o.frequency.exponentialRampToValueAtTime(95,t+.1)
  const e = ctx.createGain(); e.gain.setValueAtTime(.55,t); e.gain.exponentialRampToValueAtTime(.001,t+.14)
  o.connect(e); e.connect(ctx.destination); o.start(t); o.stop(t+.15)
  const buf = ctx.createBuffer(1,Math.floor(ctx.sampleRate*.18),ctx.sampleRate)
  const d = buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1
  const ns = ctx.createBufferSource(); ns.buffer=buf
  const bp = ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=3800; bp.Q.value=.85
  const g = ctx.createGain(); g.gain.setValueAtTime(.7,t); g.gain.exponentialRampToValueAtTime(.001,t+.17)
  ns.connect(bp); bp.connect(g); g.connect(ctx.destination); ns.start(t)
}

function hihat(t) {
  const buf = ctx.createBuffer(1,Math.floor(ctx.sampleRate*.035),ctx.sampleRate)
  const d = buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1
  const ns = ctx.createBufferSource(); ns.buffer=buf
  const hp = ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=8000
  const g = ctx.createGain(); g.gain.setValueAtTime(.20,t); g.gain.exponentialRampToValueAtTime(.001,t+.035)
  ns.connect(hp); hp.connect(g); g.connect(ctx.destination); ns.start(t)
}

export function useMetalSynth() {
  function startSynth() {
    try {
      initCtx()
      step = 0; nextTime = ctx.currentTime + 0.05
      pump()
      timer = setInterval(pump, 30)
      playing.value = true
    } catch {}
  }

  function stopSynth() {
    clearInterval(timer); timer = null
    playing.value = false
  }

  function toggleSynth() {
    playing.value ? stopSynth() : startSynth()
  }

  return { playing, startSynth, stopSynth, toggleSynth }
}
