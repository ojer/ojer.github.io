const MODES = [
  [5, 5, 10],
  [4, 6, 15],
  [4, 6, 20],
];

const elMain = globalThis.document.getElementById("main");
const elWater = globalThis.document.getElementById("water");
const elMoon = globalThis.document.getElementById("moon");
const elMode = globalThis.document.getElementById("mode");
const elTime = globalThis.document.getElementById("time");
const elFull = globalThis.document.getElementById("full");
const elMuted = globalThis.document.getElementById("muted");

let zero = 0;
let status = 0;
let mode = -1;
let raf = -1;
let rafCancel = false;
let timerStart = 0;
let t0, t1, t2;

let muted = true;
let audioContext;
let wakeLock;

const playTone = (toneType, duration) => {
  if (muted || !audioContext) {
    return;
  }

  const freq = [
    // 0 = inhale: avg 167 Hz, beat 6 Hz (Theta)
    [170, 164],
    // 1 = exhale: avg 157 Hz, beat 6 Hz (Theta)
    [160, 154],
  ];
  const [leftHz, rightHz] = freq[toneType];
  const startTime = audioContext.currentTime;
  const stopTime = startTime + duration;

  [-1, 1].forEach((pan, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const panner = audioContext.createStereoPanner();
    osc.type = "sine";
    osc.frequency.setValueAtTime(i === 0 ? leftHz : rightHz, startTime);
    gain.gain.setValueAtTime(1.0, startTime);
    gain.gain.linearRampToValueAtTime(0.01, stopTime);
    panner.pan.setValueAtTime(pan, startTime);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(audioContext.destination);
    osc.start(startTime);
    osc.stop(stopTime);
  });
};

const acquireWakeLock = async () => {
  try {
    if (globalThis.navigator.wakeLock) {
      wakeLock = await globalThis.navigator.wakeLock.request("screen");
    }
  } catch {
    //ignore
  }
};

const releaseWakeLock = () => {
  wakeLock?.release();
  wakeLock = null;
};

const foo = () => {
  const elapsed = Date.now() - timerStart;
  const tms = Math.max(0, t2 - elapsed);
  const tss = Math.ceil(tms / 1000);
  const mm = String(Math.floor(tss / 60)).padStart(2, "0");
  const ss = String(Math.floor(tss % 60)).padStart(2, "0");
  elTime.textContent = `${mm}:${ss}`;

  const t = Date.now() - zero;
  if (status === 0) {
    elWater.style.height = `${(t / t0) * 100}%`;
    if (t >= t0) {
      zero = Date.now();
      status = 1;
      playTone(status, MODES[mode][status]);
    }
  } else {
    elWater.style.height = `${100 - (t / t1) * 100}%`;
    if (t >= t1) {
      zero = Date.now();
      status = 0;
      playTone(status, MODES[mode][status]);
    }
  }
  if (rafCancel || tss === 0) {
    if (tss === 0) releaseWakeLock();
    return;
  }
  raf = globalThis.requestAnimationFrame(foo);
};

const start = () => {
  t0 = MODES[mode][0] * 1000;
  t1 = MODES[mode][1] * 1000;
  t2 = MODES[mode][2] * 60 * 1000;

  elMode.textContent = `${MODES[mode][0]},${MODES[mode][1]}`;
  rafCancel = true;
  globalThis.cancelAnimationFrame(raf);
  timerStart = Date.now();
  zero = Date.now();
  status = 0;
  rafCancel = false;
  elWater.style.height = `0%`;
  releaseWakeLock();
  acquireWakeLock();
  raf = globalThis.requestAnimationFrame(foo);
};

const genMoon = (mSize = 0.382) => {
  const size = elMoon.offsetHeight;
  elMoon.setAttribute("width", size);
  elMoon.setAttribute("height", size);
  const ctx = elMoon.getContext("2d");
  const center = size >> 1;
  ctx.beginPath();
  ctx.arc(center, center, center * mSize, Math.PI * 1.5, Math.PI * 0.5);
  ctx.fillStyle = "#D6ECF0";
  ctx.fill();
};

const changeMode = (e) => {
  e.preventDefault();
  e.stopPropagation();
  mode = mode >= MODES.length - 1 ? 0 : mode + 1;
  start();
};

const muteChange = () => {
  if (muted) {
    elMuted.setAttribute("style", "color:red");
    muted = false;
    if (!audioContext) {
      if (globalThis.AudioContext) {
        audioContext = new globalThis.AudioContext();
      } else {
        audioContext = new globalThis.webkitAudioContext();
      }
      audioContext.resume();
    }
  } else {
    elMuted.setAttribute("style", "color:inherit");
    muted = true;
  }
};
const fullScreen = () => {
  globalThis.document.fullscreen
    ? globalThis.document.exitFullscreen()
    : globalThis.document.body.requestFullscreen();
};

elMuted.addEventListener("click", muteChange);
elFull.addEventListener("click", fullScreen);
elMain.addEventListener("click", changeMode);

globalThis.document.addEventListener("visibilitychange", () => {
  if (globalThis.document.visibilityState === "visible" && timerStart > 0) {
    acquireWakeLock();
  }
});

genMoon();
