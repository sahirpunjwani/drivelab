/**
 * DRIVELAB — 3D Open-World Racing Adventure
 * Core Game Engine: Three.js, Arcade Physics, Multi-World Streaming,
 * Procedural PBR Vehicles, Web Audio Synthesizer, AI Traffic & Campaign
 */

// ============================================================================
// 1. DATA DEFINITIONS & CONSTANTS
// ============================================================================

const STORAGE_KEY = 'drivelab_save_data_v1';

// 12 Distinct Unlockable Vehicles
const CAR_DATABASE = [
  {
    id: 'apex_pulse',
    name: 'Apex Pulse',
    tier: 'Tier 1 · Compact Sports',
    price: 0,
    unlocked: true,
    topSpeed: 220,       // km/h
    accelTime: 3.6,      // 0-100 km/h in seconds (fast, responsive)
    handling: 0.88,      // Cornering grip & stability
    braking: 0.85,       // Stopping power
    mass: 1200,          // kg
    driftFactor: 0.78,
    color: '#00f0ff',
    desc: 'Lightweight, nimble front-engine sport hatch. Balanced and forgiving for rookie drivers.'
  },
  {
    id: 'veloce_gt',
    name: 'Veloce GT',
    tier: 'Tier 1 · Japanese Tuner',
    price: 3200,
    unlocked: false,
    topSpeed: 236,
    accelTime: 3.2,
    handling: 0.90,
    braking: 0.88,
    mass: 1150,
    driftFactor: 0.88,
    color: '#f43f5e',
    desc: 'High-revving twin-cam coupe engineered for agile transitions and tight apex clips.'
  },
  {
    id: 'thunder_v8',
    name: 'Thunder V8',
    tier: 'Tier 2 · Street Muscle',
    price: 6500,
    unlocked: false,
    topSpeed: 255,
    accelTime: 2.9,
    handling: 0.82,
    braking: 0.82,
    mass: 1580,
    driftFactor: 0.94,
    color: '#eab308',
    desc: 'Raw American supercharged V8 torque. Roaring straight-line pace and heavy power slides.'
  },
  {
    id: 'aero_rs',
    name: 'Aero RS',
    tier: 'Tier 2 · Euro Coupe',
    price: 9000,
    unlocked: false,
    topSpeed: 265,
    accelTime: 2.7,
    handling: 0.92,
    braking: 0.90,
    mass: 1350,
    driftFactor: 0.82,
    color: '#3b82f6',
    desc: 'German precision coupe with active aero and carbon ceramic braking balance.'
  },
  {
    id: 'stratos_rwd',
    name: 'Stratos RWD',
    tier: 'Tier 2 · Drift Specialist',
    price: 12500,
    unlocked: false,
    topSpeed: 250,
    accelTime: 2.8,
    handling: 0.89,
    braking: 0.86,
    mass: 1220,
    driftFactor: 1.15,
    color: '#a855f7',
    desc: 'Aggressive widebody drift weapon with modified steering angle and progressive rear slip.'
  },
  {
    id: 'kodiak_wrc',
    name: 'Kodiak WRC',
    tier: 'Tier 3 · Rally AWD',
    price: 16000,
    unlocked: false,
    topSpeed: 260,
    accelTime: 2.4,
    handling: 0.96,
    braking: 0.92,
    mass: 1280,
    driftFactor: 0.80,
    color: '#10b981',
    desc: 'All-wheel-drive gravel and asphalt conqueror with supreme highland traction and stability.'
  },
  {
    id: 'monza_gt',
    name: 'Monza GT',
    tier: 'Tier 3 · Grand Tourer',
    price: 21000,
    unlocked: false,
    topSpeed: 290,
    accelTime: 2.3,
    handling: 0.91,
    braking: 0.92,
    mass: 1520,
    driftFactor: 0.76,
    color: '#06b6d4',
    desc: 'V12 endurance grand tourer designed for sustained high-speed highway domination.'
  },
  {
    id: 'phantom_spyder',
    name: 'Phantom Spyder',
    tier: 'Tier 3 · Mid-Engine Exotic',
    price: 27500,
    unlocked: false,
    topSpeed: 305,
    accelTime: 2.0,
    handling: 0.95,
    braking: 0.94,
    mass: 1290,
    driftFactor: 0.84,
    color: '#ffffff',
    desc: 'Low-slung Italian thoroughbred with laser-sharp steering response and howling V10 pitch.'
  },
  {
    id: 'vortex_hyper',
    name: 'Vortex Hyper',
    tier: 'Tier 4 · Track Hypercar',
    price: 36000,
    unlocked: false,
    topSpeed: 330,
    accelTime: 1.8,
    handling: 0.97,
    braking: 0.96,
    mass: 1180,
    driftFactor: 0.80,
    color: '#f97316',
    desc: 'Monocoque carbon construction and extreme ground-effect tunnels for razor track pacing.'
  },
  {
    id: 'cyberion_ev',
    name: 'Cyberion EV',
    tier: 'Tier 4 · Dual-Motor Electric',
    price: 44000,
    unlocked: false,
    topSpeed: 345,
    accelTime: 1.5,
    handling: 0.96,
    braking: 0.95,
    mass: 1650,
    driftFactor: 0.85,
    color: '#00f0ff',
    desc: 'Quad-motor vectoring electric hypercar with instantaneous torque and cyan underglow.'
  },
  {
    id: 'titan_enforcer',
    name: 'Titan Enforcer',
    tier: 'Tier 4 · Pursuit Interceptor',
    price: 52000,
    unlocked: false,
    topSpeed: 315,
    accelTime: 2.1,
    handling: 0.93,
    braking: 0.95,
    mass: 1850,
    driftFactor: 0.75,
    color: '#1e293b',
    desc: 'Reinforced tactical interceptor built to shatter road blockades and hunt rivals.'
  },
  {
    id: 'nemesis_proto',
    name: 'Nemesis Prototype',
    tier: 'Tier 5 · Championship Le Mans',
    price: 75000,
    unlocked: false,
    topSpeed: 370,
    accelTime: 1.3,
    handling: 0.99,
    braking: 0.98,
    mass: 980,
    driftFactor: 0.82,
    color: '#8b5cf6',
    desc: 'The pinnacle of prototype engineering. Dominates every corner with unmatched downforce.'
  }
];

// Paint Colors for Visual Customization
const PAINT_PALETTE = [
  '#00f0ff', '#0077ff', '#a855f7', '#ec4899', '#ef4444', '#f97316',
  '#facc15', '#22c55e', '#ffffff', '#94a3b8', '#1e293b', '#050505'
];

// Campaign Missions & Events
const CAMPAIGN_MISSIONS = [
  {
    id: 'm1_metro_circuit',
    title: 'Apex Raceway Grand Prix',
    chapter: 'CHAPTER 1: THE ROOKIE',
    world: 'raceway',
    type: 'CIRCUIT RACE',
    desc: '2-lap championship race against 3 contenders on the open raceway. Master the braking zones and take 1st place.',
    laps: 2,
    rewardCredits: 1500,
    rewardRep: 120,
    opponentCount: 3,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'AXEL VANCE',
    dialogue: 'Welcome to the open raceway! No city buildings or cross-traffic to block your view—just wide asphalt, rumble kerbs, and pure racing.'
  },
  {
    id: 'm2_metro_traffic',
    title: 'Raceway Pace Car Slalom',
    chapter: 'CHAPTER 1: THE ROOKIE',
    world: 'raceway',
    type: 'TRAFFIC SLALOM',
    desc: 'Overtake 8 pace cars around the raceway track with clean close passes without head-on collisions.',
    targetScore: 8,
    rewardCredits: 1800,
    rewardRep: 150,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'SARAH CONNER',
    dialogue: 'Pace cars are running laps on the circuit. Thread through them at high speed to demonstrate flawless race lane precision!'
  },
  {
    id: 'm3_metro_sprint',
    title: 'Raceway Sprint Shootout',
    chapter: 'CHAPTER 2: RISE IN RANK',
    world: 'raceway',
    type: 'SPRINT RACE',
    desc: 'High-speed 1-lap sprint around the raceway against Axel Vance. Punch your Nitro down the back straight.',
    laps: 1,
    world: 'raceway',
    opponentCount: 1,
    rewardCredits: 2200,
    rewardRep: 180,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'AXEL VANCE',
    dialogue: 'One single all-out lap around the raceway circuit. Beat me across the finish line and prove you are ready for the championship.'
  },
  {
    id: 'm4_highlands_climb',
    title: 'Highland Ridge Hillclimb',
    chapter: 'CHAPTER 3: MOUNTAIN APEX',
    world: 'highlands',
    type: 'TIME TRIAL',
    desc: 'Tackle the mountain hairpins and bridges. Reach the observatory summit before 01:45.',
    targetTime: 105,
    rewardCredits: 2600,
    rewardRep: 220,
    character: 'MAYA "GHOST" LIN',
    dialogue: 'You made it up the mountains. Down here, guardrails are thin and drops are steep. Keep your throttle steady.'
  },
  {
    id: 'm5_highlands_drift',
    title: 'Canyon Drift Master',
    chapter: 'CHAPTER 3: MOUNTAIN APEX',
    world: 'highlands',
    type: 'DRIFT EVENT',
    desc: 'Chain consecutive high-angle drifts through the serpentine downhill S-curves. Score 3,500 pts.',
    targetScore: 3500,
    rewardCredits: 3000,
    rewardRep: 250,
    character: 'MAYA "GHOST" LIN',
    dialogue: 'Traction is for commuters. Let the tail loose, feather the counter-steer, and rack up the style multiplier.'
  },
  {
    id: 'm6_highlands_stunt',
    title: 'Ravine Leap Jump',
    chapter: 'CHAPTER 4: BOUNDARY BREAKER',
    world: 'highlands',
    type: 'STUNT JUMP',
    desc: 'Hit the mountain ramp at over 180 km/h with nitro and clear the canyon gorge.',
    targetSpeed: 180,
    rewardCredits: 3500,
    rewardRep: 300,
    startPos: { x: 0, z: -40, rotY: 0 },
    character: 'MARCUS STONE',
    dialogue: 'There is an old maintenance bridge ramp across the ravine. Full throttle and punch your nitro at the crest!'
  },
  {
    id: 'm7_neon_drag',
    title: 'Raceway Straight Drag',
    chapter: 'CHAPTER 5: NEON SYNDICATE',
    world: 'raceway',
    type: 'DRAG RACE',
    desc: 'Quarter-mile straight sprint down the raceway main straight against Viktor Kane. Flawless launch required.',
    rewardCredits: 4500,
    rewardRep: 380,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'VIKTOR KANE',
    dialogue: 'On the main raceway straightaway, horsepower and launch reaction decide everything. Let us see what you have got.'
  },
  {
    id: 'm8_neon_pursuit',
    title: 'Raceway High-Speed Pursuit',
    chapter: 'CHAPTER 5: NEON SYNDICATE',
    world: 'raceway',
    type: 'POLICE PURSUIT',
    desc: 'Evade 2 high-speed Interceptor cruisers around the open raceway for 50 seconds.',
    targetTime: 50,
    rewardCredits: 5500,
    rewardRep: 450,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'DISPATCH RADIO',
    dialogue: 'All units, rogue street racer spotted on the raceway circuit! Authorizing high-speed pursuit intercept!'
  },
  {
    id: 'm9_neon_championship',
    title: 'Grand Apex Championship',
    chapter: 'CHAPTER 6: CHAMPION OF DRIVELAB',
    world: 'raceway',
    type: 'RIVAL CHAMPIONSHIP',
    desc: 'The ultimate 3-lap Grand Prix showdown on the open raceway circuit against Viktor Kane and the top contenders.',
    laps: 3,
    rewardCredits: 12000,
    rewardRep: 1000,
    opponentCount: 3,
    startPos: { x: -14, z: -260, rotY: Math.PI / 2 },
    character: 'VIKTOR KANE',
    dialogue: 'This is the final test on the open circuit. Cross the finish line before my prototype, and the DriveLab crown is yours.'
  }
];

// ============================================================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.8;
    this.isMusicPlaying = false;

    // Engine sound nodes
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineFilter = null;
    this.engineGain = null;

    // Tire screech nodes
    this.skidBuffer = null;
    this.skidSource = null;
    this.skidFilter = null;
    this.skidGain = null;

    // Music step sequencer
    this.musicInterval = null;
    this.step = 0;
    this.bassNotes = [65.41, 65.41, 77.78, 87.31, 65.41, 65.41, 98.00, 87.31]; // C2 / Eb2 / F2 / G2
    this.leadNotes = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 392.00, 349.23];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.initEngineAudio();
      this.initSkidAudio();
      this.startMusic();
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initEngineAudio() {
    if (!this.ctx) return;
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
    this.engineFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'square';
    this.engineOsc2.frequency.setValueAtTime(27.5, this.ctx.currentTime);

    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.sfxGain);

    this.engineOsc1.start();
    this.engineOsc2.start();
  }

  initSkidAudio() {
    if (!this.ctx) return;
    // Generate white noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    this.skidBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = this.skidBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.skidSource = this.ctx.createBufferSource();
    this.skidSource.buffer = this.skidBuffer;
    this.skidSource.loop = true;

    this.skidFilter = this.ctx.createBiquadFilter();
    this.skidFilter.type = 'bandpass';
    this.skidFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    this.skidFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.skidGain = this.ctx.createGain();
    this.skidGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.skidSource.connect(this.skidFilter);
    this.skidFilter.connect(this.skidGain);
    this.skidGain.connect(this.sfxGain);

    this.skidSource.start();
  }

  updateEngine(rpm, speedKmh, throttle, isNitro) {
    if (!this.ctx || !this.engineGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    const baseFreq = 40 + (rpm / 9000) * 160 + (isNitro ? 30 : 0);
    this.engineOsc1.frequency.setTargetAtTime(baseFreq, t, 0.05);
    this.engineOsc2.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.05);

    const filterCutoff = 300 + (rpm / 9000) * 2200 + (throttle * 800);
    this.engineFilter.frequency.setTargetAtTime(filterCutoff, t, 0.05);

    const targetGain = 0.05 + (throttle * 0.22) + (isNitro ? 0.1 : 0);
    this.engineGain.gain.setTargetAtTime(targetGain, t, 0.05);
  }

  setSkidIntensity(intensity) {
    if (!this.ctx || !this.skidGain) return;
    const t = this.ctx.currentTime;
    const clamped = Math.max(0, Math.min(intensity, 1));
    this.skidGain.gain.setTargetAtTime(clamped * 0.35, t, 0.05);
  }

  playThudSound(strength = 0.5) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);

    gain.gain.setValueAtTime(Math.min(0.25 * strength, 0.35), t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playGentleBumpSound(speedKmh = 25) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    const vol = Math.min(0.18 * (speedKmh / 40), 0.22);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.11);
  }

  playCrashSound(strength = 1) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    // Heavy low-frequency punch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.35);

    gain.gain.setValueAtTime(Math.min(0.55 * strength, 0.8), t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.45);

    // Crunch noise burst
    if (this.skidBuffer) {
      try {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.skidBuffer;
        const nFilter = this.ctx.createBiquadFilter();
        nFilter.type = 'lowpass';
        nFilter.frequency.setValueAtTime(1400, t);
        nFilter.frequency.exponentialRampToValueAtTime(200, t + 0.28);
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(Math.min(0.45 * strength, 0.65), t);
        nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        noise.connect(nFilter);
        nFilter.connect(nGain);
        nGain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.32);
      } catch (e) {}
    }
  }

  playRampLaunchSound(speedKmh = 100) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.22);
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.28);
  }

  playLandingThud(impactVy = 8) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(28, t + 0.18);
    gain.gain.setValueAtTime(Math.min(0.4 * (impactVy / 8), 0.55), t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.22);
  }

  playCheckpointChime() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);
      gain.gain.setValueAtTime(0.2, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.35);
    });
  }

  playCoinChime() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      gain.gain.setValueAtTime(0.24, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.28);
    });
  }

  playKeyChime() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.07);
      gain.gain.setValueAtTime(0.3, t + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.07);
      osc.stop(t + i * 0.07 + 0.4);
    });
  }

  playRespawnSwoosh() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.25);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.45);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  playCountdownBeep(isFinal = false) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = isFinal ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isFinal ? 880 : 440, t);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isFinal ? 0.6 : 0.2));
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + (isFinal ? 0.65 : 0.25));
  }

  playVictoryFanfare() {
    if (!this.ctx || this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(this.ctx.currentTime + idx * 0.12);
      osc.stop(this.ctx.currentTime + idx * 0.12 + 0.6);
    });
  }

  playUIClick() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  startMusic() {
    if (this.musicInterval || !this.ctx) return;
    this.isMusicPlaying = true;
    const bpm = 128;
    const stepDuration = (60 / bpm) / 4; // 16th notes

    this.musicInterval = setInterval(() => {
      if (!this.ctx || this.isMuted || !this.isMusicPlaying) return;
      const t = this.ctx.currentTime;

      // 1. Kick Drum on beats 0, 4, 8, 12
      if (this.step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(140, t);
        kickOsc.frequency.exponentialRampToValueAtTime(38, t + 0.08);
        kickGain.gain.setValueAtTime(0.3, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        kickOsc.connect(kickGain);
        kickGain.connect(this.bgmGain);
        kickOsc.start(t);
        kickOsc.stop(t + 0.14);
      }

      // 2. Snare / Clack on beats 4 and 12
      if (this.step % 8 === 4) {
        const snareOsc = this.ctx.createOscillator();
        const snareGain = this.ctx.createGain();
        snareOsc.type = 'triangle';
        snareOsc.frequency.setValueAtTime(220, t);
        snareGain.gain.setValueAtTime(0.15, t);
        snareGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        snareOsc.connect(snareGain);
        snareGain.connect(this.bgmGain);
        snareOsc.start(t);
        snareOsc.stop(t + 0.12);
      }

      // 3. Arpeggiated Synth Bassline
      const bassFreq = this.bassNotes[(this.step / 2 | 0) % this.bassNotes.length];
      if (this.step % 2 === 0) {
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = 'sawtooth';
        bOsc.frequency.setValueAtTime(bassFreq, t);
        bGain.gain.setValueAtTime(0.08, t);
        bGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        bOsc.connect(bGain);
        bGain.connect(this.bgmGain);
        bOsc.start(t);
        bOsc.stop(t + 0.14);
      }

      // 4. Subtle Lead Melody on odd steps
      if (this.step % 4 === 2) {
        const leadFreq = this.leadNotes[(this.step / 4 | 0) % this.leadNotes.length];
        const lOsc = this.ctx.createOscillator();
        const lGain = this.ctx.createGain();
        lOsc.type = 'sine';
        lOsc.frequency.setValueAtTime(leadFreq, t);
        lGain.gain.setValueAtTime(0.05, t);
        lGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        lOsc.connect(lGain);
        lGain.connect(this.bgmGain);
        lOsc.start(t);
        lOsc.stop(t + 0.22);
      }

      this.step = (this.step + 1) % 16;
    }, stepDuration * 1000);
  }

  toggleMusic() {
    this.isMusicPlaying = !this.isMusicPlaying;
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.isMusicPlaying ? 0.35 : 0.0001, this.ctx.currentTime);
    }
    return this.isMusicPlaying;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = vol;
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }
}

// Global Sound Instance
const sound = new SoundEngine();

// ============================================================================
// 3. PERSISTENCE & LOCAL SAVE MANAGER
// ============================================================================

class SaveManager {
  static load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          credits: parsed.credits ?? 1500,
          rep: parsed.rep ?? 1,
          repPoints: parsed.repPoints ?? 0,
          currentCarId: parsed.currentCarId ?? 'apex_pulse',
          ownedCarIds: parsed.ownedCarIds ?? ['apex_pulse'],
          upgrades: parsed.upgrades ?? {},
          carPaints: parsed.carPaints ?? {},
          unlockedWorlds: parsed.unlockedWorlds ?? ['metrovale'],
          completedMissions: parsed.completedMissions ?? [],
          bestTimes: parsed.bestTimes ?? {},
          collectedCoins: parsed.collectedCoins ?? 0,
          collectedKeys: parsed.collectedKeys ?? [],
          settings: parsed.settings ?? { volume: 80, graphics: 'medium', sensitivity: 100, touchMode: 'auto' }
        };
      }
    } catch (e) {
      console.warn('Failed to load save from localStorage:', e);
    }
    return {
      credits: 1500,
      rep: 1,
      repPoints: 0,
      currentCarId: 'apex_pulse',
      ownedCarIds: ['apex_pulse'],
      upgrades: {},
      carPaints: {},
      unlockedWorlds: ['metrovale'],
      completedMissions: [],
      bestTimes: {},
      collectedCoins: 0,
      collectedKeys: [],
      settings: { volume: 80, graphics: 'medium', sensitivity: 100, touchMode: 'auto' }
    };
  }

  static save(state) {
    try {
      const payload = {
        credits: state.credits,
        rep: state.rep,
        repPoints: state.repPoints,
        currentCarId: state.currentCarId,
        ownedCarIds: state.ownedCarIds,
        upgrades: state.upgrades,
        carPaints: state.carPaints,
        unlockedWorlds: state.unlockedWorlds,
        completedMissions: state.completedMissions,
        bestTimes: state.bestTimes,
        collectedCoins: state.collectedCoins ?? 0,
        collectedKeys: state.collectedKeys ?? [],
        settings: state.settings
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to persist to localStorage:', e);
    }
  }

  static reset() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
}

// ============================================================================
// 4. PROCEDURAL 3D VEHICLE MESH FACTORY
// ============================================================================

class VehicleMeshFactory {
  /**
   * Constructs a multi-part composite car model using Three.js procedural geometry.
   * Silhouette includes: Lower chassis, cockpit cabin with tinted glass, front grille,
   * splitter, headlights, taillights, dual exhaust, 4 rotating wheels with brake calipers,
   * customizable spoiler, and soft contact shadow.
   */
  static createCarMesh(carDef, paintColor = null, rimStyle = 'chrome', spoilerType = 'stock') {
    const group = new THREE.Group();
    group.name = `car_${carDef.id}`;

    const bodyColor = paintColor || carDef.color || '#00f0ff';

    // 1. Primary Car Body Paint Material (Physical PBR)
    const paintMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(bodyColor),
      metalness: 0.85,
      roughness: 0.22,
      envMapIntensity: 1.2
    });

    // Dark Carbon / Trim Material
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.6,
      roughness: 0.4
    });

    // Dark Tinted Glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a101d,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85
    });

    // Emissive Headlights
    const headlightMaterial = new THREE.MeshBasicMaterial({
      color: 0x80f5ff
    });

    // Emissive Taillights
    const taillightMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1e38
    });

    // 2. Chassis Lower Hull
    const hullGeo = new THREE.BoxGeometry(1.85, 0.48, 4.3);
    const hullMesh = new THREE.Mesh(hullGeo, paintMaterial);
    hullMesh.position.y = 0.46;
    hullMesh.castShadow = true;
    hullMesh.receiveShadow = true;
    group.add(hullMesh);

    // Front Bumper & Splitter
    const splitterGeo = new THREE.BoxGeometry(1.88, 0.12, 0.6);
    const splitter = new THREE.Mesh(splitterGeo, carbonMaterial);
    splitter.position.set(0, 0.26, 2.15);
    group.add(splitter);

    // Rear Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.88, 0.16, 0.5);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMaterial);
    diffuser.position.set(0, 0.28, -2.15);
    group.add(diffuser);

    // 3. Cabin / Cockpit Roof
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.46, 2.1);
    const cabinMesh = new THREE.Mesh(cabinGeo, paintMaterial);
    cabinMesh.position.set(0, 0.88, -0.2);
    cabinMesh.castShadow = true;
    group.add(cabinMesh);

    // Front Windshield
    const windshieldGeo = new THREE.BoxGeometry(1.42, 0.42, 0.65);
    const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
    windshield.position.set(0, 0.86, 0.95);
    windshield.rotation.x = -Math.PI * 0.16;
    group.add(windshield);

    // Rear Window
    const rearGlassGeo = new THREE.BoxGeometry(1.42, 0.38, 0.55);
    const rearGlass = new THREE.Mesh(rearGlassGeo, glassMaterial);
    rearGlass.position.set(0, 0.86, -1.3);
    rearGlass.rotation.x = Math.PI * 0.18;
    group.add(rearGlass);

    // Side Windows
    const sideGlassGeo = new THREE.BoxGeometry(1.54, 0.36, 1.4);
    const sideGlass = new THREE.Mesh(sideGlassGeo, glassMaterial);
    sideGlass.position.set(0, 0.88, -0.2);
    group.add(sideGlass);

    // 4. Headlights (L & R)
    const hlGeo = new THREE.BoxGeometry(0.38, 0.12, 0.08);
    const hlLeft = new THREE.Mesh(hlGeo, headlightMaterial);
    hlLeft.position.set(-0.65, 0.52, 2.16);
    group.add(hlLeft);

    const hlRight = new THREE.Mesh(hlGeo, headlightMaterial);
    hlRight.position.set(0.65, 0.52, 2.16);
    group.add(hlRight);

    // 5. Taillights (L & R bar)
    const tlGeo = new THREE.BoxGeometry(0.55, 0.1, 0.08);
    const tlLeft = new THREE.Mesh(tlGeo, taillightMaterial);
    tlLeft.position.set(-0.6, 0.56, -2.16);
    group.add(tlLeft);

    const tlRight = new THREE.Mesh(tlGeo, taillightMaterial);
    tlRight.position.set(0.6, 0.56, -2.16);
    group.add(tlRight);

    // 6. Exhaust Pipes (Twin Chrome)
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
    const exGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12);
    exGeo.rotateX(Math.PI / 2);

    const exL = new THREE.Mesh(exGeo, exhaustMat);
    exL.position.set(-0.4, 0.28, -2.25);
    group.add(exL);

    const exR = new THREE.Mesh(exGeo, exhaustMat);
    exR.position.set(0.4, 0.28, -2.25);
    group.add(exR);

    // 7. Spoiler Options
    if (spoilerType !== 'none') {
      const wingGroup = new THREE.Group();
      if (spoilerType === 'hyper') {
        const wingGeo = new THREE.BoxGeometry(1.9, 0.06, 0.38);
        const wing = new THREE.Mesh(wingGeo, carbonMaterial);
        wing.position.set(0, 1.25, -2.05);

        const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.12), carbonMaterial);
        pillarL.position.set(-0.6, 0.98, -2.05);
        const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.12), carbonMaterial);
        pillarR.position.set(0.6, 0.98, -2.05);

        wingGroup.add(wing, pillarL, pillarR);
      } else {
        // Stock / GT spoiler
        const wingGeo = new THREE.BoxGeometry(1.65, 0.05, 0.28);
        const wing = new THREE.Mesh(wingGeo, carbonMaterial);
        wing.position.set(0, 1.05, -1.95);

        const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.1), carbonMaterial);
        pillarL.position.set(-0.55, 0.85, -1.95);
        const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.1), carbonMaterial);
        pillarR.position.set(0.55, 0.85, -1.95);

        wingGroup.add(wing, pillarL, pillarR);
      }
      group.add(wingGroup);
    }

    // 8. 4 Rotating Wheels with Rim Styles
    let rimColor = 0xcccccc;
    if (rimStyle === 'black') rimColor = 0x18181b;
    if (rimStyle === 'gold') rimColor = 0xd97706;
    if (rimStyle === 'cyan') rimColor = 0x00f0ff;

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: rimColor,
      roughness: 0.25,
      metalness: 0.85
    });

    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 20);
    wheelGeo.rotateZ(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 14);
    rimGeo.rotateZ(Math.PI / 2);

    const wheelOffsets = [
      { x: -0.92, y: 0.36, z: 1.35, id: 'FL' },
      { x: 0.92, y: 0.36, z: 1.35, id: 'FR' },
      { x: -0.92, y: 0.36, z: -1.35, id: 'RL' },
      { x: 0.92, y: 0.36, z: -1.35, id: 'RR' }
    ];

    const wheels = [];
    wheelOffsets.forEach(pos => {
      const wheelHub = new THREE.Group();
      wheelHub.position.set(pos.x, pos.y, pos.z);

      const tire = new THREE.Mesh(wheelGeo, tireMaterial);
      tire.castShadow = true;
      const rim = new THREE.Mesh(rimGeo, rimMaterial);
      tire.add(rim);

      wheelHub.add(tire);
      wheelHub.userData = { id: pos.id, tireMesh: tire };
      group.add(wheelHub);
      wheels.push(wheelHub);
    });

    // 9. Soft Radial Contact Shadow Grounding Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    const radGrad = ctx.createRadialGradient(64, 64, 15, 64, 64, 60);
    radGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    radGrad.addColorStop(0.6, 'rgba(0,0,0,0.3)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.6, 5.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.02; // Flush on ground
    group.add(shadowPlane);

    // Save references for runtime animation (wheel rotation, steer, paint color updates)
    group.userData = {
      paintMaterial,
      wheels,
      carDef,
      rimStyle,
      spoilerType
    };

    return group;
  }
}

// ============================================================================
// 4.5. CRASH PARTICLE & DEBRIS MANAGER
// ============================================================================

class CrashParticleManager {
  constructor(scene) {
    this.scene = scene;
    this.sparksList = [];
    this.debrisMeshes = [];

    this.maxSparks = 320;
    this.sparkGeo = new THREE.BufferGeometry();
    this.sparkPositions = new Float32Array(this.maxSparks * 3);
    this.sparkColors = new Float32Array(this.maxSparks * 3);

    for (let i = 0; i < this.maxSparks; i++) {
      this.sparkPositions[i * 3 + 1] = -9999;
    }

    this.sparkGeo.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));
    this.sparkGeo.setAttribute('color', new THREE.BufferAttribute(this.sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    this.sparkPoints = new THREE.Points(this.sparkGeo, sparkMat);
    this.scene.add(this.sparkPoints);
  }

  emitCrash(contactPos, normal, impactKmh) {
    const sparkCount = Math.min(36, 18 + Math.floor(impactKmh / 7));
    const safeNorm = normal && normal.lengthSq() > 0.05 ? normal.clone().normalize() : new THREE.Vector3(0, 0.4, 1);

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 7 + Math.random() * (impactKmh * 0.15);
      const vx = (safeNorm.x * Math.cos(angle) - safeNorm.z * Math.sin(angle)) * speed + (Math.random() - 0.5) * 4;
      const vy = 3 + Math.random() * 8;
      const vz = (safeNorm.x * Math.sin(angle) + safeNorm.z * Math.cos(angle)) * speed + (Math.random() - 0.5) * 4;

      this.sparksList.push({
        x: contactPos.x + safeNorm.x * 0.4 + (Math.random() - 0.5) * 0.6,
        y: Math.max(0.4, (contactPos.y || 0) + 0.5 + (Math.random() - 0.5) * 0.4),
        z: contactPos.z + safeNorm.z * 0.4 + (Math.random() - 0.5) * 0.6,
        vx, vy, vz,
        life: 0,
        maxLife: 0.35 + Math.random() * 0.35,
        r: 1.0,
        g: 0.45 + Math.random() * 0.45,
        b: 0.1
      });
    }

    // 3D Tumbling Debris Fragments (carbon shards, bumper chunks)
    const fragCount = Math.min(8, 3 + Math.floor(impactKmh / 35));
    for (let i = 0; i < fragCount; i++) {
      const w = 0.2 + Math.random() * 0.25;
      const h = 0.08;
      const d = 0.2 + Math.random() * 0.25;
      const fragGeo = new THREE.BoxGeometry(w, h, d);
      const fragMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0xef4444 : 0x1e293b,
        metalness: 0.7,
        roughness: 0.3
      });
      const fragMesh = new THREE.Mesh(fragGeo, fragMat);
      fragMesh.position.set(
        contactPos.x + safeNorm.x * 0.4,
        Math.max(0.4, (contactPos.y || 0) + 0.6),
        contactPos.z + safeNorm.z * 0.4
      );
      this.scene.add(fragMesh);

      const dSpeed = 4 + Math.random() * 8;
      this.debrisMeshes.push({
        mesh: fragMesh,
        vx: safeNorm.x * dSpeed + (Math.random() - 0.5) * 6,
        vy: 3 + Math.random() * 6,
        vz: safeNorm.z * dSpeed + (Math.random() - 0.5) * 6,
        rotVx: (Math.random() - 0.5) * 16,
        rotVy: (Math.random() - 0.5) * 16,
        life: 0,
        maxLife: 1.2 + Math.random() * 0.6
      });
    }
  }

  update(dt) {
    const posAttr = this.sparkGeo.attributes.position;
    const colAttr = this.sparkGeo.attributes.color;
    let activeIdx = 0;

    for (let i = this.sparksList.length - 1; i >= 0; i--) {
      const s = this.sparksList[i];
      s.life += dt;
      if (s.life >= s.maxLife) {
        this.sparksList.splice(i, 1);
        continue;
      }

      s.vy -= 22 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.z += s.vz * dt;

      if (s.y < 0.05) {
        s.y = 0.05;
        s.vy = -s.vy * 0.35;
        s.vx *= 0.6;
        s.vz *= 0.6;
      }

      if (activeIdx < this.maxSparks) {
        const pIdx = activeIdx * 3;
        posAttr.array[pIdx] = s.x;
        posAttr.array[pIdx + 1] = s.y;
        posAttr.array[pIdx + 2] = s.z;

        const fade = 1.0 - (s.life / s.maxLife);
        colAttr.array[pIdx] = s.r * fade;
        colAttr.array[pIdx + 1] = s.g * fade;
        colAttr.array[pIdx + 2] = s.b * fade;
        activeIdx++;
      }
    }

    for (let i = activeIdx; i < this.maxSparks; i++) {
      const pIdx = i * 3;
      posAttr.array[pIdx] = 0;
      posAttr.array[pIdx + 1] = -9999;
      posAttr.array[pIdx + 2] = 0;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    for (let i = this.debrisMeshes.length - 1; i >= 0; i--) {
      const d = this.debrisMeshes[i];
      d.life += dt;
      if (d.life >= d.maxLife) {
        this.scene.remove(d.mesh);
        d.mesh.geometry.dispose();
        d.mesh.material.dispose();
        this.debrisMeshes.splice(i, 1);
        continue;
      }

      d.vy -= 24 * dt;
      d.mesh.position.x += d.vx * dt;
      d.mesh.position.y += d.vy * dt;
      d.mesh.position.z += d.vz * dt;
      d.mesh.rotation.x += d.rotVx * dt;
      d.mesh.rotation.y += d.rotVy * dt;

      if (d.mesh.position.y < 0.1) {
        d.mesh.position.y = 0.1;
        d.vy = -d.vy * 0.25;
        d.vx *= 0.5;
        d.vz *= 0.5;
      }
    }
  }

  clear() {
    this.sparksList = [];
    this.debrisMeshes.forEach(d => {
      this.scene.remove(d.mesh);
      d.mesh.geometry.dispose();
      d.mesh.material.dispose();
    });
    this.debrisMeshes = [];
  }
}

// ============================================================================
// 5. VEHICLE PHYSICS CONTROLLER (ARCADE-SIMULATION HYBRID)
// ============================================================================

class VehicleController {
  constructor(mesh, carDef, upgradeLevels = {}) {
    this.mesh = mesh;
    this.carDef = carDef;
    this.upgrades = upgradeLevels;

    // Position & Orientation
    this.position = this.mesh.position;
    this.velocity = new THREE.Vector3();
    this.forward = new THREE.Vector3(0, 0, 1);
    this.yaw = 0;
    this.steerAngle = 0;
    this.bodyRoll = 0;
    this.bodyPitch = 0;

    // 3D Jump, Ramp & Airborne Physics
    this.vy = 0;
    this.isAirborne = false;
    this.airTime = 0;
    this.groundY = 0;
    this.onRamp = false;
    this.rampTargetPitch = 0;
    this.rampLaunchCooldown = 0;
    this.radius = 1.35;

    // Crash Wobble & Recovery
    this.crashWobble = 0;
    this.crashStun = 0;

    // Upgraded Stats Calculation
    const engLvl = (upgradeLevels.engine || 1) - 1;
    const transLvl = (upgradeLevels.trans || 1) - 1;
    const gripLvl = (upgradeLevels.grip || 1) - 1;
    const brakeLvl = (upgradeLevels.brakes || 1) - 1;
    const nitroLvl = (upgradeLevels.nitro || 1) - 1;

    this.maxSpeedKmh = carDef.topSpeed + engLvl * 15;
    this.maxSpeedMs = this.maxSpeedKmh / 3.6;
    // Normal cruising speed is capped at 70% of max speed
    // Engaging NITRO bursts through the normal limit and unlocks the true top max speed!
    this.normalSpeedLimitKmh = Math.round(this.maxSpeedKmh * 0.70);
    this.normalSpeedLimitMs = this.normalSpeedLimitKmh / 3.6;

    // Swift, punchy base acceleration rate (2.8x multiplier for exhilarating responsive launches)
    this.baseAccel = (100 / (carDef.accelTime * 3.6)) * 2.8 * (1 + transLvl * 0.16);
    this.accelRate = this.baseAccel;
    this.gripFactor = (carDef.handling || 0.88) * (1 + gripLvl * 0.08);
    this.brakeForce = (carDef.braking || 0.85) * (1 + brakeLvl * 0.1) * 28;
    this.nitroCapacity = 100 + nitroLvl * 25;
    this.nitro = this.nitroCapacity;

    // Dynamic State
    this.speedKmh = 0;
    this.gear = 1;
    this.rpm = 1000;
    this.isDrifting = false;
    this.driftScore = 0;
    this.driftMultiplier = 1;
    this.isNitroActive = false;
    this.isReverse = false;

    // Input States
    this.input = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false,
      nitro: false
    };

    this.hitCooldown = 0;
  }

  resetAt(x, y, z, yaw = 0) {
    this.position.set(x, y, z);
    this.yaw = yaw;
    this.velocity.set(0, 0, 0);
    this.vy = 0;
    this.isAirborne = false;
    this.airTime = 0;
    this.onRamp = false;
    this.rampLaunchCooldown = 0;
    this.groundY = y;
    this.speedKmh = 0;
    this.rpm = 1000;
    this.gear = 1;
    this.bodyRoll = 0;
    this.bodyPitch = 0;
    this.isDrifting = false;
    this.crashWobble = 0;
    this.crashStun = 0;
    this.mesh.rotation.set(0, yaw, 0);
  }

  update(dt, weatherFactor = 1.0) {
    if (this.hitCooldown > 0) this.hitCooldown -= dt;
    if (this.crashStun > 0) {
      this.crashStun -= dt;
      this.input.throttle = 0; // Momentary hesitation after crash
    }
    if (this.crashWobble > 0) {
      this.crashWobble -= dt;
    }

    const currentSpeed = this.velocity.length();
    // Speed cap depends directly on Nitro: normal cruise limit vs full unlocked max speed
    const currentSpeedCap = this.isNitroActive ? this.maxSpeedMs : this.normalSpeedLimitMs;
    const speedRatio = Math.min(currentSpeed / this.maxSpeedMs, 1.0);

    // 1. Steering Dynamics (Speed-sensitive attenuation for rock-solid stability)
    // Low speed: 0.58 rad (33 deg) for agile parking/turnarounds
    // High speed: progressive damping down to 0.18 rad (10 deg) to prevent high-speed spins
    const maxTurnRadius = 0.58 - Math.pow(speedRatio, 0.7) * 0.40;
    const targetSteer = this.input.steer * maxTurnRadius;
    this.steerAngle += (targetSteer - this.steerAngle) * Math.min(dt * 14, 1.0);

    // 2. Nitro Boost logic
    if (this.input.nitro && this.nitro > 0 && this.input.throttle > 0) {
      this.isNitroActive = true;
      this.nitro = Math.max(0, this.nitro - dt * 25);
    } else {
      this.isNitroActive = false;
      // Extra nitro recharge during drifts
      const rechargeRate = this.isDrifting ? 22 : 12;
      this.nitro = Math.min(this.nitroCapacity, this.nitro + dt * rechargeRate);
    }

    // 3. Dynamic Torque & Fast Acceleration
    const torqueMultiplier = 2.2 - speedRatio * 1.05;
    let effectiveAccel = this.baseAccel * torqueMultiplier;
    if (this.isNitroActive) {
      // Powerful nitro boost thrust to blast past the normal limit to max speed
      effectiveAccel *= 2.8;
    }

    // Forward direction from yaw
    this.forward.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));

    if (this.input.throttle > 0) {
      if (this.isReverse) {
        // Braking while in reverse
        const stopDecel = Math.min(currentSpeed, this.brakeForce * dt);
        this.velocity.sub(this.velocity.clone().normalize().multiplyScalar(stopDecel));
        if (currentSpeed < 0.5) this.isReverse = false;
      } else {
        // Forward drive with distinct speed caps:
        if (this.isNitroActive) {
          // Accelerate powerfully all the way to full maxSpeedMs
          if (currentSpeed < this.maxSpeedMs) {
            this.velocity.addScaledVector(this.forward, effectiveAccel * this.input.throttle * dt);
          }
        } else {
          // Normal speed limit
          if (currentSpeed < this.normalSpeedLimitMs) {
            this.velocity.addScaledVector(this.forward, effectiveAccel * this.input.throttle * dt);
          } else if (currentSpeed > this.normalSpeedLimitMs) {
            // Smoothly coast back down to normal limit when nitro expires
            const excess = currentSpeed - this.normalSpeedLimitMs;
            const coastDecel = Math.min(excess, 16.0 * dt);
            this.velocity.sub(this.velocity.clone().normalize().multiplyScalar(coastDecel));
          }
        }
      }
    } else if (this.input.brake > 0) {
      if (currentSpeed > 0.8 && !this.isReverse) {
        // High-stability ABS braking (rapid deceleration without sliding)
        const brakeDecel = Math.min(currentSpeed, (this.brakeForce + 10.0) * this.input.brake * dt);
        this.velocity.sub(this.velocity.clone().normalize().multiplyScalar(brakeDecel));
      } else {
        // Reverse with speed limiter
        this.isReverse = true;
        const revLimit = this.maxSpeedMs * 0.35;
        if (currentSpeed < revLimit) {
          this.velocity.addScaledVector(this.forward, -effectiveAccel * 0.5 * dt);
        }
      }
    }

    // 4. Aerodynamic Drag & Smooth Rolling Resistance
    const dragCoeff = 0.00042;
    const rollingResistance = 0.9982;
    this.velocity.multiplyScalar(Math.pow(rollingResistance, dt * 60));
    this.velocity.sub(this.velocity.clone().multiplyScalar(dragCoeff * currentSpeed * dt * 60));

    // 5. Lateral Grip, Traction Control & Stability Assist
    const localVelZ = this.velocity.dot(this.forward);
    const right = new THREE.Vector3(this.forward.z, 0, -this.forward.x);
    const localVelX = this.velocity.dot(right);

    // Downforce adds grip at higher speed for planted stability
    const downforce = 1.0 + speedRatio * 0.4;
    let lateralGrip = this.gripFactor * downforce * weatherFactor;

    if (this.input.handbrake) {
      lateralGrip *= 0.35; // Intentional drift slip
      this.isDrifting = true;
    } else if (Math.abs(localVelX) > 5.0 && currentSpeed > 15) {
      this.isDrifting = true;
    } else {
      this.isDrifting = false;
    }

    // Active Traction Control (TCS) & Directional Stability
    if (!this.isDrifting && Math.abs(this.input.steer) < 0.25) {
      // Strong straight-line stabilization: stops unintended fishtailing on hard acceleration
      const straightStability = Math.min(dt * lateralGrip * 16.0, 1.0);
      this.velocity.sub(right.clone().multiplyScalar(localVelX * straightStability));
    } else {
      // Smooth lateral slip correction
      const slipCorrection = Math.min(dt * lateralGrip * (this.isDrifting ? 4.2 : 11.0), 1.0);
      this.velocity.sub(right.clone().multiplyScalar(localVelX * slipCorrection));
    }

    // Stable Turn Yaw (Steer Right -> Turn Right; Steer Left -> Turn Left)
    const turnSpeed = this.isReverse ? this.steerAngle : -this.steerAngle;
    const maxTurnRate = 2.4; // Max rad/s to prevent violent snapping
    let effectiveYawRate = (turnSpeed * Math.min(currentSpeed * 0.11, 4.0)) * (this.isDrifting ? 1.25 : 0.95);
    effectiveYawRate = Math.max(-maxTurnRate, Math.min(maxTurnRate, effectiveYawRate));
    this.yaw += effectiveYawRate * dt;

    // 6. Update 3D Transform, Ramps & Airborne Jump Physics
    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;

    let onRampThisFrame = false;
    let targetGroundY = 0;

    if (this.rampLaunchCooldown > 0) {
      this.rampLaunchCooldown -= dt;
    }

    if (window.game && window.game.worldManager) {
      targetGroundY = window.game.worldManager.getElevatedGroundHeight(this.position.x, this.position.z, this.position.y);

      if (this.rampLaunchCooldown <= 0) {
        const rampInfo = window.game.worldManager.checkRamps(this.position.x, this.position.z, this.position.y, this.velocity);

        if (rampInfo && rampInfo.onRamp) {
          if (rampInfo.launched) {
            // LAUNCH OFF RAMP LIP INTO THE SKY!
            this.isAirborne = true;
            this.onRamp = false;
            this.vy = rampInfo.launchVy;
            this.rampLaunchCooldown = 0.65; // Prevent re-triggering while clearing the ramp lip
            this.position.y = rampInfo.height + this.vy * dt;
            sound.playRampLaunchSound(this.speedKmh);
            if (window.game) {
              window.game.showStuntNotification('STUNT JUMP!', `${this.speedKmh} KM/H AIRBORNE`);
              window.game.triggerCameraShake(0.55);
            }
          } else {
            // Driving smoothly up the ramp incline
            onRampThisFrame = true;
            this.onRamp = true;
            this.isAirborne = false;
            this.vy = 0;
            this.position.y = rampInfo.height;
            this.rampTargetPitch = rampInfo.pitch;
          }
        }
      }
    }

    if (!onRampThisFrame) {
      this.onRamp = false;
      if (this.position.y > targetGroundY + 0.05 || this.isAirborne) {
        this.isAirborne = true;
        this.airTime += dt;
        const gravity = 22.0; // Responsive dynamic gravity
        this.vy -= gravity * dt;
        this.position.y += this.vy * dt;

        // Aerodynamic flight pitch (arch gracefully through the air)
        const flightPitch = Math.max(-0.25, Math.min(0.35, -this.vy * 0.025));
        this.bodyPitch += (flightPitch - this.bodyPitch) * dt * 4;

        // Check landing
        if (this.position.y <= targetGroundY) {
          this.position.y = targetGroundY;
          const impactVy = Math.abs(this.vy);
          const wasAirborneLong = this.airTime > 0.4;
          this.isAirborne = false;
          this.vy = 0;
          this.airTime = 0;

          if (impactVy > 2.5) {
            sound.playLandingThud(impactVy);
            this.bodyPitch = -0.06; // Suspension bottoming out
            if (window.game) {
              window.game.triggerCameraShake(Math.min(impactVy / 12, 0.5));
              if (wasAirborneLong) {
                const stuntBonus = Math.round(150 + Math.min(300, impactVy * 25));
                window.game.state.credits = (window.game.state.credits || 0) + stuntBonus;
                SaveManager.save(window.game.state);
                window.game.updateHUDReadouts();
                window.game.showToast('STUNT LANDING!', `+${stuntBonus} CR Jump Bonus Awarded`);
              }
            }
          }
        }
      } else {
        this.position.y = targetGroundY;
        this.isAirborne = false;
        this.vy = 0;
        this.airTime = 0;
      }
    }

    this.mesh.position.copy(this.position);

    // Body roll into corners and pitch under braking / ramps
    const targetRoll = -turnSpeed * speedRatio * 0.10;
    let targetPitch = this.onRamp ? this.rampTargetPitch : (this.input.throttle > 0 ? -0.025 : (this.input.brake > 0 ? 0.04 : 0));
    this.bodyRoll += (targetRoll - this.bodyRoll) * dt * 7;
    this.bodyPitch += (targetPitch - this.bodyPitch) * dt * 7;

    // Apply high-frequency chassis crash wobble if active
    let displayPitch = this.bodyPitch;
    let displayRoll = this.bodyRoll;
    if (this.crashWobble > 0) {
      const wobble = this.crashWobble * 0.12;
      displayPitch += (Math.random() - 0.5) * wobble;
      displayRoll += (Math.random() - 0.5) * wobble;
    }

    this.mesh.rotation.set(displayPitch, this.yaw, displayRoll);

    // 7. Visual Wheels Steering & Rotation (Wheels turn Right when steering Right)
    this.speedKmh = Math.round(this.velocity.length() * 3.6);
    const wheelRotSpeed = (this.velocity.length() / 0.36) * dt;

    const wheels = this.mesh.userData.wheels;
    if (wheels) {
      wheels.forEach(wh => {
        // Steer front wheels
        if (wh.userData.id === 'FL' || wh.userData.id === 'FR') {
          wh.rotation.y = -this.steerAngle * 0.8;
        }
        // Rotate rolling tires
        wh.userData.tireMesh.rotation.x += this.isReverse ? -wheelRotSpeed : wheelRotSpeed;
      });
    }

    // 8. Gearbox & RPM Simulation
    this.calculateGears();

    // 9. Drift Scoring Accumulator
    if (this.isDrifting && this.speedKmh > 35) {
      const slipAngle = Math.abs(localVelX);
      const pointsPerSec = slipAngle * this.speedKmh * 0.6;
      this.driftScore += Math.round(pointsPerSec * dt);
      sound.setSkidIntensity(Math.min(slipAngle / 6, 1.0));
    } else {
      sound.setSkidIntensity(0);
    }

    // Update Engine Audio
    sound.updateEngine(this.rpm, this.speedKmh, Math.max(this.input.throttle, this.input.brake * 0.3), this.isNitroActive);
  }

  calculateGears() {
    if (this.isReverse) {
      this.gear = 'R';
      this.rpm = 1000 + (this.speedKmh / 50) * 5000;
      return;
    }
    const maxKmh = this.maxSpeedKmh;
    const gearMax = [maxKmh * 0.2, maxKmh * 0.38, maxKmh * 0.56, maxKmh * 0.74, maxKmh * 0.9, maxKmh * 1.2];
    let g = 1;
    for (let i = 0; i < gearMax.length; i++) {
      if (this.speedKmh > gearMax[i]) {
        g = i + 2;
      }
    }
    this.gear = Math.min(g, 6);

    const prevGearMax = this.gear === 1 ? 0 : gearMax[this.gear - 2];
    const currGearMax = gearMax[this.gear - 1];
    const fraction = Math.max(0, Math.min((this.speedKmh - prevGearMax) / (currGearMax - prevGearMax), 1));
    this.rpm = 1500 + fraction * 6500;
  }

  onCrashImpact(normal, impactKmh) {
    this.hitCooldown = 0.35;
    this.crashStun = 0.42; // Cyber Cars Punk Racing momentary lockout while car recovers
    this.crashWobble = 0.85; // Heavy chassis shockwave wobble
    this.isNitroActive = false;
    this.input.throttle = 0;
    const safeNorm = normal && normal.lengthSq() > 0.05 ? normal.clone().normalize() : new THREE.Vector3(0, 0, 1);
    this.bodyPitch = -Math.sign(this.forward.dot(safeNorm)) * 0.32;
    this.bodyRoll = (Math.random() - 0.5) * 0.45;
    this.rpm = 1200; // Engine drops abruptly to idle
  }

  onGentleCollide(normal, impactKmh) {
    this.hitCooldown = 0.12;
    this.bodyRoll = (Math.random() - 0.5) * 0.06;
  }
}

// ============================================================================
// 6. OPEN-WORLD ENVIRONMENT GENERATOR (3 SEPARATE REGIONS)
// ============================================================================

class OpenWorldManager {
  constructor(scene) {
    this.scene = scene;
    this.currentWorldId = 'metrovale';
    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);

    // Collision Colliders, Ramps & Waypoints
    this.colliders = []; // { x, z, radius } or { minX, maxX, minZ, maxZ }
    this.ramps = []; // Functional 3D stunt ramps & highway inclines
    this.elevatedSurfaces = []; // Elevated roadways & bridge decks
    this.collectibles = []; // Free-roam 3D Gold Coins & Cyber Keys
    this.trafficWaypoints = [];
    this.raceWaypoints = [];
    this.landmarks = [];

    // Materials shared
    this.roadTexture = this.generateAsphaltTexture();
  }

  createRamp({ id, startX, startZ, endX, endZ, startY, endY, width, color = 0xeab308, neonColor = 0x00f0ff, isStunt = true }) {
    const dx = endX - startX;
    const dz = endZ - startZ;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dz * dz) || 1;
    const dirX = dx / length;
    const dirZ = dz / length;
    const angleY = Math.atan2(dx, dz);
    const slopeAngle = Math.atan2(dy, length);

    const midX = (startX + endX) / 2;
    const midZ = (startZ + endZ) / 2;
    const midY = (startY + endY) / 2;

    const rampGroup = new THREE.Group();
    rampGroup.position.set(midX, midY, midZ);
    rampGroup.rotation.y = angleY;

    // Slanted ramp deck
    const deckGeo = new THREE.BoxGeometry(width, 0.8, length);
    deckGeo.rotateX(-slopeAngle);
    const deckMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.35,
      metalness: 0.45
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.receiveShadow = true;
    deck.castShadow = true;
    rampGroup.add(deck);

    // Glowing Neon Side Barrier Rails
    const railMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const neonRailMat = new THREE.MeshBasicMaterial({ color: neonColor });

    const railGeo = new THREE.BoxGeometry(0.8, 1.3, length);
    railGeo.rotateX(-slopeAngle);

    const railL = new THREE.Mesh(railGeo, railMat);
    railL.position.set(-width / 2 - 0.4, 0.45, 0);
    const railR = new THREE.Mesh(railGeo, railMat);
    railR.position.set(width / 2 + 0.4, 0.45, 0);

    const neonTopGeo = new THREE.BoxGeometry(0.3, 0.16, length);
    neonTopGeo.rotateX(-slopeAngle);
    const neonL = new THREE.Mesh(neonTopGeo, neonRailMat);
    neonL.position.set(0, 0.7, 0);
    railL.add(neonL);
    const neonR = new THREE.Mesh(neonTopGeo, neonRailMat);
    neonR.position.set(0, 0.7, 0);
    railR.add(neonR);

    rampGroup.add(railL, railR);

    // Directional launch chevrons along the center of the deck
    for (let p = -length * 0.38; p <= length * 0.38; p += 6) {
      const arrowGeo = new THREE.BoxGeometry(width * 0.45, 0.09, 1.4);
      arrowGeo.rotateX(-slopeAngle);
      const arrowMesh = new THREE.Mesh(arrowGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      arrowMesh.position.set(0, 0.46, p);
      rampGroup.add(arrowMesh);
    }

    // Solid support wedge under ramp
    if (dy > 0.5) {
      const skirtGeo = new THREE.BoxGeometry(width - 0.2, dy, length * 0.9);
      const skirtMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.85 });
      const skirt = new THREE.Mesh(skirtGeo, skirtMat);
      skirt.position.set(0, -dy * 0.35, 0);
      rampGroup.add(skirt);
    }

    this.worldGroup.add(rampGroup);

    // Register ramp for dynamic driving, slope height calculation & launch physics (NO blocking lip collider!)
    this.ramps.push({
      id: id || 'ramp',
      startX, startZ,
      endX, endZ,
      startY, endY,
      width,
      length,
      dirX, dirZ,
      slopeAngle,
      isStunt
    });
  }

  createCoin(x, y, z, value = 250, id = null) {
    const coinGroup = new THREE.Group();
    coinGroup.position.set(x, y, z);

    // Shiny gold cylinder coin
    const coinGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.22, 16);
    coinGeo.rotateZ(Math.PI / 2);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x713f12,
      emissiveIntensity: 0.45
    });
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    coinGroup.add(coinMesh);

    // Inner embossed star ring
    const ringGeo = new THREE.TorusGeometry(0.55, 0.08, 6, 16);
    ringGeo.rotateY(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xfffbeb }));
    coinGroup.add(ringMesh);

    this.worldGroup.add(coinGroup);

    this.collectibles.push({
      type: 'coin',
      id: id || `coin_${x}_${z}`,
      group: coinGroup,
      baseY: y,
      x, y, z,
      value,
      collected: false,
      rotSpeed: 2.8 + Math.random() * 0.8
    });
  }

  createKey(x, y, z, keyId, reward = 1000) {
    const keyGroup = new THREE.Group();
    keyGroup.position.set(x, y, z);

    // Cyberpunk Golden Key: Head Ring
    const headGeo = new THREE.TorusGeometry(0.75, 0.16, 8, 16);
    headGeo.rotateX(Math.PI / 2);
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.65,
      metalness: 0.9,
      roughness: 0.15
    });
    const head = new THREE.Mesh(headGeo, keyMat);
    head.position.set(0, 1.1, 0);
    keyGroup.add(head);

    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 8);
    const shaft = new THREE.Mesh(shaftGeo, keyMat);
    shaft.position.set(0, 0, 0);
    keyGroup.add(shaft);

    // Teeth
    const tooth1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.14, 0.18), keyMat);
    tooth1.position.set(0.24, -0.5, 0);
    const tooth2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 0.18), keyMat);
    tooth2.position.set(0.19, -0.75, 0);
    keyGroup.add(tooth1, tooth2);

    this.worldGroup.add(keyGroup);

    this.collectibles.push({
      type: 'key',
      id: keyId,
      group: keyGroup,
      baseY: y,
      x, y, z,
      reward,
      collected: false,
      rotSpeed: 1.8
    });
  }

  updateCollectibles(dt) {
    const now = Date.now() * 0.003;
    for (let i = 0; i < this.collectibles.length; i++) {
      const c = this.collectibles[i];
      if (c.collected) continue;
      c.group.rotation.y += c.rotSpeed * dt;
      // Gentle floating bob
      c.group.position.y = c.baseY + Math.sin(now + i) * 0.22;
    }
  }

  checkCollectibleCollisions(carPos, radius = 2.4) {
    const collectedItems = [];
    const radSq = radius * radius;
    for (let i = 0; i < this.collectibles.length; i++) {
      const c = this.collectibles[i];
      if (c.collected) continue;

      const dx = carPos.x - c.x;
      const dy = carPos.y - c.group.position.y;
      const dz = carPos.z - c.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < radSq) {
        c.collected = true;
        this.worldGroup.remove(c.group);
        collectedItems.push(c);
      }
    }
    return collectedItems;
  }

  generateAsphaltTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Asphalt noise base
    ctx.fillStyle = '#222834';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 20000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const gray = Math.floor(25 + Math.random() * 35);
      ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Double Yellow Center Lines
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(250, 0); ctx.lineTo(250, 512);
    ctx.moveTo(262, 0); ctx.lineTo(262, 512);
    ctx.stroke();

    // White dashed lane markers
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 5;
    ctx.setLineDash([30, 25]);
    ctx.beginPath();
    ctx.moveTo(130, 0); ctx.lineTo(130, 512);
    ctx.moveTo(382, 0); ctx.lineTo(382, 512);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  generateGrassTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Vibrant open motorsports field base
    ctx.fillStyle = '#174720';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle lawn mower contrast stripes
    for (let x = 0; x < 512; x += 64) {
      ctx.fillStyle = (x / 64) % 2 === 0 ? 'rgba(32, 98, 44, 0.4)' : 'rgba(19, 58, 26, 0.4)';
      ctx.fillRect(x, 0, 64, 512);
    }

    // Organic grass specks & texture grain
    for (let i = 0; i < 20000; i++) {
      const gx = Math.random() * 512;
      const gy = Math.random() * 512;
      const greenVar = Math.floor(45 + Math.random() * 45);
      ctx.fillStyle = `rgba(38, ${greenVar + 85}, 46, 0.45)`;
      ctx.fillRect(gx, gy, 1.8, 1.8);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(48, 48);
    return tex;
  }

  generateRaceTrackTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep high-contrast dark asphalt racing surface
    ctx.fillStyle = '#131722';
    ctx.fillRect(0, 0, 512, 512);

    // Fine aggregate texture grain
    for (let i = 0; i < 18000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const gray = Math.floor(16 + Math.random() * 24);
      ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // High-Visibility FIA Rumble Kerbs (Bold Red & White on both margins)
    const curbHeight = 64;
    for (let y = 0; y < 512; y += curbHeight) {
      const isRed = (y / curbHeight) % 2 === 0;
      ctx.fillStyle = isRed ? '#e11d48' : '#ffffff';
      ctx.fillRect(0, y, 42, curbHeight);
      ctx.fillRect(470, y, 42, curbHeight);
    }

    // Solid White Track Boundary Lines (Clear outer lane limits)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(42, 0, 6, 512);
    ctx.fillRect(464, 0, 6, 512);

    // Double Bright Yellow Center Dividing Lines
    ctx.fillStyle = '#facc15';
    ctx.fillRect(250, 0, 4, 512);
    ctx.fillRect(258, 0, 4, 512);

    // Vivid Cyan Glowing Racing Chevron Guide Arrows down track center
    ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    for (let y = 20; y < 512; y += 128) {
      ctx.beginPath();
      ctx.moveTo(256, y + 40);
      ctx.lineTo(294, y - 8);
      ctx.lineTo(278, y - 8);
      ctx.lineTo(256, y + 18);
      ctx.lineTo(234, y - 8);
      ctx.lineTo(218, y - 8);
      ctx.closePath();
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  loadWorld(worldId) {
    this.currentWorldId = worldId;

    // Clean previous world objects
    while (this.worldGroup.children.length > 0) {
      const obj = this.worldGroup.children[0];
      this.worldGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    this.colliders = [];
    this.ramps = [];
    this.elevatedSurfaces = [];
    this.collectibles = [];
    this.trafficWaypoints = [];
    this.raceWaypoints = [];
    this.checkpointGantries = [];
    this.checkpointBeacon = null;

    if (worldId === 'metrovale') {
      this.buildMetrovale();
    } else if (worldId === 'highlands') {
      this.buildApexHighlands();
    } else if (worldId === 'neon') {
      this.buildNeonDistrict();
    } else if (worldId === 'raceway') {
      this.buildRaceCircuit();
    }
  }

  // --- DEDICATED RACEWAY CIRCUIT WORLD (Open Grass Meadow Ground, Zero City Clutter) ---
  buildRaceCircuit() {
    const raceTex = this.generateRaceTrackTexture();
    const trackMat = new THREE.MeshStandardMaterial({
      map: raceTex,
      roughness: 0.5,
      metalness: 0.15
    });

    const grassTex = this.generateGrassTexture();
    const grassMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.92,
      metalness: 0.05
    });

    const barrierMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.3
    });

    const neonTopMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff
    });

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8
    });

    // 1. Broad Open Field (Expansive rolling grass meadow ground, zero buildings obstructing sightlines!)
    const groundGeo = new THREE.PlaneGeometry(2600, 2600);
    groundGeo.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(groundGeo, grassMat);
    ground.receiveShadow = true;
    this.worldGroup.add(ground);

    // Distant mountain backdrop silhouettes around the horizon
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const dist = 780 + (i % 3) * 60;
      const mtnGeo = new THREE.ConeGeometry(90 + (i % 4) * 25, 130 + (i % 3) * 40, 5);
      const mtn = new THREE.Mesh(mtnGeo, new THREE.MeshStandardMaterial({ color: 0x0e2417, roughness: 0.9 }));
      mtn.position.set(Math.cos(angle) * dist, 55, Math.sin(angle) * dist);
      this.worldGroup.add(mtn);
    }

    // 2. High-Visibility 10-Gate Closed Racing Circuit
    this.raceWaypoints = [
      new THREE.Vector3(0, 0, -260),      // 0: Start / Finish Line
      new THREE.Vector3(180, 0, -260),    // 1: Turn 1 Braking Zone
      new THREE.Vector3(300, 0, -160),    // 2: Sweeping Turn 2
      new THREE.Vector3(320, 0, 60),      // 3: East High-Speed Straight
      new THREE.Vector3(220, 0, 260),     // 4: Turn 4 S-Curves
      new THREE.Vector3(40, 0, 290),      // 5: North Hairpin Apex
      new THREE.Vector3(-160, 0, 260),    // 6: West Fast Straight
      new THREE.Vector3(-290, 0, 140),    // 7: Chicane Entry
      new THREE.Vector3(-310, 0, -80),    // 8: Technical Turn 8
      new THREE.Vector3(-180, 0, -240)    // 9: Final Corner leading to Main Straight
    ];

    const trackWidth = 30; // Extra-wide 30m racing lane
    const halfWidth = trackWidth / 2;
    const n = this.raceWaypoints.length;

    for (let i = 0; i < n; i++) {
      const p1 = this.raceWaypoints[i];
      const p2 = this.raceWaypoints[(i + 1) % n];

      const dx = p2.x - p1.x;
      const dz = p2.z - p1.z;
      const segLen = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dx, dz);
      const midX = (p1.x + p2.x) / 2;
      const midZ = (p1.z + p2.z) / 2;

      // Road Segment Plane with UV repetition for crisp, non-stretched kerbs & chevrons every 14 meters
      const segGeo = new THREE.PlaneGeometry(trackWidth, segLen);
      segGeo.rotateX(-Math.PI / 2);
      const uv = segGeo.attributes.uv;
      const repeatY = Math.max(1, Math.round(segLen / 14));
      for (let j = 0; j < uv.count; j++) {
        uv.setY(j, uv.getY(j) * repeatY);
      }

      const segMesh = new THREE.Mesh(segGeo, trackMat);
      segMesh.position.set(midX, 0.05, midZ);
      segMesh.rotation.y = angle;
      segMesh.receiveShadow = true;
      this.worldGroup.add(segMesh);

      // Corner junction patch disk for seamless curves
      const cornerGeo = new THREE.CircleGeometry(halfWidth, 24);
      cornerGeo.rotateX(-Math.PI / 2);
      const cornerMesh = new THREE.Mesh(cornerGeo, trackMat);
      cornerMesh.position.set(p1.x, 0.055, p1.z);
      this.worldGroup.add(cornerMesh);

      // Continuous Left & Right Safety Barriers lining the race lane
      const perpX = Math.cos(angle);
      const perpZ = -Math.sin(angle);
      const barrierOffset = halfWidth + 0.8;

      // Left Barrier with Glowing Top Tube
      const bLeft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, segLen), barrierMat);
      bLeft.position.set(midX - perpX * barrierOffset, 0.7, midZ - perpZ * barrierOffset);
      bLeft.rotation.y = angle;
      bLeft.castShadow = true;
      const bLeftGlow = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.16, segLen), neonTopMat);
      bLeftGlow.position.set(0, 0.72, 0);
      bLeft.add(bLeftGlow);
      this.worldGroup.add(bLeft);

      // Right Barrier with Glowing Top Tube
      const bRight = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, segLen), barrierMat);
      bRight.position.set(midX + perpX * barrierOffset, 0.7, midZ + perpZ * barrierOffset);
      bRight.rotation.y = angle;
      bRight.castShadow = true;
      const bRightGlow = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.16, segLen), neonTopMat);
      bRightGlow.position.set(0, 0.72, 0);
      bRight.add(bRightGlow);
      this.worldGroup.add(bRight);

      // Corner and segment colliders to prevent clipping through barriers
      this.colliders.push({ x: p1.x - perpX * barrierOffset, z: p1.z - perpZ * barrierOffset, radius: 2.2 });
      this.colliders.push({ x: p1.x + perpX * barrierOffset, z: p1.z + perpZ * barrierOffset, radius: 2.2 });
      this.colliders.push({ x: midX - perpX * barrierOffset, z: midZ - perpZ * barrierOffset, radius: 2.0 });
      this.colliders.push({ x: midX + perpX * barrierOffset, z: midZ + perpZ * barrierOffset, radius: 2.0 });
    }

    // 3. Overhead Glowing Checkpoint Gantries at each waypoint
    this.checkpointGantries = [];
    for (let i = 0; i < n; i++) {
      const wp = this.raceWaypoints[i];
      const nextWp = this.raceWaypoints[(i + 1) % n];
      const heading = Math.atan2(nextWp.x - wp.x, nextWp.z - wp.z);

      const gantryGroup = new THREE.Group();
      gantryGroup.position.set(wp.x, 0, wp.z);
      gantryGroup.rotation.y = heading;

      // Pillars L & R
      const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 8.5, 8);
      const pL = new THREE.Mesh(pillarGeo, pillarMat);
      pL.position.set(-halfWidth - 1.2, 4.25, 0);
      const pR = new THREE.Mesh(pillarGeo, pillarMat);
      pR.position.set(halfWidth + 1.2, 4.25, 0);

      // Overhead Beam
      const beamGeo = new THREE.BoxGeometry(trackWidth + 4, 1.4, 1.2);
      const beam = new THREE.Mesh(beamGeo, pillarMat);
      beam.position.set(0, 8.5, 0);

      // Overhead Gate Sign
      const isStart = (i === 0);
      const signMat = new THREE.MeshBasicMaterial({ color: isStart ? 0x22c55e : 0x00f0ff });
      const sign = new THREE.Mesh(new THREE.BoxGeometry(14, 1.1, 0.2), signMat);
      sign.position.set(0, 8.5, 0.65);

      // Glowing Neon Chevron Arrow on Beam
      const arrowMat = new THREE.MeshBasicMaterial({ color: isStart ? 0xfacc15 : 0x00f0ff });
      const arrowSign = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.7, 0.25), arrowMat);
      arrowSign.position.set(0, 8.5, -0.65);

      // Floating spinning diamond above arch
      const diamondGeo = new THREE.OctahedronGeometry(1.8);
      const diamondMat = new THREE.MeshBasicMaterial({ color: isStart ? 0x22c55e : 0x00f0ff });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.set(0, 11.5, 0);

      gantryGroup.add(pL, pR, beam, sign, arrowSign, diamond);
      gantryGroup.userData = {
        signMat,
        diamondMat,
        diamond,
        arrowMat,
        index: i
      };
      this.worldGroup.add(gantryGroup);
      this.checkpointGantries.push(gantryGroup);
    }

    // 4. Start / Finish Line Checkered Strip
    const checkerCanvas = document.createElement('canvas');
    checkerCanvas.width = 128;
    checkerCanvas.height = 32;
    const cctx = checkerCanvas.getContext('2d');
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 32; y += 16) {
        cctx.fillStyle = ((x / 16 + y / 16) % 2 === 0) ? '#ffffff' : '#000000';
        cctx.fillRect(x, y, 16, 16);
      }
    }
    const checkerTex = new THREE.CanvasTexture(checkerCanvas);
    const finishLineGeo = new THREE.PlaneGeometry(trackWidth, 4);
    finishLineGeo.rotateX(-Math.PI / 2);
    const finishLine = new THREE.Mesh(finishLineGeo, new THREE.MeshBasicMaterial({ map: checkerTex }));
    finishLine.position.set(0, 0.08, -260);
    this.worldGroup.add(finishLine);

    // 5. Grandstand Seating along Main Straightaway
    const standGeo = new THREE.BoxGeometry(140, 14, 18);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.5 });
    const grandstand = new THREE.Mesh(standGeo, standMat);
    grandstand.position.set(0, 7, -260 - halfWidth - 14);
    this.worldGroup.add(grandstand);

    // Colorful spectator banner
    const banner = new THREE.Mesh(new THREE.BoxGeometry(130, 3, 0.4), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    banner.position.set(0, 11, -260 - halfWidth - 5);
    this.worldGroup.add(banner);

    // 6. Stadium Floodlight Pylons
    const lightPositions = [
      { x: -100, z: -290 }, { x: 100, z: -290 },
      { x: 340, z: 60 }, { x: 10, z: 320 },
      { x: -330, z: 50 }, { x: -200, z: -270 }
    ];
    lightPositions.forEach(lp => {
      const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 24, 8), pillarMat);
      pylon.position.set(lp.x, 12, lp.z);
      const head = new THREE.Mesh(new THREE.BoxGeometry(6, 1.8, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      head.position.set(lp.x, 24, lp.z);
      this.worldGroup.add(pylon, head);
    });

    // 7. Dynamic Checkpoint Sky Beacon (High-visibility light pillar visible across the entire open meadow)
    const beaconGroup = new THREE.Group();
    const beamGeo = new THREE.CylinderGeometry(5.0, 6.0, 95, 20, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.y = 47.5;

    const ringGeo = new THREE.RingGeometry(4.5, 8.5, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.25;

    const dGeo = new THREE.OctahedronGeometry(2.4);
    const dMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      blending: THREE.AdditiveBlending
    });
    const dMesh = new THREE.Mesh(dGeo, dMat);
    dMesh.position.y = 12.0;

    beaconGroup.add(beamMesh, ringMesh, dMesh);
    beaconGroup.position.copy(this.raceWaypoints[0]);
    this.worldGroup.add(beaconGroup);

    this.checkpointBeacon = {
      group: beaconGroup,
      beamMesh,
      ringMesh,
      dMesh,
      beamMat,
      ringMat,
      dMat
    };

    // Infield Stunt Ramp (For practice jumps in the open grassy meadow!)
    this.createRamp({
      id: 'raceway_infield_jump',
      startX: 0, startZ: -16,
      endX: 0, endZ: 16,
      startY: 0, endY: 4.5,
      width: 16,
      color: 0xeab308,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // Infield Jump Aerial Coins & Practice Key
    this.createCoin(0, 7.5, 30, 250);
    this.createCoin(0, 9.5, 45, 400);
    this.createCoin(0, 7.5, 60, 250);
    this.createKey(0, 10.5, 45, 'raceway_key_1', 1000);

    // Track Apex Coins
    this.createCoin(180, 1.2, -260, 150);
    this.createCoin(300, 1.2, -160, 150);
    this.createCoin(320, 1.2, 60, 150);
    this.createCoin(220, 1.2, 260, 150);
    this.createCoin(40, 1.2, 290, 150);
    this.createCoin(-160, 1.2, 260, 150);
    this.createCoin(-290, 1.2, 140, 150);
    this.createCoin(-310, 1.2, -80, 150);
    this.createCoin(-180, 1.2, -240, 150);

    this.trafficWaypoints = this.raceWaypoints;
  }

  // Live dynamic update for the Sky Beacon and Active Gate
  updateBeacon(currentCheckpointIndex, dt = 0.016) {
    if (!this.checkpointBeacon || !this.raceWaypoints || this.raceWaypoints.length === 0) return;
    const targetWp = this.raceWaypoints[currentCheckpointIndex];
    if (targetWp) {
      this.checkpointBeacon.group.position.set(targetWp.x, 0, targetWp.z);
      this.checkpointBeacon.beamMesh.rotation.y += dt * 1.2;
      this.checkpointBeacon.ringMesh.rotation.y -= dt * 1.8;
      this.checkpointBeacon.dMesh.rotation.y += dt * 2.5;

      const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.25;
      this.checkpointBeacon.beamMat.opacity = pulse;
      this.checkpointBeacon.ringMat.opacity = pulse * 1.1;

      // Highlight the active gantry with high-contrast color
      if (this.checkpointGantries) {
        this.checkpointGantries.forEach((gantry, idx) => {
          const isActive = (idx === currentCheckpointIndex);
          if (gantry.userData.signMat) {
            gantry.userData.signMat.color.setHex(isActive ? 0x22c55e : (idx === 0 ? 0x00f0ff : 0x0284c7));
          }
          if (gantry.userData.diamondMat) {
            gantry.userData.diamondMat.color.setHex(isActive ? 0xfacc15 : 0x00f0ff);
            gantry.userData.diamond.scale.setScalar(isActive ? 1.4 : 1.0);
          }
        });
      }
    }
  }

  // --- 3-FLOOR MULTI-TIER PARKING & STUNT CITADEL (30 KEYS WITH NARROW PRECISION PATHS) ---
  buildCyberCitadel(cx, cz) {
    const floorWidth = 76;
    const halfF = floorWidth / 2; // 38m

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.3
    });
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.8
    });
    const barrierMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
      metalness: 0.6
    });

    const neonCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const neonMagenta = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const neonGold = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    // 1. Center Elevator / Stairwell Core (Solid structural tower with glowing signs)
    const coreWidth = 14;
    const coreHeight = 22;
    const coreGeo = new THREE.BoxGeometry(coreWidth, coreHeight, coreWidth);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x070c18, metalness: 0.9, roughness: 0.2 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(cx, coreHeight / 2, cz);
    this.worldGroup.add(coreMesh);

    // Register center core collider
    this.colliders.push({
      minX: cx - coreWidth / 2, maxX: cx + coreWidth / 2,
      minZ: cz - coreWidth / 2, maxZ: cz + coreWidth / 2,
      minY: 0, maxY: coreHeight
    });

    // Holographic Signs on Core
    const signGeo = new THREE.PlaneGeometry(12, 3);
    const signMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
    const signNorth = new THREE.Mesh(signGeo, signMat);
    signNorth.position.set(cx, 13, cz + coreWidth / 2 + 0.1);
    const signSouth = new THREE.Mesh(signGeo, signMat);
    signSouth.position.set(cx, 13, cz - coreWidth / 2 - 0.1);
    signSouth.rotation.y = Math.PI;
    this.worldGroup.add(signNorth, signSouth);

    // 2. Heavy Structural Support Columns (Ground to Roof)
    const colCoords = [
      { x: cx - 34, z: cz - 34 }, { x: cx + 34, z: cz - 34 },
      { x: cx - 34, z: cz + 34 }, { x: cx + 34, z: cz + 34 },
      { x: cx, z: cz - 34 }, { x: cx, z: cz + 34 },
      { x: cx - 34, z: cz }, { x: cx + 34, z: cz }
    ];
    colCoords.forEach(c => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.2, 18, 8), columnMat);
      col.position.set(c.x, 9, c.z);
      col.castShadow = true;
      this.worldGroup.add(col);
      this.colliders.push({
        x: c.x, z: c.z, radius: 1.4,
        minY: 0, maxY: 18
      });
    });

    // Helper to create narrow path divider walls on a floor
    const createWall = (wx, wz, wLen, isHoriz, floorY, neonMat) => {
      const geo = isHoriz ? new THREE.BoxGeometry(wLen, 1.1, 0.6) : new THREE.BoxGeometry(0.6, 1.1, wLen);
      const wall = new THREE.Mesh(geo, barrierMat);
      wall.position.set(wx, floorY + 0.55, wz);
      const topRail = new THREE.Mesh(isHoriz ? new THREE.BoxGeometry(wLen, 0.12, 0.64) : new THREE.BoxGeometry(0.64, 0.12, wLen), neonMat);
      topRail.position.set(0, 0.56, 0);
      wall.add(topRail);
      this.worldGroup.add(wall);

      const halfX = isHoriz ? wLen / 2 : 0.3;
      const halfZ = isHoriz ? 0.3 : wLen / 2;
      this.colliders.push({
        minX: wx - halfX, maxX: wx + halfX,
        minZ: wz - halfZ, maxZ: wz + halfZ,
        minY: floorY - 0.2, maxY: floorY + 1.8
      });
    };

    // ==========================================
    // FLOOR 1 (LEVEL 1): Y = 5.0m · THE CYAN LABYRINTH
    // ==========================================
    const f1Slab = new THREE.Mesh(new THREE.BoxGeometry(floorWidth, 0.45, floorWidth), concreteMat);
    f1Slab.position.set(cx, 4.8, cz);
    f1Slab.receiveShadow = true;
    this.worldGroup.add(f1Slab);

    const f1Trim = new THREE.Mesh(new THREE.BoxGeometry(floorWidth + 0.4, 0.2, floorWidth + 0.4), neonCyan);
    f1Trim.position.set(cx, 4.95, cz);
    this.worldGroup.add(f1Trim);

    this.elevatedSurfaces.push({
      minX: cx - halfF, maxX: cx + halfF,
      minZ: cz - halfF, maxZ: cz + halfF,
      height: 5.0,
      ceilingHeight: 10.0
    });

    // Floor 1 Perimeter Railings (with gaps for entrance ramp and ramp to F2)
    createWall(cx - 20, cz - halfF, 36, true, 5.0, neonCyan); // South-West edge
    createWall(cx + 20, cz - halfF, 24, true, 5.0, neonCyan); // South-East edge
    createWall(cx - halfF, cz, floorWidth, false, 5.0, neonCyan); // West edge
    createWall(cx + halfF, cz - 12, floorWidth - 24, false, 5.0, neonCyan); // East edge
    createWall(cx, cz + halfF, floorWidth, true, 5.0, neonCyan); // North edge

    // Floor 1 Interior Narrow Dividers (Creating winding 6.5m lanes)
    createWall(cx - 18, cz - 16, 26, false, 5.0, neonCyan); // West divider
    createWall(cx - 18, cz + 16, 26, false, 5.0, neonCyan);
    createWall(cx + 18, cz - 16, 26, false, 5.0, neonCyan); // East divider
    createWall(cx + 18, cz + 16, 26, false, 5.0, neonCyan);

    // Floor 1 Keys (10 Keys on Floor 1)
    this.createKey(cx, 6.2, cz - 30, 'citadel_f1_key_1', 1000);   // Entry Portal apex
    this.createKey(cx - 28, 6.2, cz - 28, 'citadel_f1_key_2', 1000);// SW Hairpin corner
    this.createKey(cx - 28, 6.2, cz, 'citadel_f1_key_3', 1000);    // West Narrow Alley
    this.createKey(cx - 28, 6.2, cz + 28, 'citadel_f1_key_4', 1000);// NW Chicane
    this.createKey(cx, 6.2, cz + 28, 'citadel_f1_key_5', 1000);    // North Cross-Lane
    this.createKey(cx - 12, 6.2, cz, 'citadel_f1_key_6', 1000);    // Core West Bay
    this.createKey(cx + 12, 6.2, cz, 'citadel_f1_key_7', 1000);    // Core East Bay
    this.createKey(cx + 28, 6.2, cz - 10, 'citadel_f1_key_8', 1000);// East Corridor
    this.createKey(cx + 28, 6.2, cz - 28, 'citadel_f1_key_9', 1000);// SE Corner
    this.createKey(cx + 34, 7.8, cz, 'citadel_f1_key_10', 1000);   // Ramp 1->2 threshold

    // Floor 1 Guide Coins
    this.createCoin(cx - 28, 6.0, cz - 14, 200);
    this.createCoin(cx - 28, 6.0, cz + 14, 200);
    this.createCoin(cx - 14, 6.0, cz + 28, 200);
    this.createCoin(cx + 14, 6.0, cz + 28, 200);
    this.createCoin(cx + 28, 6.0, cz + 14, 200);

    // Entrance Ramp from Ground (South approach)
    this.createRamp({
      id: 'citadel_entry_ramp',
      startX: cx, startZ: cz - 58,
      endX: cx, endZ: cz - 36,
      startY: 0, endY: 5.0,
      width: 10,
      color: 0x1e293b,
      neonColor: 0x00f0ff,
      isStunt: false
    });

    // Exit Drop Ramp from Floor 1 (South-West corner down to street)
    this.createRamp({
      id: 'citadel_exit_ramp',
      startX: cx - 34, startZ: cz - 34,
      endX: cx - 34, endZ: cz - 58,
      startY: 5.0, endY: 0,
      width: 9,
      color: 0x1e293b,
      neonColor: 0x00f0ff,
      isStunt: false
    });

    // ==========================================
    // RAMP 1 -> 2 (CLIMBING FROM FLOOR 1 TO FLOOR 2)
    // ==========================================
    this.createRamp({
      id: 'citadel_ramp_f1_to_f2',
      startX: cx + 34, startZ: cz - 28,
      endX: cx + 34, endZ: cz + 28,
      startY: 5.0, endY: 10.5,
      width: 9,
      color: 0x1e293b,
      neonColor: 0xa855f7,
      isStunt: false
    });

    // ==========================================
    // FLOOR 2 (LEVEL 2): Y = 10.5m · THE NEON MAGENTA MAZE
    // ==========================================
    const f2Slab = new THREE.Mesh(new THREE.BoxGeometry(floorWidth, 0.45, floorWidth), concreteMat);
    f2Slab.position.set(cx, 10.3, cz);
    f2Slab.receiveShadow = true;
    this.worldGroup.add(f2Slab);

    const f2Trim = new THREE.Mesh(new THREE.BoxGeometry(floorWidth + 0.4, 0.2, floorWidth + 0.4), neonMagenta);
    f2Trim.position.set(cx, 10.45, cz);
    this.worldGroup.add(f2Trim);

    this.elevatedSurfaces.push({
      minX: cx - halfF, maxX: cx + halfF,
      minZ: cz - halfF, maxZ: cz + halfF,
      height: 10.5,
      ceilingHeight: 15.5
    });

    // Floor 2 Perimeter Railings
    createWall(cx, cz - halfF, floorWidth, true, 10.5, neonMagenta); // South edge
    createWall(cx - halfF, cz, floorWidth, false, 10.5, neonMagenta); // West edge
    createWall(cx + halfF, cz - 10, floorWidth - 20, false, 10.5, neonMagenta); // East edge
    createWall(cx - 20, cz + halfF, 36, true, 10.5, neonMagenta); // North-West edge

    // Floor 2 Narrow Zig-Zag Dividers & Skywalks
    createWall(cx, cz - 16, 32, true, 10.5, neonMagenta); // South internal bar
    createWall(cx, cz + 16, 32, true, 10.5, neonMagenta); // North internal bar
    createWall(cx - 16, cz, 20, false, 10.5, neonMagenta); // West chicane
    createWall(cx + 16, cz, 20, false, 10.5, neonMagenta); // East chicane

    // Floor 2 Keys (10 Keys on Floor 2)
    this.createKey(cx + 34, 11.7, cz + 26, 'citadel_f2_key_1', 1000);  // Level 2 arrival platform
    this.createKey(cx + 26, 11.7, cz + 26, 'citadel_f2_key_2', 1000);  // NE Balcony
    this.createKey(cx + 26, 11.7, cz - 6, 'citadel_f2_key_3', 1000);   // East Sky-Lane
    this.createKey(cx + 26, 11.7, cz - 28, 'citadel_f2_key_4', 1000);  // SE Vantage
    this.createKey(cx, 11.7, cz - 28, 'citadel_f2_key_5', 1000);       // South Crossover Skybridge
    this.createKey(cx - 28, 11.7, cz - 28, 'citadel_f2_key_6', 1000);  // SW Chicane
    this.createKey(cx - 28, 11.7, cz, 'citadel_f2_key_7', 1000);       // West Cantilever
    this.createKey(cx - 28, 11.7, cz + 26, 'citadel_f2_key_8', 1000);  // NW Tight Hairpin
    this.createKey(cx, 11.7, cz + 18, 'citadel_f2_key_9', 1000);       // Core North Balcony
    this.createKey(cx, 13.5, cz + 34, 'citadel_f2_key_10', 1000);      // Ramp 2->3 Midpoint Incline

    // Floor 2 Guide Coins
    this.createCoin(cx + 14, 11.5, cz - 28, 200);
    this.createCoin(cx - 14, 11.5, cz - 28, 200);
    this.createCoin(cx - 28, 11.5, cz - 14, 200);
    this.createCoin(cx - 28, 11.5, cz + 14, 200);
    this.createCoin(cx - 14, 11.5, cz + 26, 200);

    // ==========================================
    // RAMP 2 -> 3 (CLIMBING FROM FLOOR 2 TO ROOFTOP)
    // ==========================================
    this.createRamp({
      id: 'citadel_ramp_f2_to_f3',
      startX: cx + 28, startZ: cz + 34,
      endX: cx - 28, endZ: cz + 34,
      startY: 10.5, endY: 16.0,
      width: 9,
      color: 0x1e293b,
      neonColor: 0xfacc15,
      isStunt: false
    });

    // ==========================================
    // FLOOR 3 (LEVEL 3 / ROOFTOP DECK): Y = 16.0m · ELECTRIC GOLD SKYDECK
    // ==========================================
    const f3Slab = new THREE.Mesh(new THREE.BoxGeometry(floorWidth, 0.55, floorWidth), concreteMat);
    f3Slab.position.set(cx, 15.75, cz);
    f3Slab.receiveShadow = true;
    this.worldGroup.add(f3Slab);

    const f3Trim = new THREE.Mesh(new THREE.BoxGeometry(floorWidth + 0.4, 0.24, floorWidth + 0.4), neonGold);
    f3Trim.position.set(cx, 15.95, cz);
    this.worldGroup.add(f3Trim);

    this.elevatedSurfaces.push({
      minX: cx - halfF, maxX: cx + halfF,
      minZ: cz - halfF, maxZ: cz + halfF,
      height: 16.0,
      ceilingHeight: 9999
    });

    // Giant Helipad Circle Decal on Rooftop
    const heliRing = new THREE.Mesh(
      new THREE.RingGeometry(12, 13.5, 32),
      new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide })
    );
    heliRing.rotateX(-Math.PI / 2);
    heliRing.position.set(cx, 16.05, cz);
    this.worldGroup.add(heliRing);

    // Helipad "H" Decal
    const barGeo = new THREE.BoxGeometry(2, 0.05, 14);
    const crossGeo = new THREE.BoxGeometry(10, 0.05, 2);
    const hMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const bL = new THREE.Mesh(barGeo, hMat); bL.position.set(cx - 5, 16.05, cz);
    const bR = new THREE.Mesh(barGeo, hMat); bR.position.set(cx + 5, 16.05, cz);
    const bM = new THREE.Mesh(crossGeo, hMat); bM.position.set(cx, 16.05, cz);
    this.worldGroup.add(bL, bR, bM);

    // Rooftop Perimeter Guardrails (with gap at North for the Rooftop Mega Stunt Ramp!)
    createWall(cx, cz - halfF, floorWidth, true, 16.0, neonGold); // South edge
    createWall(cx - halfF, cz, floorWidth, false, 16.0, neonGold); // West edge
    createWall(cx + halfF, cz, floorWidth, false, 16.0, neonGold); // East edge
    createWall(cx - 24, cz + halfF, 28, true, 16.0, neonGold); // North-West edge
    createWall(cx + 24, cz + halfF, 28, true, 16.0, neonGold); // North-East edge

    // Rooftop Obstacles / Air Duct Blocks creating narrow precision chicanes
    const acGeo = new THREE.BoxGeometry(6, 2.2, 8);
    const acMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
    const ac1 = new THREE.Mesh(acGeo, acMat);
    ac1.position.set(cx - 18, 17.1, cz - 14);
    const ac2 = new THREE.Mesh(acGeo, acMat);
    ac2.position.set(cx + 18, 17.1, cz - 14);
    this.worldGroup.add(ac1, ac2);

    this.colliders.push({
      minX: cx - 21, maxX: cx - 15,
      minZ: cz - 18, maxZ: cz - 10,
      minY: 15.8, maxY: 18.5
    });
    this.colliders.push({
      minX: cx + 15, maxX: cx + 21,
      minZ: cz - 18, maxZ: cz - 10,
      minY: 15.8, maxY: 18.5
    });

    // Rooftop Keys (10 Keys on Floor 3)
    this.createKey(cx - 26, 17.2, cz + 28, 'citadel_f3_key_1', 1000); // Rooftop Arrival Gate
    this.createKey(cx - 26, 17.2, cz + 10, 'citadel_f3_key_2', 1000); // NW Helipad Marker
    this.createKey(cx - 26, 17.2, cz - 14, 'citadel_f3_key_3', 1000); // West Skydeck
    this.createKey(cx - 26, 17.2, cz - 28, 'citadel_f3_key_4', 1000); // SW Lookout
    this.createKey(cx, 17.2, cz - 28, 'citadel_f3_key_5', 1000);      // South Edge Runway
    this.createKey(cx + 26, 17.2, cz - 28, 'citadel_f3_key_6', 1000); // SE Corner Vantage
    this.createKey(cx + 26, 17.2, cz, 'citadel_f3_key_7', 1000);      // East Rooftop Chicane
    this.createKey(cx + 26, 17.2, cz + 26, 'citadel_f3_key_8', 1000); // NE Solar Array Alley
    this.createKey(cx, 17.2, cz, 'citadel_f3_key_9', 1000);           // Helipad Center Bullseye
    this.createKey(cx, 23.5, cz + 44, 'citadel_f3_key_10', 1000);     // ROOFTOP STUNT LAUNCH APEX! (Floating high in mid-air off roof!)

    // Rooftop Guide Coins
    this.createCoin(cx - 26, 17.0, cz - 2, 250);
    this.createCoin(cx - 13, 17.0, cz - 28, 250);
    this.createCoin(cx + 13, 17.0, cz - 28, 250);
    this.createCoin(cx + 26, 17.0, cz - 14, 250);
    this.createCoin(cx, 17.0, cz - 10, 250);

    // ==========================================
    // ROOFTOP MEGA STUNT LAUNCH RAMP
    // ==========================================
    // Launches cars off the 3rd floor rooftop 22m into the sky over North Avenue!
    this.createRamp({
      id: 'citadel_rooftop_mega_jump',
      startX: cx, startZ: cz + 8,
      endX: cx, endZ: cz + 38,
      startY: 16.0, endY: 21.8,
      width: 14,
      color: 0x070c18,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // Aerial flight coins over the rooftop launch
    this.createCoin(cx, 22.0, cz + 52, 500);
    this.createCoin(cx, 24.5, cz + 72, 750);
    this.createCoin(cx, 21.0, cz + 92, 500);
  }

  // --- WORLD 1: METROVALE (Modern Metropolis) ---
  buildMetrovale() {
    const roadMat = new THREE.MeshStandardMaterial({
      map: this.roadTexture,
      roughness: 0.6,
      metalness: 0.1
    });

    const sidewalkMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8
    });

    const bldgPalette = [0x1e293b, 0x0f172a, 0x334155, 0x1e1b4b, 0x111827];

    // Main Ground Field
    const groundGeo = new THREE.PlaneGeometry(1600, 1600);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    this.worldGroup.add(ground);

    // City Grid: 6x6 blocks with interconnected avenues
    const blockSize = 80;
    const roadWidth = 24;

    for (let bx = -3; bx <= 3; bx++) {
      for (let bz = -3; bz <= 3; bz++) {
        const cx = bx * (blockSize + roadWidth);
        const cz = bz * (blockSize + roadWidth);

        // Sidewalk Base for Block
        const swGeo = new THREE.BoxGeometry(blockSize, 0.35, blockSize);
        const swMesh = new THREE.Mesh(swGeo, sidewalkMat);
        swMesh.position.set(cx, 0.18, cz);
        swMesh.receiveShadow = true;
        this.worldGroup.add(swMesh);

        // Skyscrapers & Architecture (Keep Grand Central Boulevard bx = 0 open for ramps & high speed)
        // Also keep block bx = 1, bz = 1 open for the 3-Floor Cyber Citadel Complex!
        if (bx !== 0 && !(bx === 1 && bz === 1)) {
          const bldgHeight = 35 + Math.random() * 85;
          const bldgGeo = new THREE.BoxGeometry(blockSize - 14, bldgHeight, blockSize - 14);
          const bMat = new THREE.MeshStandardMaterial({
            color: bldgPalette[Math.floor(Math.random() * bldgPalette.length)],
            roughness: 0.3,
            metalness: 0.7
          });
          const bldg = new THREE.Mesh(bldgGeo, bMat);
          bldg.position.set(cx, bldgHeight / 2 + 0.35, cz);
          bldg.castShadow = true;
          bldg.receiveShadow = true;
          this.worldGroup.add(bldg);

          // Register collision box
          const half = (blockSize - 14) / 2;
          this.colliders.push({
            minX: cx - half, maxX: cx + half,
            minZ: cz - half, maxZ: cz + half,
            maxY: bldgHeight + 0.35
          });
        }
      }
    }

    // Build the 3-Floor Cyber Citadel Building with 30 Keys & Narrow Paths at bx = 1, bz = 1 (cx = 104, cz = 104)
    this.buildCyberCitadel(104, 104);

    // Continuous Road Networks (North-South & East-West Avenues)
    const roadLen = 900;

    // Central Grand Boulevard (Wide, straight high-speed corridor through the center plaza)
    const centralBlvdGeo = new THREE.PlaneGeometry(roadWidth * 1.5, roadLen);
    centralBlvdGeo.rotateX(-Math.PI / 2);
    const centralBlvd = new THREE.Mesh(centralBlvdGeo, roadMat);
    centralBlvd.position.set(0, 0.052, 0);
    centralBlvd.receiveShadow = true;
    this.worldGroup.add(centralBlvd);

    for (let i = -3; i <= 3; i++) {
      const offset = i * (blockSize + roadWidth) + (blockSize / 2 + roadWidth / 2);

      // East-West Road
      const ewGeo = new THREE.PlaneGeometry(roadLen, roadWidth);
      ewGeo.rotateX(-Math.PI / 2);
      const ewRoad = new THREE.Mesh(ewGeo, roadMat);
      ewRoad.position.set(0, 0.05, offset);
      ewRoad.receiveShadow = true;
      this.worldGroup.add(ewRoad);

      // North-South Road
      const nsGeo = new THREE.PlaneGeometry(roadWidth, roadLen);
      nsGeo.rotateX(-Math.PI / 2);
      const nsRoad = new THREE.Mesh(nsGeo, roadMat);
      nsRoad.position.set(offset, 0.05, 0);
      nsRoad.receiveShadow = true;
      this.worldGroup.add(nsRoad);
    }

    // Elevated Highway Overpass Loop
    const flyoverMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 });
    const flyoverGeo = new THREE.BoxGeometry(600, 1.2, 22);
    const flyover = new THREE.Mesh(flyoverGeo, flyoverMat);
    flyover.position.set(0, 9.5, -280);
    this.worldGroup.add(flyover);

    this.elevatedSurfaces.push({
      minX: -300, maxX: 300,
      minZ: -291, maxZ: -269,
      height: 9.5
    });

    // West Highway On-Ramp (Ground x = -410 to Flyover x = -290)
    this.createRamp({
      id: 'metro_highway_on',
      startX: -410, startZ: -280,
      endX: -290, endZ: -280,
      startY: 0, endY: 9.5,
      width: 20,
      color: 0x334155,
      neonColor: 0x00f0ff,
      isStunt: false
    });

    // East Highway Off-Ramp (Flyover x = 290 to Ground x = 410)
    this.createRamp({
      id: 'metro_highway_off',
      startX: 290, startZ: -280,
      endX: 410, endZ: -280,
      startY: 9.5, endY: 0,
      width: 20,
      color: 0x334155,
      neonColor: 0x00f0ff,
      isStunt: false
    });

    // --- WIDELY DISTRIBUTED STUNT RAMPS (ACROSS ALL MAP SECTORS & QUADRANTS) ---
    // 1. Central Plaza Main Stunt Jump Ramp (Central Sector)
    this.createRamp({
      id: 'metro_plaza_stunt_north',
      startX: 0, startZ: 25,
      endX: 0, endZ: 58,
      startY: 0, endY: 5.2,
      width: 16,
      color: 0xeab308,
      neonColor: 0xfacc15,
      isStunt: true
    });

    // 2. North Downtown Financial District Sky Leap (North-West Sector)
    this.createRamp({
      id: 'metro_downtown_north_jump',
      startX: -104, startZ: 235,
      endX: -104, endZ: 275,
      startY: 0, endY: 5.6,
      width: 16,
      color: 0x0f172a,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // 3. South Industrial Mega Launch (South-West Sector)
    this.createRamp({
      id: 'metro_industrial_south_jump',
      startX: -208, startZ: -135,
      endX: -208, endZ: -175,
      startY: 0, endY: 5.8,
      width: 16,
      color: 0xeab308,
      neonColor: 0xfacc15,
      isStunt: true
    });

    // 4. East Tech Canal Leap Ramp (South-East Sector, launches East)
    this.createRamp({
      id: 'metro_canal_east_jump',
      startX: 208, startZ: -80,
      endX: 248, endZ: -80,
      startY: 0, endY: 5.4,
      width: 16,
      color: 0x0f172a,
      neonColor: 0xa855f7,
      isStunt: true
    });

    // 5. West Harbor Boardwalk Leap Ramp (Far West Sector, launches West)
    this.createRamp({
      id: 'metro_harbor_west_jump',
      startX: -208, startZ: 80,
      endX: -248, endZ: 80,
      startY: 0, endY: 5.4,
      width: 16,
      color: 0x0f172a,
      neonColor: 0x22c55e,
      isStunt: true
    });

    // 6. Northeast Cyber Cross Ramp (North-East Sector)
    this.createRamp({
      id: 'metro_cross_northeast_jump',
      startX: 208, startZ: 165,
      endX: 208, endZ: 205,
      startY: 0, endY: 5.8,
      width: 16,
      color: 0x0f172a,
      neonColor: 0x38bdf8,
      isStunt: true
    });

    // 7. Elevated Highway Sky Jump (High in mid-air on the elevated overpass loop!)
    this.createRamp({
      id: 'metro_highway_sky_jump',
      startX: -40, startZ: -280,
      endX: 5, endZ: -280,
      startY: 9.5, endY: 15.0,
      width: 18,
      color: 0x334155,
      neonColor: 0xfacc15,
      isStunt: true
    });

    // --- FREE-ROAM COLLECTIBLES (Coins & Cyber Keys) ---
    // Mid-air Coins Arcs over Distributed Stunt Ramps (Jump to collect!)
    // Plaza Jump Coins
    this.createCoin(0, 7.5, 75, 250);
    this.createCoin(0, 9.8, 90, 350);
    this.createCoin(0, 7.5, 105, 250);

    // North Downtown Jump Coins
    this.createCoin(-104, 8.5, 290, 350);
    this.createCoin(-104, 11.2, 308, 500);
    this.createCoin(-104, 8.5, 325, 350);

    // South Industrial Jump Coins
    this.createCoin(-208, 8.5, -190, 350);
    this.createCoin(-208, 11.2, -208, 500);
    this.createCoin(-208, 8.5, -225, 350);

    // East Tech Canal Jump Coins
    this.createCoin(262, 8.5, -80, 350);
    this.createCoin(280, 11.0, -80, 450);
    this.createCoin(298, 8.5, -80, 350);

    // West Harbor Jump Coins
    this.createCoin(-262, 8.5, 80, 350);
    this.createCoin(-280, 11.0, 80, 450);
    this.createCoin(-298, 8.5, 80, 350);

    // Northeast Cyber Cross Jump Coins
    this.createCoin(208, 8.5, 220, 350);
    this.createCoin(208, 11.2, 238, 500);
    this.createCoin(208, 8.5, 255, 350);

    // Highway Sky Jump Coins
    this.createCoin(20, 17.5, -280, 400);
    this.createCoin(40, 20.2, -280, 600);
    this.createCoin(60, 17.5, -280, 400);

    // Highway Overpass Aerial Coins
    this.createCoin(-120, 11.0, -280, 300);
    this.createCoin(0, 11.0, -280, 400);
    this.createCoin(120, 11.0, -280, 300);

    // Ground Street Coins
    this.createCoin(52, 1.2, 0, 200);
    this.createCoin(52, 1.2, 180, 200);
    this.createCoin(52, 1.2, -180, 200);
    this.createCoin(-52, 1.2, 0, 200);
    this.createCoin(-52, 1.2, 180, 200);
    this.createCoin(-52, 1.2, -180, 200);
    this.createCoin(156, 1.2, 52, 200);
    this.createCoin(-156, 1.2, -52, 200);

    // 5 Hidden Golden Cyber Keys (Collect all for massive rewards!)
    this.createKey(0, 11.8, 90, 'metro_key_1', 1000);   // High in mid-air over Plaza Ramp
    this.createKey(0, 11.2, -280, 'metro_key_2', 1000); // Center of Highway Flyover
    this.createKey(52, 1.2, 260, 'metro_key_3', 1000);  // North Avenue terminus
    this.createKey(-156, 1.2, 104, 'metro_key_4', 1000);// West Tech Alley
    this.createKey(0, 1.2, -320, 'metro_key_5', 1000);  // South Grand Plaza Gate

    // Streetlights Rig
    for (let x = -300; x <= 300; x += 100) {
      for (let z = -300; z <= 300; z += 100) {
        if (Math.abs(x) < 50 && Math.abs(z) < 50) continue;
        const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 7, 8);
        const pole = new THREE.Mesh(poleGeo, sidewalkMat);
        pole.position.set(x + 14, 3.5, z + 14);
        const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.4), new THREE.MeshBasicMaterial({ color: 0xfff1aa }));
        lampHead.position.set(x + 14, 7, z + 14);
        this.worldGroup.add(pole, lampHead);
      }
    }

    // Traffic Waypoint Nodes (Looping City Circuit)
    this.trafficWaypoints = [
      new THREE.Vector3(-300, 0, -300),
      new THREE.Vector3(300, 0, -300),
      new THREE.Vector3(300, 0, 300),
      new THREE.Vector3(-300, 0, 300),
      new THREE.Vector3(-300, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(300, 0, 0)
    ];

    // Race Circuit Checkpoints
    this.raceWaypoints = [
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(180, 0, -80),
      new THREE.Vector3(180, 0, 180),
      new THREE.Vector3(0, 0, 180),
      new THREE.Vector3(-180, 0, 180),
      new THREE.Vector3(-180, 0, -80)
    ];
  }

  // --- WORLD 2: APEX HIGHLANDS (Mountain Passes & Forest) ---
  buildApexHighlands() {
    const terrainGeo = new THREE.PlaneGeometry(1600, 1600, 32, 32);
    terrainGeo.rotateX(-Math.PI / 2);
    // Add procedural hills
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter > 80) {
        const height = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 45 + Math.sin(x * 0.03) * 15;
        pos.setY(i, Math.max(0, height));
      }
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({ color: 0x1c3822, roughness: 0.95 });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    this.worldGroup.add(terrain);

    // Winding Mountain S-Curve Road Ribbons
    const curvePoints = [
      new THREE.Vector3(-350, 0, -350),
      new THREE.Vector3(-200, 12, -220),
      new THREE.Vector3(-80, 24, -120),
      new THREE.Vector3(0, 32, 0),
      new THREE.Vector3(140, 22, 120),
      new THREE.Vector3(260, 14, 250),
      new THREE.Vector3(380, 4, 380)
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const roadTubeGeo = new THREE.TubeGeometry(curve, 80, 10, 8, false);
    const roadTubeMat = new THREE.MeshStandardMaterial({ color: 0x272f3d, roughness: 0.7 });
    const roadTube = new THREE.Mesh(roadTubeGeo, roadTubeMat);
    roadTube.position.y = -7.5; // Half bury into terrain
    this.worldGroup.add(roadTube);

    // Pine Forest (Instanced Trees)
    const treeTrunkGeo = new THREE.CylinderGeometry(0.4, 0.7, 5, 6);
    const treeFoliageGeo = new THREE.ConeGeometry(3.5, 9, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x144023, roughness: 0.85 });

    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 450;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;

      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(treeTrunkGeo, trunkMat);
      trunk.position.y = 2.5;
      const foliage = new THREE.Mesh(treeFoliageGeo, foliageMat);
      foliage.position.y = 7.5;
      tree.add(trunk, foliage);
      tree.position.set(tx, 0, tz);

      this.worldGroup.add(tree);
      this.colliders.push({ minX: tx - 1.2, maxX: tx + 1.2, minZ: tz - 1.2, maxZ: tz + 1.2 });
    }

    // Canyon Bridge & Elevated Surface
    const bridgeGeo = new THREE.BoxGeometry(16, 2, 140);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6 });
    const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
    bridge.position.set(0, 18, -180);
    this.worldGroup.add(bridge);

    this.elevatedSurfaces.push({
      minX: -8, maxX: 8,
      minZ: -250, maxZ: -110,
      height: 18
    });

    // Canyon Stunt Jump Ramp (Ravine Leap Jump mission!)
    this.createRamp({
      id: 'highlands_ravine_jump',
      startX: 0, startZ: 62,
      endX: 0, endZ: 92,
      startY: 0, endY: 5.2,
      width: 16,
      color: 0xeab308,
      neonColor: 0xfacc15,
      isStunt: true
    });

    // Mountain Ridge Jump Ramp
    this.createRamp({
      id: 'highlands_ridge_jump',
      startX: 175, startZ: 160,
      endX: 205, endZ: 185,
      startY: 12, endY: 17.5,
      width: 14,
      color: 0xeab308,
      neonColor: 0x22c55e,
      isStunt: true
    });

    // Alpine Summit Leap Stunt Ramp
    this.createRamp({
      id: 'highlands_summit_leap',
      startX: -120, startZ: -120,
      endX: -95, endZ: -95,
      startY: 18, endY: 24.5,
      width: 14,
      color: 0x0f172a,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // --- FREE-ROAM COLLECTIBLES (Coins & Cyber Keys) ---
    // Mid-air Coins Arcs over Ravine Jump
    this.createCoin(0, 8.5, 108, 300);
    this.createCoin(0, 11.2, 126, 450);
    this.createCoin(0, 8.5, 144, 300);

    // Mid-air Coins Arcs over Ridge Jump
    this.createCoin(220, 20.5, 200, 350);
    this.createCoin(236, 23.5, 215, 500);
    this.createCoin(250, 19.5, 230, 350);

    // Mid-air Coins Arcs over Alpine Summit Leap
    this.createCoin(-80, 27.0, -80, 400);
    this.createCoin(-65, 30.0, -65, 550);
    this.createCoin(-50, 26.0, -50, 400);

    // Suspension Bridge Coins
    this.createCoin(0, 19.5, -230, 250);
    this.createCoin(0, 19.5, -180, 350);
    this.createCoin(0, 19.5, -130, 250);

    // Mountain Pass Road Coins
    this.createCoin(-200, 13.0, -220, 200);
    this.createCoin(-80, 25.0, -120, 200);
    this.createCoin(0, 33.0, 0, 250);
    this.createCoin(140, 23.0, 120, 200);
    this.createCoin(260, 15.0, 250, 200);

    // 5 Hidden Golden Cyber Keys
    this.createKey(0, 13.5, 126, 'highlands_key_1', 1000);  // High in mid-air over Ravine Jump
    this.createKey(0, 21.0, -180, 'highlands_key_2', 1000); // Canyon Suspension Bridge center
    this.createKey(-65, 32.5, -65, 'highlands_key_3', 1000); // Alpine Summit Leap Apex
    this.createKey(-280, 3.0, -280, 'highlands_key_4', 1000); // Secluded Alpine Glade
    this.createKey(320, 9.0, 320, 'highlands_key_5', 1000); // High Overlook Peak

    this.trafficWaypoints = curvePoints;
    this.raceWaypoints = [
      new THREE.Vector3(-320, 2, -320),
      new THREE.Vector3(-180, 14, -200),
      new THREE.Vector3(0, 32, 0),
      new THREE.Vector3(180, 18, 180),
      new THREE.Vector3(350, 4, 350)
    ];
  }

  // --- WORLD 3: NEON DISTRICT (Futuristic Metropolis) ---
  buildNeonDistrict() {
    const cyberGroundGeo = new THREE.PlaneGeometry(1600, 1600);
    cyberGroundGeo.rotateX(-Math.PI / 2);
    const cyberGroundMat = new THREE.MeshStandardMaterial({
      color: 0x05070e,
      roughness: 0.25,
      metalness: 0.85
    });
    const ground = new THREE.Mesh(cyberGroundGeo, cyberGroundMat);
    ground.receiveShadow = true;
    this.worldGroup.add(ground);

    // Glowing Neon Circuit Road Grid
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      roughness: 0.3,
      metalness: 0.8
    });

    for (let x = -300; x <= 300; x += 150) {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(28, 900), roadMat);
      road.rotateX(-Math.PI / 2);
      road.position.set(x, 0.06, 0);
      this.worldGroup.add(road);

      // Glowing Neon Edge Lines (Cyan & Violet)
      const edgeL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 900), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
      edgeL.position.set(x - 13.8, 0.12, 0);
      const edgeR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 900), new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
      edgeR.position.set(x + 13.8, 0.12, 0);
      this.worldGroup.add(edgeL, edgeR);
    }

    for (let z = -300; z <= 300; z += 150) {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(900, 28), roadMat);
      road.rotateX(-Math.PI / 2);
      road.position.set(0, 0.06, z);
      this.worldGroup.add(road);
    }

    // Monolithic Cyber Towers with Glowing Accent Strips
    for (let bx = -2; bx <= 2; bx++) {
      for (let bz = -2; bz <= 2; bz++) {
        if (bx === 0 && bz === 0) continue;
        const tx = bx * 150 + 75;
        const tz = bz * 150 + 75;
        const height = 90 + Math.random() * 110;

        const towerGeo = new THREE.BoxGeometry(85, height, 85);
        const towerMat = new THREE.MeshStandardMaterial({
          color: 0x070c18,
          metalness: 0.9,
          roughness: 0.15
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.set(tx, height / 2, tz);
        this.worldGroup.add(tower);

        // Holographic Billboard on side
        const billboardGeo = new THREE.PlaneGeometry(60, 28);
        const billboardMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00f0ff : 0xa855f7,
          wireframe: true
        });
        const bb = new THREE.Mesh(billboardGeo, billboardMat);
        bb.position.set(tx, 55, tz + 43);
        this.worldGroup.add(bb);

        this.colliders.push({ minX: tx - 43, maxX: tx + 43, minZ: tz - 43, maxZ: tz + 43 });
      }
    }

    // Elevated Skyway Ring
    const ringGeo = new THREE.RingGeometry(220, 245, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 15;
    this.worldGroup.add(ring);

    this.elevatedSurfaces.push({
      minX: -80, maxX: 80,
      minZ: 210, maxZ: 255,
      height: 15
    });

    // 1. Cyber Mega Stunt Ramp (Northbound - launches towards the elevated Skyway ring!)
    this.createRamp({
      id: 'neon_skyway_jump',
      startX: 0, startZ: 68,
      endX: 0, endZ: 98,
      startY: 0, endY: 5.6,
      width: 18,
      color: 0x070c18,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // 2. Cyber Return Stunt Ramp (Southbound)
    this.createRamp({
      id: 'neon_skyway_return',
      startX: 0, startZ: -68,
      endX: 0, endZ: -98,
      startY: 0, endY: 5.6,
      width: 18,
      color: 0x070c18,
      neonColor: 0xa855f7,
      isStunt: true
    });

    // 3. East Cyber Avenue Stunt Leap
    this.createRamp({
      id: 'neon_east_avenue_jump',
      startX: 150, startZ: 68,
      endX: 150, endZ: 98,
      startY: 0, endY: 5.0,
      width: 16,
      color: 0x070c18,
      neonColor: 0x00f0ff,
      isStunt: true
    });

    // 4. West Cyber Avenue Stunt Leap
    this.createRamp({
      id: 'neon_west_avenue_jump',
      startX: -150, startZ: 68,
      endX: -150, endZ: 98,
      startY: 0, endY: 5.0,
      width: 16,
      color: 0x070c18,
      neonColor: 0xa855f7,
      isStunt: true
    });

    // --- FREE-ROAM COLLECTIBLES (Coins & Cyber Keys) ---
    // Mid-air Coins Arcs over North Skyway Jump
    this.createCoin(0, 8.5, 115, 300);
    this.createCoin(0, 12.0, 135, 450);
    this.createCoin(0, 15.5, 155, 600);
    this.createCoin(0, 16.5, 175, 400);

    // Mid-air Coins Arcs over South Skyway Jump
    this.createCoin(0, 8.5, -115, 300);
    this.createCoin(0, 12.0, -135, 450);
    this.createCoin(0, 15.5, -155, 600);
    this.createCoin(0, 16.5, -175, 400);

    // Mid-air Coins Arcs over East/West Avenue Jumps
    this.createCoin(150, 8.5, 115, 350);
    this.createCoin(150, 11.5, 132, 450);
    this.createCoin(150, 8.5, 150, 350);

    this.createCoin(-150, 8.5, 115, 350);
    this.createCoin(-150, 11.5, 132, 450);
    this.createCoin(-150, 8.5, 150, 350);

    // Ground Neon Boulevard Coins
    this.createCoin(0, 1.2, -40, 200);
    this.createCoin(0, 1.2, 40, 200);
    this.createCoin(150, 1.2, 0, 200);
    this.createCoin(-150, 1.2, 0, 200);
    this.createCoin(150, 1.2, -150, 200);
    this.createCoin(-150, 1.2, -150, 200);
    this.createCoin(0, 1.2, 220, 200);
    this.createCoin(0, 1.2, -220, 200);

    // 5 Hidden Golden Cyber Keys
    this.createKey(0, 17.5, 145, 'neon_key_1', 1000);  // Apex of North Skyway Launch
    this.createKey(0, 16.5, 232, 'neon_key_2', 1000);  // Elevated Skyway Ring North Arch
    this.createKey(0, 17.5, -145, 'neon_key_3', 1000); // Apex of South Skyway Launch
    this.createKey(-150, 13.5, 132, 'neon_key_4', 1000);// West Cyber Avenue Leap Apex
    this.createKey(225, 1.2, 225, 'neon_key_5', 1000);  // Monolith Plaza North-East Corner

    this.trafficWaypoints = [
      new THREE.Vector3(-220, 0, -220),
      new THREE.Vector3(220, 0, -220),
      new THREE.Vector3(220, 0, 220),
      new THREE.Vector3(-220, 0, 220)
    ];

    this.raceWaypoints = [
      new THREE.Vector3(0, 0, -220),
      new THREE.Vector3(220, 0, -220),
      new THREE.Vector3(220, 0, 0),
      new THREE.Vector3(220, 0, 220),
      new THREE.Vector3(0, 0, 220),
      new THREE.Vector3(-220, 0, 220),
      new THREE.Vector3(-220, 0, -220)
    ];
  }

  checkRamps(posX, posZ, posY, velocity) {
    for (let i = 0; i < this.ramps.length; i++) {
      const r = this.ramps[i];
      const dx = posX - r.startX;
      const dz = posZ - r.startZ;

      const proj = dx * r.dirX + dz * r.dirZ;
      const perp = dx * (-r.dirZ) + dz * r.dirX;
      const halfW = r.width / 2;

      // Inside lateral lane (with side rails)
      if (Math.abs(perp) <= halfW + 1.2) {
        if (proj >= -1.2 && proj <= r.length + 0.8) {
          const t = Math.max(0, Math.min(proj / r.length, 1.0));
          const surfaceY = r.startY + t * (r.endY - r.startY) + 0.4;

          if (posY >= surfaceY - 2.0 && posY <= surfaceY + 2.8) {
            // Keep inside rails
            if (Math.abs(perp) > halfW - 0.2) {
              const pushSign = Math.sign(perp);
              const pushAmt = Math.abs(perp) - (halfW - 0.2);
              posX -= (-r.dirZ) * pushAmt * pushSign;
              posZ -= r.dirX * pushAmt * pushSign;
              if (velocity) {
                const vPerp = velocity.x * (-r.dirZ) + velocity.z * r.dirX;
                velocity.x -= (-r.dirZ) * vPerp * 1.2;
                velocity.z -= r.dirX * vPerp * 1.2;
              }
            }

            const forwardSpeed = velocity ? (velocity.x * r.dirX + velocity.z * r.dirZ) : 0;

            // Launch off Lip for Stunt Ramps
            if (r.isStunt && proj >= r.length - 0.5 && forwardSpeed > 2.5) {
              const launchVy = Math.max(forwardSpeed * Math.sin(r.slopeAngle) * 1.6 + 6.0, 5.0);
              return {
                onRamp: true,
                height: r.endY + 0.4,
                pitch: -r.slopeAngle,
                launched: true,
                launchVy: launchVy
              };
            }

            // Climbing the ramp
            return {
              onRamp: true,
              height: surfaceY,
              pitch: -r.slopeAngle,
              launched: false
            };
          }
        }
      }
    }
    return null;
  }

  getElevatedGroundHeight(posX, posZ, posY) {
    let bestH = 0;
    for (let i = 0; i < this.elevatedSurfaces.length; i++) {
      const s = this.elevatedSurfaces[i];
      if (posX >= s.minX && posX <= s.maxX && posZ >= s.minZ && posZ <= s.maxZ) {
        const ceiling = (s.ceilingHeight !== undefined) ? s.ceilingHeight : (s.height + 5.5);
        if (posY >= s.height - 1.8 && posY <= ceiling && s.height >= bestH) {
          bestH = s.height;
        }
      }
    }
    return bestH;
  }

  resolveVehicleCollision(pos, velocity, speedKmh, radius = 1.35) {
    let result = {
      collided: false,
      crashed: false,
      normal: null,
      speedKmh: speedKmh,
      contactPos: pos.clone()
    };

    // 2 iterations guarantee no corner clipping or penetration into buildings
    for (let iter = 0; iter < 2; iter++) {
      for (let i = 0; i < this.colliders.length; i++) {
        const c = this.colliders[i];

        if (c.maxY !== undefined && pos.y > c.maxY) continue;
        if (c.minY !== undefined && pos.y + 1.2 < c.minY) continue;

        if (c.radius) {
          const dx = pos.x - c.x;
          const dz = pos.z - c.z;
          const minDist = radius + c.radius;
          const distSq = dx * dx + dz * dz;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq) || 0.001;
            const normX = dx / dist;
            const normZ = dz / dist;
            const overlap = minDist - dist;

            // Push car strictly outside
            pos.x += normX * (overlap + 0.12);
            pos.z += normZ * (overlap + 0.12);

            const velAlongNorm = velocity.x * normX + velocity.z * normZ;
            if (velAlongNorm < 0) {
              result.collided = true;
              result.normal = new THREE.Vector3(normX, 0, normZ);
              result.contactPos.set(c.x + normX * c.radius, pos.y, c.z + normZ * c.radius);

              const impactSpeed = Math.max(speedKmh, Math.abs(velAlongNorm) * 3.6);
              result.speedKmh = impactSpeed;

              if (impactSpeed < 40) {
                // BELOW 40 KM/H: ONLY COLLIDE, DO NOT CRASH!
                velocity.x -= normX * velAlongNorm * 1.15;
                velocity.z -= normZ * velAlongNorm * 1.15;
                velocity.multiplyScalar(0.92);
                result.crashed = false;
              } else {
                // AT OR ABOVE 40 KM/H: CRASH!
                pos.x += normX * 0.90;
                pos.z += normZ * 0.90;
                velocity.x -= normX * velAlongNorm * 1.6;
                velocity.z -= normZ * velAlongNorm * 1.6;
                velocity.multiplyScalar(0.20);
                result.crashed = true;
              }
            }
          }
        } else {
          // Bounding Box Collider (Buildings, walls, barriers)
          const cx = Math.max(c.minX, Math.min(pos.x, c.maxX));
          const cz = Math.max(c.minZ, Math.min(pos.z, c.maxZ));

          const dx = pos.x - cx;
          const dz = pos.z - cz;
          const distSq = dx * dx + dz * dz;
          const isInside = (pos.x >= c.minX && pos.x <= c.maxX && pos.z >= c.minZ && pos.z <= c.maxZ);

          if (distSq < radius * radius || isInside) {
            let normX = 0, normZ = 0;
            let contactX = cx, contactZ = cz;

            if (!isInside && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              normX = dx / dist;
              normZ = dz / dist;
              const overlap = radius - dist;
              pos.x += normX * (overlap + 0.15);
              pos.z += normZ * (overlap + 0.15);
            } else {
              // Strictly eject car center to nearest exterior face
              const penLeft = pos.x - c.minX;
              const penRight = c.maxX - pos.x;
              const penBack = pos.z - c.minZ;
              const penFront = c.maxZ - pos.z;
              const minPen = Math.min(penLeft, penRight, penBack, penFront);

              if (minPen === penLeft) {
                normX = -1;
                pos.x = c.minX - radius - 0.20;
                contactX = c.minX;
              } else if (minPen === penRight) {
                normX = 1;
                pos.x = c.maxX + radius + 0.20;
                contactX = c.maxX;
              } else if (minPen === penBack) {
                normZ = -1;
                pos.z = c.minZ - radius - 0.20;
                contactZ = c.minZ;
              } else {
                normZ = 1;
                pos.z = c.maxZ + radius + 0.20;
                contactZ = c.maxZ;
              }
            }

            const velAlongNorm = velocity.x * normX + velocity.z * normZ;
            if (velAlongNorm < 0) {
              result.collided = true;
              result.normal = new THREE.Vector3(normX, 0, normZ);
              result.contactPos.set(contactX, pos.y, contactZ);

              const impactSpeed = Math.max(speedKmh, Math.abs(velAlongNorm) * 3.6);
              result.speedKmh = impactSpeed;

              if (impactSpeed < 40) {
                // BELOW 40 KM/H: ONLY COLLIDE, DO NOT CRASH!
                velocity.x -= normX * velAlongNorm * 1.15;
                velocity.z -= normZ * velAlongNorm * 1.15;
                velocity.multiplyScalar(0.92);
                result.crashed = false;
              } else {
                // AT OR ABOVE 40 KM/H: CRASH!
                pos.x += normX * 0.95;
                pos.z += normZ * 0.95;
                velocity.x -= normX * velAlongNorm * 1.6;
                velocity.z -= normZ * velAlongNorm * 1.6;
                velocity.multiplyScalar(0.20);
                result.crashed = true;
              }
            }
          }
        }
      }
    }

    // Map limits
    const mapLim = 770;
    if (pos.x < -mapLim) { pos.x = -mapLim; velocity.x = Math.abs(velocity.x) * 0.5; }
    if (pos.x > mapLim) { pos.x = mapLim; velocity.x = -Math.abs(velocity.x) * 0.5; }
    if (pos.z < -mapLim) { pos.z = -mapLim; velocity.z = Math.abs(velocity.z) * 0.5; }
    if (pos.z > mapLim) { pos.z = mapLim; velocity.z = -Math.abs(velocity.z) * 0.5; }

    return result;
  }
}

// ============================================================================
// 7. TRAFFIC & AI RACING OPPONENTS
// ============================================================================

class TrafficAIController {
  constructor(scene, carGroup, waypoints, isRival = false) {
    this.scene = scene;
    this.mesh = carGroup;
    this.waypoints = waypoints;
    this.currentWpIndex = 0;
    this.isRival = isRival;
    this.speed = (isRival ? 145 : 25) + Math.random() * 20; // km/h
    this.speedMs = this.speed / 3.6;
    this.scene.add(this.mesh);

    if (waypoints.length > 0) {
      this.mesh.position.copy(waypoints[0]);
    }
  }

  update(dt) {
    if (!this.waypoints || this.waypoints.length === 0) return;
    if (this.isRival && window.game && window.game.isCountdown) return;

    const targetWp = this.waypoints[this.currentWpIndex];
    const dx = targetWp.x - this.mesh.position.x;
    const dz = targetWp.z - this.mesh.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 20) {
      this.currentWpIndex = (this.currentWpIndex + 1) % this.waypoints.length;
      if (this.currentWpIndex === 0) {
        this.lap = (this.lap || 1) + 1;
      }
    }

    const targetAngle = Math.atan2(dx, dz);
    let diff = targetAngle - this.mesh.rotation.y;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    this.mesh.rotation.y += diff * dt * 3.8;

    // Forward drive
    const forwardX = Math.sin(this.mesh.rotation.y);
    const forwardZ = Math.cos(this.mesh.rotation.y);
    this.mesh.position.x += forwardX * this.speedMs * dt;
    this.mesh.position.z += forwardZ * this.speedMs * dt;

    // Rotate tires
    const wheels = this.mesh.userData.wheels;
    if (wheels) {
      wheels.forEach(wh => wh.userData.tireMesh.rotation.x += this.speedMs * dt * 2.8);
    }
  }

  destroy() {
    this.scene.remove(this.mesh);
  }
}

class DriveLabGame {
  constructor() {
    this.state = SaveManager.load();
    this.canvas = document.getElementById('webgl-canvas');
    this.weatherCanvas = document.getElementById('weather-canvas');
    this.radarCanvas = document.getElementById('radar-canvas');

    // Three.js Core
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.clock = new THREE.Clock();

    // Lighting & Environment
    this.dirLight = null;
    this.hemiLight = null;
    this.weatherMode = 'clear'; // 'clear' | 'sunset' | 'night' | 'rain'

    // Systems
    this.worldManager = null;
    this.playerVehicle = null;
    this.trafficVehicles = [];
    this.rivalVehicles = [];
    this.activeMission = null;

    // Camera Modes: 'chase' | 'cockpit' | 'hood'
    this.cameraMode = 'chase';
    this.camTargetOffset = new THREE.Vector3(0, 3.2, -7.5);
    this.camLookOffset = new THREE.Vector3(0, 1.2, 8.0);

    // Game Mode State: 'title' | 'roam' | 'mission' | 'garage' | 'paused'
    this.currentMode = 'title';
    this.raceTimer = 0;
    this.raceLap = 1;
    this.currentCheckpoint = 0;
    this.isCountdown = false;
    this.nearMissCount = 0;
    this.cameraTrauma = 0;
    this.crashBannerTimeout = null;
    this.stuntTimeout = null;

    // Turntable (Garage 3D view)
    this.turntableMesh = null;
    this.turntableRot = 0;
    this.isDraggingTurntable = false;
    this.lastMouseX = 0;

    // Input Controller
    this.keys = {};
    this.touchPedalGas = false;
    this.touchPedalBrake = false;
    this.touchSteerLeft = false;
    this.touchSteerRight = false;
    this.touchHandbrake = false;
    this.touchNitro = false;

    this.initRenderer();
    this.setupLighting();
    this.bindEvents();
    this.initUI();
    this.initWeatherFX();

    // Render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a101d, 0.0022);

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.2, 1200);
    this.camera.position.set(0, 8, -14);

    // Initialize World Manager & Crash Particle System
    this.worldManager = new OpenWorldManager(this.scene);
    this.crashParticleManager = new CrashParticleManager(this.scene);
    this.worldManager.loadWorld(this.state.unlockedWorlds[0] || 'metrovale');

    // Spawn Initial Player Vehicle
    this.spawnPlayerVehicle(this.state.currentCarId);
  }

  setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0x8bc34a, 0x0d1b2a, 0.7);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    this.dirLight.position.set(120, 220, 100);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 450;
    const d = 140;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0005;
    this.scene.add(this.dirLight);
  }

  setWeather(type) {
    this.weatherMode = type;
    if (type === 'clear') {
      this.scene.background = new THREE.Color(0x0d1829);
      this.scene.fog.color.setHex(0x0d1829);
      this.hemiLight.color.setHex(0x8bc34a);
      this.hemiLight.groundColor.setHex(0x0d1b2a);
      this.dirLight.color.setHex(0xfffaed);
      this.dirLight.intensity = 1.4;
    } else if (type === 'sunset') {
      this.scene.background = new THREE.Color(0x2d122b);
      this.scene.fog.color.setHex(0x2d122b);
      this.hemiLight.color.setHex(0xf97316);
      this.hemiLight.groundColor.setHex(0x1e1022);
      this.dirLight.color.setHex(0xfb923c);
      this.dirLight.intensity = 1.1;
    } else if (type === 'night') {
      this.scene.background = new THREE.Color(0x04060c);
      this.scene.fog.color.setHex(0x04060c);
      this.hemiLight.color.setHex(0x1e293b);
      this.hemiLight.groundColor.setHex(0x020408);
      this.dirLight.color.setHex(0x38bdf8);
      this.dirLight.intensity = 0.45;
    } else if (type === 'rain') {
      this.scene.background = new THREE.Color(0x090e18);
      this.scene.fog.color.setHex(0x090e18);
      this.hemiLight.color.setHex(0x334155);
      this.hemiLight.groundColor.setHex(0x0f172a);
      this.dirLight.color.setHex(0x94a3b8);
      this.dirLight.intensity = 0.6;
    }
  }

  spawnPlayerVehicle(carId) {
    if (this.playerVehicle && this.playerVehicle.mesh) {
      this.scene.remove(this.playerVehicle.mesh);
    }
    const carDef = CAR_DATABASE.find(c => c.id === carId) || CAR_DATABASE[0];
    const paint = this.state.carPaints[carId] || carDef.color;
    const upgrades = this.state.upgrades[carId] || {};

    const carMesh = VehicleMeshFactory.createCarMesh(carDef, paint, 'chrome', 'stock');
    this.scene.add(carMesh);

    this.playerVehicle = new VehicleController(carMesh, carDef, upgrades);
    const spawnP = this.getSpawnPointForCurrentWorld();
    this.playerVehicle.resetAt(spawnP.x, spawnP.y || 0, spawnP.z, spawnP.rotY || 0);
  }

  spawnTraffic(count = 6) {
    // Clear existing
    this.trafficVehicles.forEach(t => t.destroy());
    this.trafficVehicles = [];

    const waypoints = this.worldManager.trafficWaypoints;
    if (waypoints.length === 0) return;

    for (let i = 0; i < count; i++) {
      const randomCar = CAR_DATABASE[Math.floor(Math.random() * 4)];
      const randomPaint = PAINT_PALETTE[Math.floor(Math.random() * PAINT_PALETTE.length)];
      const mesh = VehicleMeshFactory.createCarMesh(randomCar, randomPaint, 'chrome', 'none');

      // Random starting waypoint
      const startIndex = Math.floor(Math.random() * waypoints.length);
      const slicedWaypoints = [...waypoints.slice(startIndex), ...waypoints.slice(0, startIndex)];

      const traffic = new TrafficAIController(this.scene, mesh, slicedWaypoints, false);
      this.trafficVehicles.push(traffic);
    }
  }

  spawnRivals(count = 3) {
    this.rivalVehicles.forEach(r => r.destroy());
    this.rivalVehicles = [];

    const waypoints = this.worldManager.raceWaypoints;
    if (waypoints.length === 0) return;

    for (let i = 0; i < count; i++) {
      const rivalCar = CAR_DATABASE[Math.min(i + 2, CAR_DATABASE.length - 1)];
      const mesh = VehicleMeshFactory.createCarMesh(rivalCar, rivalCar.color, 'gold', 'gt');
      const rivalAI = new TrafficAIController(this.scene, mesh, waypoints, true);
      // Stagger start on starting grid behind/alongside player
      const laneOffset = (i % 2 === 0) ? -5.5 : 5.5;
      const gridX = -26 - i * 14;
      rivalAI.mesh.position.set(gridX, 0, -260 + laneOffset);
      rivalAI.mesh.rotation.y = Math.PI / 2;
      this.rivalVehicles.push(rivalAI);
    }
  }

  // --- CONTROLS & INPUT SYSTEM ---
  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      if (this.weatherCanvas) {
        this.weatherCanvas.width = window.innerWidth;
        this.weatherCanvas.height = window.innerHeight;
      }
    });

    // Keyboard Continuous Inputs
    window.addEventListener('keydown', (e) => {
      sound.resume();
      this.keys[e.code] = true;

      if (e.code === 'KeyC') this.cycleCamera();
      if (e.code === 'KeyR') this.resetCar();
      if (e.code === 'KeyE') this.triggerNearbyEvent();
      if (e.code === 'Escape') this.togglePause();
      if (e.code === 'KeyM') this.showWorldMap();
      if (e.code === 'KeyG') this.showGarage();
      if (e.code === 'KeyH') this.toggleBottomDock();

      // Start CTA on Title Screen
      if ((e.code === 'Enter' || e.code === 'Space') && this.currentMode === 'title') {
        this.startFreeRoam();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Touch Controls
    const bindTouch = (id, onDown, onUp) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('pointerdown', (e) => { e.preventDefault(); sound.resume(); onDown(); });
      el.addEventListener('pointerup', (e) => { e.preventDefault(); onUp(); });
      el.addEventListener('pointercancel', (e) => { e.preventDefault(); onUp(); });
    };

    bindTouch('btn-touch-gas', () => { this.touchPedalGas = true; }, () => { this.touchPedalGas = false; });
    bindTouch('btn-touch-brake', () => { this.touchPedalBrake = true; }, () => { this.touchPedalBrake = false; });
    bindTouch('btn-touch-left', () => { this.touchSteerLeft = true; }, () => { this.touchSteerLeft = false; });
    bindTouch('btn-touch-right', () => { this.touchSteerRight = true; }, () => { this.touchSteerRight = false; });
    bindTouch('btn-touch-handbrake', () => { this.touchHandbrake = true; }, () => { this.touchHandbrake = false; });
    bindTouch('btn-touch-nitro', () => { this.touchNitro = true; }, () => { this.touchNitro = false; });

    document.getElementById('btn-touch-reset')?.addEventListener('click', () => this.resetCar());
    document.getElementById('btn-touch-cam')?.addEventListener('click', () => this.cycleCamera());
    document.getElementById('btn-touch-pause')?.addEventListener('click', () => this.togglePause());

    // Garage Turntable Mouse/Touch Drag
    window.addEventListener('pointerdown', (e) => {
      if (this.currentMode === 'garage') {
        this.isDraggingTurntable = true;
        this.lastMouseX = e.clientX;
      }
    });
    window.addEventListener('pointermove', (e) => {
      if (this.isDraggingTurntable && this.turntableMesh) {
        const deltaX = e.clientX - this.lastMouseX;
        this.turntableRot += deltaX * 0.012;
        this.turntableMesh.rotation.y = this.turntableRot;
        this.lastMouseX = e.clientX;
      }
    });
    window.addEventListener('pointerup', () => { this.isDraggingTurntable = false; });
  }

  cycleCamera() {
    sound.playUIClick();
    if (this.cameraMode === 'chase') {
      this.cameraMode = 'cockpit';
      document.getElementById('btn-cam-switch').innerText = 'CAM: INTERIOR';
    } else if (this.cameraMode === 'cockpit') {
      this.cameraMode = 'hood';
      document.getElementById('btn-cam-switch').innerText = 'CAM: HOOD';
    } else {
      this.cameraMode = 'chase';
      document.getElementById('btn-cam-switch').innerText = 'CAM: CHASE';
    }
  }

  resetCar() {
    sound.playUIClick();
    if (this.playerVehicle) {
      this.playerVehicle.resetAt(0, 0, 0, 0);
      this.showToast('VEHICLE RECOVERED', 'Vehicle reset safely on road.');
    }
  }

  // --- UI INITIALIZATION & EVENT HANDLERS ---
  initUI() {
    // Title Screen CTA
    document.getElementById('btn-title-play').addEventListener('click', () => {
      sound.resume();
      this.startFreeRoam();
    });
    document.getElementById('btn-title-garage').addEventListener('click', () => this.showGarage());
    document.getElementById('btn-title-worlds').addEventListener('click', () => this.showWorldMap());
    document.getElementById('btn-title-campaign').addEventListener('click', () => this.showCampaignLog());
    document.getElementById('btn-title-settings').addEventListener('click', () => this.showSettings());

    // Top In-Game Bar
    document.getElementById('btn-quick-map').addEventListener('click', () => this.showWorldMap());
    document.getElementById('btn-quick-garage').addEventListener('click', () => this.showGarage());
    document.getElementById('btn-quick-audio').addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      document.getElementById('icon-sound-on').classList.toggle('hidden', isMuted);
      document.getElementById('icon-sound-off').classList.toggle('hidden', !isMuted);
    });
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());

    // Quick Drive Buttons
    document.getElementById('btn-cam-switch').addEventListener('click', () => this.cycleCamera());
    document.getElementById('btn-car-reset').addEventListener('click', () => this.resetCar());

    // Bottom Dock Controls
    document.getElementById('btn-toggle-dock').addEventListener('click', () => this.toggleBottomDock());
    document.getElementById('btn-weather-clear').addEventListener('click', () => this.setWeather('clear'));
    document.getElementById('btn-weather-rain').addEventListener('click', () => this.setWeather('rain'));
    document.getElementById('btn-weather-night').addEventListener('click', () => this.setWeather('night'));
    document.getElementById('btn-weather-sunset').addEventListener('click', () => this.setWeather('sunset'));

    document.getElementById('btn-traffic-toggle').addEventListener('click', (e) => {
      if (this.trafficVehicles.length > 0) {
        this.trafficVehicles.forEach(t => t.destroy());
        this.trafficVehicles = [];
        e.target.innerText = 'CIVILIAN OFF';
        e.target.classList.remove('active');
      } else {
        this.spawnTraffic(6);
        e.target.innerText = 'CIVILIAN ON';
        e.target.classList.add('active');
      }
    });

    document.getElementById('btn-music-toggle').addEventListener('click', (e) => {
      const playing = sound.toggleMusic();
      e.target.innerText = playing ? 'BGM: ACTIVE' : 'BGM: MUTED';
      e.target.classList.toggle('active', playing);
    });

    // Pause Menu
    document.getElementById('btn-pause-resume').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-pause-restart').addEventListener('click', () => {
      this.togglePause();
      if (this.activeMission) this.startMission(this.activeMission);
      else this.resetCar();
    });
    document.getElementById('btn-pause-garage').addEventListener('click', () => {
      this.togglePause();
      this.showGarage();
    });
    document.getElementById('btn-pause-map').addEventListener('click', () => {
      this.togglePause();
      this.showWorldMap();
    });
    document.getElementById('btn-pause-settings').addEventListener('click', () => this.showSettings());
    document.getElementById('btn-pause-title').addEventListener('click', () => {
      this.togglePause();
      this.showTitleScreen();
    });

    // Dialogue Modal
    document.getElementById('btn-dialogue-skip').addEventListener('click', () => {
      document.getElementById('modal-dialogue').classList.add('hidden');
    });
    document.getElementById('btn-dialogue-accept').addEventListener('click', () => {
      document.getElementById('modal-dialogue').classList.add('hidden');
      if (this.pendingMission) this.startMission(this.pendingMission);
    });

    // Results Modal
    document.getElementById('btn-results-retry').addEventListener('click', () => {
      document.getElementById('modal-results').classList.add('hidden');
      if (this.activeMission) this.startMission(this.activeMission);
    });
    document.getElementById('btn-results-continue').addEventListener('click', () => {
      document.getElementById('modal-results').classList.add('hidden');
      this.activeMission = null;
      if (this.previousRoamWorld && this.worldManager.currentWorldId !== this.previousRoamWorld) {
        this.worldManager.loadWorld(this.previousRoamWorld);
        this.spawnPlayerVehicle(this.state.currentCarId);
        const hudWorld = document.getElementById('hud-world-tag');
        if (hudWorld) hudWorld.innerText = this.previousRoamWorld.toUpperCase();
      }
      this.startFreeRoam();
    });

    // Interaction prompt button
    document.getElementById('btn-interact-action')?.addEventListener('click', () => {
      this.triggerNearbyEvent();
    });

    // World Map Travel Buttons
    document.querySelectorAll('[data-travel]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const worldId = e.currentTarget.getAttribute('data-travel');
        this.travelToWorld(worldId);
      });
    });
    document.getElementById('btn-worlds-back').addEventListener('click', () => this.startFreeRoam());

    // Garage Back Button
    document.getElementById('btn-garage-back').addEventListener('click', () => this.startFreeRoam());

    // Settings
    document.getElementById('btn-settings-close').addEventListener('click', () => {
      document.getElementById('screen-settings').classList.add('hidden');
    });
    document.getElementById('btn-settings-save').addEventListener('click', () => {
      document.getElementById('screen-settings').classList.add('hidden');
    });
    document.getElementById('btn-reset-save').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all game progress?')) {
        SaveManager.reset();
      }
    });

    // Campaign Back
    document.getElementById('btn-campaign-back').addEventListener('click', () => {
      document.getElementById('screen-campaign').classList.add('hidden');
    });

    // Populate Garage & Mission lists
    this.renderGarageRoster();
    this.renderCampaignList();
    this.updateHUDStats();
  }

  // --- WEATHER OVERLAY (CANVAS RAIN FX) ---
  initWeatherFX() {
    this.weatherCanvas.width = window.innerWidth;
    this.weatherCanvas.height = window.innerHeight;
    const ctx = this.weatherCanvas.getContext('2d');
    const drops = [];
    for (let i = 0; i < 220; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: 12 + Math.random() * 18,
        speed: 18 + Math.random() * 22
      });
    }

    const drawRain = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (this.weatherMode === 'rain') {
        ctx.strokeStyle = 'rgba(180, 220, 255, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - 2, d.y + d.length);
          d.y += d.speed;
          d.x -= 2;
          if (d.y > window.innerHeight) {
            d.y = -20;
            d.x = Math.random() * window.innerWidth;
          }
        }
        ctx.stroke();
      }
      requestAnimationFrame(drawRain);
    };
    drawRain();
  }

  // --- GAME STATES & TRANSITIONS ---
  startFreeRoam() {
    this.currentMode = 'roam';
    this.hideAllScreens();

    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('gauge-cluster').classList.remove('hidden');
    document.getElementById('radar-container').classList.remove('hidden');
    document.getElementById('bottom-dock').classList.remove('hidden');

    // Auto-detect mobile touch
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isTouch) {
      document.getElementById('mobile-controls').classList.remove('hidden');
    }

    if (this.trafficVehicles.length === 0) {
      this.spawnTraffic(6);
    }
  }

  showTitleScreen() {
    this.currentMode = 'title';
    this.hideAllScreens();
    document.getElementById('screen-title').classList.remove('hidden');
  }

  showGarage() {
    this.currentMode = 'garage';
    this.hideAllScreens();
    document.getElementById('screen-garage').classList.remove('hidden');

    // Position camera on car for 3D turntable preview
    this.camera.position.set(0, 2.2, 5.8);
    this.camera.lookAt(0, 0.8, 0);

    this.selectGarageCar(this.state.currentCarId);
  }

  showWorldMap() {
    this.hideAllScreens();
    document.getElementById('screen-worlds').classList.remove('hidden');

    // Unlock status
    const rep = this.state.rep;
    const hlCard = document.getElementById('card-world-highlands');
    const hlBtn = document.getElementById('btn-travel-highlands');
    const hlBadge = document.getElementById('badge-world-highlands');
    if (rep >= 3 || this.state.unlockedWorlds.includes('highlands')) {
      hlBadge.innerText = 'UNLOCKED';
      hlBadge.className = 'region-status-badge unlocked';
      hlBtn.removeAttribute('disabled');
    }

    const neonCard = document.getElementById('card-world-neon');
    const neonBtn = document.getElementById('btn-travel-neon');
    const neonBadge = document.getElementById('badge-world-neon');
    if (rep >= 5 || this.state.unlockedWorlds.includes('neon')) {
      neonBadge.innerText = 'UNLOCKED';
      neonBadge.className = 'region-status-badge unlocked';
      neonBtn.removeAttribute('disabled');
    }
  }

  showCampaignLog() {
    this.hideAllScreens();
    document.getElementById('screen-campaign').classList.remove('hidden');
    this.renderCampaignList();
  }

  showSettings() {
    document.getElementById('screen-settings').classList.remove('hidden');
  }

  togglePause() {
    if (this.currentMode === 'title' || this.currentMode === 'garage') return;
    const pauseEl = document.getElementById('screen-pause');
    if (this.currentMode === 'paused') {
      this.currentMode = this.activeMission ? 'mission' : 'roam';
      pauseEl.classList.add('hidden');
    } else {
      this.currentMode = 'paused';
      pauseEl.classList.remove('hidden');
    }
  }

  toggleBottomDock() {
    const dock = document.getElementById('bottom-dock');
    dock.classList.toggle('collapsed');
    const isCollapsed = dock.classList.contains('collapsed');
    document.getElementById('dock-toggle-icon').innerText = isCollapsed ? '▴' : '▾';
  }

  hideAllScreens() {
    document.querySelectorAll('.screen-overlay').forEach(s => s.classList.add('hidden'));
    document.getElementById('top-bar').classList.add('hidden');
    document.getElementById('gauge-cluster').classList.add('hidden');
    document.getElementById('radar-container').classList.add('hidden');
    document.getElementById('bottom-dock').classList.add('hidden');
    document.getElementById('mission-hud').classList.add('hidden');
  }

  travelToWorld(worldId) {
    sound.playUIClick();
    if (!this.state.unlockedWorlds.includes(worldId)) {
      this.state.unlockedWorlds.push(worldId);
      SaveManager.save(this.state);
    }
    if (this.crashParticleManager) this.crashParticleManager.clear();
    this.worldManager.loadWorld(worldId);
    this.spawnPlayerVehicle(this.state.currentCarId);
    document.getElementById('hud-world-tag').innerText = worldId.toUpperCase();
    this.startFreeRoam();
    this.showToast('ENTERED REGION', `Welcome to ${worldId.toUpperCase()}`);
  }

  // --- GARAGE ROSTER, CUSTOMIZATION & TUNING ---
  renderGarageRoster() {
    const list = document.getElementById('car-roster-list');
    if (!list) return;
    list.innerHTML = '';

    CAR_DATABASE.forEach(car => {
      const isOwned = this.state.ownedCarIds.includes(car.id);
      const isEquipped = this.state.currentCarId === car.id;

      const item = document.createElement('div');
      item.className = `car-card-item ${isEquipped ? 'selected' : ''}`;
      item.dataset.carId = car.id;

      let badgeHtml = '';
      if (isEquipped) badgeHtml = '<span class="car-card-badge equipped">EQUIPPED</span>';
      else if (isOwned) badgeHtml = '<span class="car-card-badge owned">OWNED</span>';
      else badgeHtml = `<span class="car-card-badge locked">${car.price.toLocaleString()} CR</span>`;

      item.innerHTML = `
        <div>
          <div class="car-card-name">${car.name}</div>
          <div class="car-card-tier">${car.tier}</div>
        </div>
        ${badgeHtml}
      `;

      item.addEventListener('click', () => this.selectGarageCar(car.id));
      list.appendChild(item);
    });

    // Populate paint palette swatches
    const palette = document.getElementById('paint-palette');
    if (palette && palette.children.length === 0) {
      PAINT_PALETTE.forEach(color => {
        const sw = document.createElement('div');
        sw.className = 'color-swatch';
        sw.style.backgroundColor = color;
        sw.addEventListener('click', () => this.setGaragePaint(color));
        palette.appendChild(sw);
      });
    }

    // Tuning tabs
    document.getElementById('tab-btn-performance').addEventListener('click', () => {
      document.getElementById('tab-btn-performance').classList.add('active');
      document.getElementById('tab-btn-visuals').classList.remove('active');
      document.getElementById('tuning-tab-performance').classList.remove('hidden');
      document.getElementById('tuning-tab-visuals').classList.add('hidden');
    });
    document.getElementById('tab-btn-visuals').addEventListener('click', () => {
      document.getElementById('tab-btn-visuals').classList.add('active');
      document.getElementById('tab-btn-performance').classList.remove('active');
      document.getElementById('tuning-tab-visuals').classList.remove('hidden');
      document.getElementById('tuning-tab-performance').classList.add('hidden');
    });
  }

  selectGarageCar(carId) {
    this.selectedGarageCarId = carId;
    const carDef = CAR_DATABASE.find(c => c.id === carId);
    if (!carDef) return;

    // Highlight roster item
    document.querySelectorAll('.car-card-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.carId === carId);
    });

    // Update 3D Preview Turntable
    if (this.turntableMesh) this.scene.remove(this.turntableMesh);
    const paint = this.state.carPaints[carId] || carDef.color;
    this.turntableMesh = VehicleMeshFactory.createCarMesh(carDef, paint, 'chrome', 'stock');
    this.turntableMesh.position.set(0, 0, 0);
    this.scene.add(this.turntableMesh);

    // Update specs display
    document.getElementById('garage-car-name').innerText = carDef.name;
    document.getElementById('garage-car-tier').innerText = carDef.tier;

    const upgrades = this.state.upgrades[carId] || { engine: 1, trans: 1, grip: 1, brakes: 1, nitro: 1 };

    const topSpeed = carDef.topSpeed + (upgrades.engine - 1) * 15;
    document.getElementById('spec-bar-speed').style.width = `${Math.min(100, (topSpeed / 380) * 100)}%`;
    document.getElementById('spec-val-speed').innerText = `${topSpeed} KM/H`;

    const accel = Math.max(1.0, carDef.accelTime - (upgrades.trans - 1) * 0.25).toFixed(1);
    document.getElementById('spec-bar-accel').style.width = `${Math.min(100, Math.max(20, (4.2 - accel) * 32))}%`;
    document.getElementById('spec-val-accel').innerText = `${accel}s`;

    const grip = Math.round((carDef.handling + (upgrades.grip - 1) * 0.05) * 100);
    document.getElementById('spec-bar-handling').style.width = `${Math.min(100, grip)}%`;
    document.getElementById('spec-val-handling').innerText = `${grip}%`;

    const brake = Math.round((carDef.braking + (upgrades.brakes - 1) * 0.05) * 100);
    document.getElementById('spec-bar-braking').style.width = `${Math.min(100, brake)}%`;
    document.getElementById('spec-val-braking').innerText = `${brake}%`;

    // Upgrade buttons & levels
    const bindUpBtn = (btnId, lvlId, key, baseCost) => {
      const lvl = upgrades[key] || 1;
      document.getElementById(lvlId).innerText = `LVL ${lvl}/5`;
      const btn = document.getElementById(btnId);
      if (lvl >= 5) {
        btn.innerText = 'MAX LEVEL';
        btn.setAttribute('disabled', 'true');
      } else {
        const cost = baseCost * lvl;
        btn.innerText = `UPGRADE (${cost} CR)`;
        btn.removeAttribute('disabled');
        btn.onclick = () => this.purchaseUpgrade(carId, key, cost);
      }
    };

    bindUpBtn('btn-up-engine', 'up-lvl-engine', 'engine', 400);
    bindUpBtn('btn-up-trans', 'up-lvl-trans', 'trans', 400);
    bindUpBtn('btn-up-grip', 'up-lvl-grip', 'grip', 350);
    bindUpBtn('btn-up-brakes', 'up-lvl-brakes', 'brakes', 300);
    bindUpBtn('btn-up-nitro', 'up-lvl-nitro', 'nitro', 450);

    // Equip / Buy CTA
    const actionBtn = document.getElementById('btn-garage-select-car');
    const isOwned = this.state.ownedCarIds.includes(carId);
    const isEquipped = this.state.currentCarId === carId;

    if (isEquipped) {
      actionBtn.innerText = 'EQUIPPED';
      actionBtn.setAttribute('disabled', 'true');
    } else if (isOwned) {
      actionBtn.innerText = 'EQUIP VEHICLE';
      actionBtn.removeAttribute('disabled');
      actionBtn.onclick = () => this.equipVehicle(carId);
    } else {
      actionBtn.innerText = `PURCHASE VEHICLE (${carDef.price.toLocaleString()} CR)`;
      actionBtn.removeAttribute('disabled');
      actionBtn.onclick = () => this.purchaseVehicle(carId, carDef.price);
    }

    document.getElementById('garage-credits').innerText = `${this.state.credits.toLocaleString()} CR`;
  }

  equipVehicle(carId) {
    sound.playUIClick();
    this.state.currentCarId = carId;
    SaveManager.save(this.state);
    this.spawnPlayerVehicle(carId);
    this.selectGarageCar(carId);
    this.showToast('VEHICLE EQUIPPED', 'Your ride has been tuned and readied.');
  }

  purchaseVehicle(carId, price) {
    sound.playUIClick();
    if (this.state.credits < price) {
      this.showToast('INSUFFICIENT CREDITS', 'Win more races to earn enough credits.');
      return;
    }
    this.state.credits -= price;
    this.state.ownedCarIds.push(carId);
    this.state.currentCarId = carId;
    SaveManager.save(this.state);
    this.spawnPlayerVehicle(carId);
    this.renderGarageRoster();
    this.selectGarageCar(carId);
    this.updateHUDStats();
    this.showToast('PURCHASE SUCCESSFUL', 'New car added to your permanent garage!');
  }

  purchaseUpgrade(carId, type, cost) {
    sound.playUIClick();
    if (this.state.credits < cost) {
      this.showToast('INSUFFICIENT CREDITS', 'Not enough credits for this upgrade.');
      return;
    }
    if (!this.state.upgrades[carId]) {
      this.state.upgrades[carId] = { engine: 1, trans: 1, grip: 1, brakes: 1, nitro: 1 };
    }
    this.state.credits -= cost;
    this.state.upgrades[carId][type] = (this.state.upgrades[carId][type] || 1) + 1;
    SaveManager.save(this.state);

    if (this.state.currentCarId === carId) {
      this.spawnPlayerVehicle(carId);
    }
    this.selectGarageCar(carId);
    this.updateHUDStats();
    this.showToast('UPGRADE INSTALLED', 'Performance parameters increased!');
  }

  setGaragePaint(color) {
    sound.playUIClick();
    if (!this.selectedGarageCarId) return;
    this.state.carPaints[this.selectedGarageCarId] = color;
    SaveManager.save(this.state);

    if (this.turntableMesh && this.turntableMesh.userData.paintMaterial) {
      this.turntableMesh.userData.paintMaterial.color.set(color);
    }
    if (this.state.currentCarId === this.selectedGarageCarId && this.playerVehicle) {
      this.playerVehicle.mesh.userData.paintMaterial.color.set(color);
    }
  }

  // --- CAMPAIGN & RACE LOGIC ---
  renderCampaignList() {
    const container = document.getElementById('campaign-missions-container');
    if (!container) return;
    container.innerHTML = '';

    CAMPAIGN_MISSIONS.forEach(m => {
      const isCompleted = this.state.completedMissions.includes(m.id);
      const card = document.createElement('div');
      card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `
        <div>
          <div class="mission-card-top">
            <span class="mission-chapter-badge">${m.chapter}</span>
            <span class="mission-type-badge">${m.type}</span>
          </div>
          <h4 class="mission-card-title">${m.title}</h4>
          <p class="mission-card-desc">${m.desc}</p>
        </div>
        <div class="mission-card-footer">
          <span class="mission-reward">+${m.rewardCredits.toLocaleString()} CR · +${m.rewardRep} REP</span>
          <button class="btn-primary-mini" data-start-mission="${m.id}">${isCompleted ? 'REPLAY' : 'START'}</button>
        </div>
      `;
      card.querySelector('[data-start-mission]').addEventListener('click', () => {
        document.getElementById('screen-campaign').classList.add('hidden');
        this.openMissionBriefing(m);
      });
      container.appendChild(card);
    });
  }

  openMissionBriefing(mission) {
    this.pendingMission = mission;
    document.getElementById('dialogue-character-name').innerText = mission.character;
    document.getElementById('dialogue-chapter-tag').innerText = mission.chapter;
    document.getElementById('dialogue-heading').innerText = mission.title;
    document.getElementById('dialogue-text').innerText = `"${mission.dialogue}"`;
    document.getElementById('modal-dialogue').classList.remove('hidden');
  }

  startMission(mission) {
    this.activeMission = mission;
    this.currentMode = 'mission';
    this.raceTimer = 0;
    this.raceLap = 1;
    this.currentCheckpoint = 0;
    this.nearMissCount = 0;

    // Track previous roam world if entering from city or mountains
    if (this.worldManager.currentWorldId !== 'raceway') {
      this.previousRoamWorld = this.worldManager.currentWorldId;
    }

    // Circuit & sprint races use the dedicated open raceway ground.
    // Stunt jump & hillclimb use their dedicated mountain passes.
    const targetWorld = mission.world || 'raceway';

    if (this.worldManager.currentWorldId !== targetWorld) {
      if (this.crashParticleManager) this.crashParticleManager.clear();
      this.worldManager.loadWorld(targetWorld);
      this.spawnPlayerVehicle(this.state.currentCarId);
    }

    // Grid start position
    const startP = mission.startPos || (targetWorld === 'raceway' ? { x: -14, z: -260, rotY: Math.PI / 2 } : { x: 0, z: 0, rotY: 0 });
    this.playerVehicle.resetAt(startP.x, startP.y || 0, startP.z, startP.rotY || 0);

    // Spawn AI rivals on starting grid
    if (mission.type === 'CIRCUIT RACE' || mission.type === 'RIVAL CHAMPIONSHIP' || mission.type === 'SPRINT RACE' || mission.type === 'DRAG RACE') {
      this.spawnRivals(mission.opponentCount || 3);
    } else {
      this.rivalVehicles.forEach(r => r.destroy());
      this.rivalVehicles = [];
    }

    // Update HUD World Tag
    const hudWorld = document.getElementById('hud-world-tag');
    if (hudWorld) hudWorld.innerText = targetWorld.toUpperCase();

    // HUD Setup
    this.hideAllScreens();
    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('gauge-cluster').classList.remove('hidden');
    document.getElementById('radar-container').classList.remove('hidden');
    document.getElementById('mission-hud').classList.remove('hidden');

    document.getElementById('mission-title').innerText = mission.title;
    document.getElementById('mission-objective-text').innerText = mission.desc;

    // Position beacon at checkpoint 0 immediately
    if (this.worldManager.updateBeacon) {
      this.worldManager.updateBeacon(0, 0);
    }

    // 3... 2... 1... GO Countdown Sequence
    this.startCountdown();
  }

  startCountdown() {
    this.isCountdown = true;
    const cdModal = document.getElementById('countdown-overlay');
    const cdNum = document.getElementById('countdown-number');
    const cdSub = document.getElementById('countdown-sub');

    cdModal.classList.remove('hidden');
    let count = 3;
    cdNum.innerText = count;
    cdSub.innerText = 'REV ENGINES';
    sound.playCountdownBeep(false);

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        cdNum.innerText = count;
        sound.playCountdownBeep(false);
      } else if (count === 0) {
        cdNum.innerText = 'GO!';
        cdSub.innerText = 'PEDAL TO THE METAL';
        sound.playCountdownBeep(true);
        this.isCountdown = false;
      } else {
        clearInterval(timer);
        cdModal.classList.add('hidden');
      }
    }, 900);
  }

  finishMission(success) {
    this.currentMode = 'results';
    const m = this.activeMission;
    const modal = document.getElementById('modal-results');
    const banner = document.getElementById('results-banner-type');
    const headline = document.getElementById('results-headline');
    const sub = document.getElementById('results-subtitle');

    if (success) {
      sound.playVictoryFanfare();
      banner.className = 'results-type-banner victory';
      banner.innerText = 'VICTORY ACHIEVED';
      headline.innerText = '1ST PLACE VICTORY!';
      sub.innerText = `You dominated the ${m.title}.`;

      // Payout rewards
      this.state.credits += m.rewardCredits;
      this.state.repPoints += m.rewardRep;
      if (this.state.repPoints >= this.state.rep * 300) {
        this.state.rep++;
        this.showToast('REPUTATION RANK UP!', `Driver Rank reached Level ${this.state.rep}`);
      }

      if (!this.state.completedMissions.includes(m.id)) {
        this.state.completedMissions.push(m.id);
      }

      document.getElementById('res-val-credits').innerText = `+${m.rewardCredits.toLocaleString()} CR`;
      document.getElementById('res-val-rep').innerText = `+${m.rewardRep} REP`;

      SaveManager.save(this.state);
      this.updateHUDStats();
    } else {
      banner.className = 'results-type-banner defeat';
      banner.innerText = 'EVENT FAILED';
      headline.innerText = 'DEFEAT';
      sub.innerText = 'You did not meet the event requirements. Tune your car and try again.';
      document.getElementById('res-val-credits').innerText = '0 CR';
      document.getElementById('res-val-rep').innerText = '0 REP';
    }

    const mins = Math.floor(this.raceTimer / 60);
    const secs = (this.raceTimer % 60).toFixed(2);
    document.getElementById('res-val-time').innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    document.getElementById('res-val-pos').innerText = success ? '1ST' : 'DNF';
    document.getElementById('res-val-drift').innerText = `${this.playerVehicle.driftScore.toLocaleString()} PTS`;

    modal.classList.remove('hidden');
  }

  triggerNearbyEvent() {
    if (this.currentMode !== 'roam') return;
    const nextMission = CAMPAIGN_MISSIONS.find(m => !this.state.completedMissions.includes(m.id)) || CAMPAIGN_MISSIONS[0];
    this.openMissionBriefing(nextMission);
  }

  showToast(title, desc) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3500);
  }

  updateHUDStats() {
    document.getElementById('hud-credits').innerText = `${this.state.credits.toLocaleString()} CR`;
    document.getElementById('hud-rep').innerText = `LVL ${this.state.rep}`;
  }

  // --- 2D RADAR MINI-MAP RENDERER ---
  drawRadar() {
    if (!this.radarCanvas || !this.playerVehicle) return;
    const ctx = this.radarCanvas.getContext('2d');
    const w = this.radarCanvas.width;
    const h = this.radarCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = 0.20; // Radar zoom factor

    ctx.clearRect(0, 0, w, h);

    // Save and rotate context with player heading
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-this.playerVehicle.yaw);

    // 1. Draw Race Track Circuit Lane outline on radar!
    if (this.worldManager.raceWaypoints && this.worldManager.raceWaypoints.length > 0) {
      const wps = this.worldManager.raceWaypoints;
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.beginPath();
      for (let i = 0; i < wps.length; i++) {
        const rx = (wps[i].x - this.playerVehicle.position.x) * scale;
        const rz = (wps[i].z - this.playerVehicle.position.z) * scale;
        if (i === 0) ctx.moveTo(rx, rz);
        else ctx.lineTo(rx, rz);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw all waypoints as small dots
      wps.forEach((wp, idx) => {
        const wx = (wp.x - this.playerVehicle.position.x) * scale;
        const wz = (wp.z - this.playerVehicle.position.z) * scale;
        const isTarget = (this.currentMode === 'mission' && idx === this.currentCheckpoint);
        if (isTarget) {
          // Pulsing next checkpoint ring
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(wx, wz, 6.5 + Math.sin(Date.now() * 0.008) * 1.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(wx, wz, 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(wx, wz, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // 2. Draw Traffic dots (Yellow)
    ctx.fillStyle = '#facc15';
    this.trafficVehicles.forEach(t => {
      const rx = (t.mesh.position.x - this.playerVehicle.position.x) * scale;
      const rz = (t.mesh.position.z - this.playerVehicle.position.z) * scale;
      ctx.beginPath();
      ctx.arc(rx, rz, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Draw Rival Opponents (Red)
    ctx.fillStyle = '#ef4444';
    this.rivalVehicles.forEach(r => {
      const rx = (r.mesh.position.x - this.playerVehicle.position.x) * scale;
      const rz = (r.mesh.position.z - this.playerVehicle.position.z) * scale;
      ctx.beginPath();
      ctx.arc(rx, rz, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();

    // 4. Draw Player Indicator (Centered Arrow pointing UP)
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx - 6, cy + 6);
    ctx.lineTo(cx, cy + 3);
    ctx.lineTo(cx + 6, cy + 6);
    ctx.closePath();
    ctx.fill();
  }

  // --- FLOATING 3D NAVIGATION GUIDE ARROW ---
  initGuideArrow() {
    if (this.guideArrow) return;
    const arrowGroup = new THREE.Group();

    // Sleek aerodynamic chevron shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.9);
    shape.lineTo(0.55, -0.6);
    shape.lineTo(0.2, -0.3);
    shape.lineTo(0.2, -0.75);
    shape.lineTo(-0.2, -0.75);
    shape.lineTo(-0.2, -0.3);
    shape.lineTo(-0.55, -0.6);
    shape.closePath();

    const extrudeSettings = { depth: 0.2, bevelEnabled: false };
    const arrowGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    arrowGeo.rotateX(Math.PI / 2);
    arrowGeo.center();

    const arrowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
    arrowGroup.add(arrowMesh);

    // Outer wire glow
    const auraMesh = new THREE.Mesh(arrowGeo, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    }));
    auraMesh.scale.set(1.08, 1.08, 1.08);
    arrowGroup.add(auraMesh);

    this.scene.add(arrowGroup);
    this.guideArrow = arrowGroup;
    this.guideArrow.visible = false;
  }

  updateGuideArrow(dt) {
    if (!this.playerVehicle) return;
    if (!this.guideArrow) this.initGuideArrow();

    if (this.currentMode === 'mission' && this.worldManager.raceWaypoints.length > 0) {
      this.guideArrow.visible = true;
      const targetWp = this.worldManager.raceWaypoints[this.currentCheckpoint];
      if (targetWp) {
        this.guideArrow.position.set(
          this.playerVehicle.position.x,
          this.playerVehicle.position.y + 2.4 + Math.sin(Date.now() * 0.006) * 0.12,
          this.playerVehicle.position.z
        );
        const dx = targetWp.x - this.playerVehicle.position.x;
        const dz = targetWp.z - this.playerVehicle.position.z;
        const targetAngle = Math.atan2(dx, dz);

        // Smoothly swivel towards next waypoint
        let diff = targetAngle - this.guideArrow.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.guideArrow.rotation.y += diff * Math.min(dt * 12, 1.0);
      }
    } else {
      this.guideArrow.visible = false;
    }
  }

  calculateRacePosition() {
    if (!this.activeMission || this.rivalVehicles.length === 0) return 1;
    let rank = 1;
    const numWps = this.worldManager.raceWaypoints.length || 1;
    const playerProgress = (this.raceLap - 1) * numWps + this.currentCheckpoint;
    const targetWp = this.worldManager.raceWaypoints[this.currentCheckpoint];
    const playerDist = targetWp ? this.playerVehicle.position.distanceTo(targetWp) : 0;

    this.rivalVehicles.forEach(r => {
      const rivalProgress = ((r.lap || 1) - 1) * numWps + (r.currentWpIndex || 0);
      if (rivalProgress > playerProgress) {
        rank++;
      } else if (rivalProgress === playerProgress && targetWp) {
        if (r.mesh.position.distanceTo(targetWp) < playerDist) {
          rank++;
        }
      }
    });
    return rank;
  }

  // ============================================================================
  // 9. ANIMATION & 60FPS SIMULATION LOOP
  // ============================================================================
  animate() {
    requestAnimationFrame(this.animate);

    const rawDt = this.clock.getDelta();
    const dt = Math.min(rawDt, 0.05); // Frame clamp

    // 1. Garage Turntable State
    if (this.currentMode === 'garage') {
      if (this.turntableMesh && !this.isDraggingTurntable) {
        this.turntableRot += dt * 0.45;
        this.turntableMesh.rotation.y = this.turntableRot;
      }
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // 2. Title Screen Live World Pan
    if (this.currentMode === 'title') {
      this.camera.position.x = Math.sin(this.clock.getElapsedTime() * 0.2) * 50;
      this.camera.position.z = Math.cos(this.clock.getElapsedTime() * 0.2) * 50;
      this.camera.position.y = 18;
      this.camera.lookAt(0, 0, 0);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // 3. Driving Physics & Simulation (Roam / Mission)
    if (this.playerVehicle && this.currentMode !== 'paused') {
      // Gather Player Inputs
      let throttle = 0;
      let brake = 0;
      let steer = 0;

      if (!this.isCountdown) {
        if (this.keys['KeyW'] || this.keys['ArrowUp'] || this.touchPedalGas) throttle = 1.0;
        if (this.keys['KeyS'] || this.keys['ArrowDown'] || this.touchPedalBrake) brake = 1.0;
        if (this.keys['KeyA'] || this.keys['ArrowLeft'] || this.touchSteerLeft) steer -= 1.0;
        if (this.keys['KeyD'] || this.keys['ArrowRight'] || this.touchSteerRight) steer += 1.0;
      }

      const handbrake = this.keys['Space'] || this.touchHandbrake;
      const nitro = this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.touchNitro;

      this.playerVehicle.input.throttle = throttle;
      this.playerVehicle.input.brake = brake;
      this.playerVehicle.input.steer = steer;
      this.playerVehicle.input.handbrake = handbrake;
      this.playerVehicle.input.nitro = nitro;

      // Weather friction modifier (Rain reduces traction by 25%)
      const weatherFactor = this.weatherMode === 'rain' ? 0.75 : 1.0;
      this.playerVehicle.update(dt, weatherFactor);

      // Speed lines & Nitro visual effect
      const speedLines = document.getElementById('speed-lines');
      if (speedLines) {
        if (this.playerVehicle.isNitroActive || this.playerVehicle.speedKmh > 260) {
          speedLines.classList.add('active');
        } else {
          speedLines.classList.remove('active');
        }
      }

      // World Boundary & Building Collisions (Strict solid resolution: car CANNOT go inside buildings!)
      const colResult = this.worldManager.resolveVehicleCollision(
        this.playerVehicle.position,
        this.playerVehicle.velocity,
        this.playerVehicle.speedKmh,
        this.playerVehicle.radius || 1.35
      );
      this.playerVehicle.mesh.position.copy(this.playerVehicle.position);

      if (colResult.collided) {
        if (colResult.crashed) {
          // Speed >= 40 km/h: FULL CRASH ANIMATION!
          this.playerVehicle.onCrashImpact(colResult.normal, colResult.speedKmh);
          this.triggerCrashAnimation(colResult.contactPos, colResult.normal, colResult.speedKmh);

          if (this.currentMode === 'roam') {
            // IN FREE DRIVING: WHEN THE CAR CRASHES, RESTART AT ITS SPAWN POINT!
            this.handleRoamCrashRespawn(colResult.speedKmh);
          }
        } else {
          // Speed < 40 km/h: ONLY COLLIDE, DO NOT CRASH!
          this.playerVehicle.onGentleCollide(colResult.normal, colResult.speedKmh);
          this.triggerGentleBump(colResult.speedKmh);
        }
      }

      // Traffic Cars Simulation, Solid Collision & Near-Miss Detection
      this.trafficVehicles.forEach(t => {
        t.update(dt);
        const dist = this.playerVehicle.position.distanceTo(t.mesh.position);
        if (dist < 3.2) {
          const normal = this.playerVehicle.position.clone().sub(t.mesh.position).normalize();
          const overlap = 3.2 - dist;
          this.playerVehicle.position.addScaledVector(normal, overlap * 0.65);
          t.mesh.position.addScaledVector(normal, -overlap * 0.35);
          this.playerVehicle.mesh.position.copy(this.playerVehicle.position);

          const relSpeed = this.playerVehicle.speedKmh;
          if (relSpeed >= 40) {
            this.playerVehicle.onCrashImpact(normal, relSpeed);
            this.triggerCrashAnimation(this.playerVehicle.position, normal, relSpeed);
            if (this.currentMode === 'roam') {
              this.handleRoamCrashRespawn(relSpeed);
            }
          } else {
            this.playerVehicle.onGentleCollide(normal, relSpeed);
            this.triggerGentleBump(relSpeed);
          }
        } else if (dist < 6.5 && this.playerVehicle.speedKmh > 70) {
          this.nearMissCount++;
          if (this.activeMission && this.activeMission.type === 'TRAFFIC SLALOM') {
            document.getElementById('hud-checkpoint-val').innerText = `${this.nearMissCount} / ${this.activeMission.targetScore}`;
            if (this.nearMissCount >= this.activeMission.targetScore) {
              this.finishMission(true);
            }
          }
        }
      });

      // AI Rival Opponents Simulation & Solid Vehicle Collision
      this.rivalVehicles.forEach(r => {
        r.update(dt);
        const dist = this.playerVehicle.position.distanceTo(r.mesh.position);
        if (dist < 3.2) {
          const normal = this.playerVehicle.position.clone().sub(r.mesh.position).normalize();
          const overlap = 3.2 - dist;
          this.playerVehicle.position.addScaledVector(normal, overlap * 0.55);
          r.mesh.position.addScaledVector(normal, -overlap * 0.45);
          this.playerVehicle.mesh.position.copy(this.playerVehicle.position);

          const relSpeed = this.playerVehicle.speedKmh;
          if (relSpeed >= 40) {
            this.playerVehicle.onCrashImpact(normal, relSpeed);
            this.triggerCrashAnimation(this.playerVehicle.position, normal, relSpeed);
            if (this.currentMode === 'roam') {
              this.handleRoamCrashRespawn(relSpeed);
            }
          } else {
            this.playerVehicle.onGentleCollide(normal, relSpeed);
            this.triggerGentleBump(relSpeed);
          }
        }
      });

      // Free-Roam Collectibles: Coins & Cyber Keys
      if (this.worldManager.collectibles && this.worldManager.collectibles.length > 0) {
        this.worldManager.updateCollectibles(dt);
        const collected = this.worldManager.checkCollectibleCollisions(this.playerVehicle.position, 2.6);
        if (collected.length > 0) {
          collected.forEach(item => {
            if (item.type === 'coin') {
              sound.playCoinChime();
              this.state.credits += item.value;
              this.state.collectedCoins = (this.state.collectedCoins || 0) + 1;
              SaveManager.save(this.state);
              this.updateHUDReadouts();
              this.showToast('COIN COLLECTED!', `+${item.value} CR Added`);
            } else if (item.type === 'key') {
              sound.playKeyChime();
              if (!this.state.collectedKeys) this.state.collectedKeys = [];
              if (!this.state.collectedKeys.includes(item.id)) {
                this.state.collectedKeys.push(item.id);
              }
              this.state.credits += item.reward;
              this.state.rep += 120;
              SaveManager.save(this.state);
              this.updateHUDReadouts();
              this.showToast('CYBER KEY DISCOVERED!', `+${item.reward} CR · Key collected! (${this.state.collectedKeys.length} Keys found)`);
              this.triggerCameraShake(0.35);
            }
          });
        }
      }

      // Stunt Jump Mission Check
      if (this.currentMode === 'mission' && this.activeMission && this.activeMission.type === 'STUNT JUMP') {
        if (this.playerVehicle.isAirborne && this.playerVehicle.speedKmh >= (this.activeMission.targetSpeed || 180)) {
          this.finishMission(true);
        }
      }

      // Update 3D Crash Particles & Debris
      if (this.crashParticleManager) {
        this.crashParticleManager.update(dt);
      }

      // Mission Checkpoint Tracking & Dynamic Sky Beacon
      if (this.currentMode === 'mission' && !this.isCountdown && this.worldManager.raceWaypoints.length > 0) {
        this.raceTimer += dt;
        const targetWp = this.worldManager.raceWaypoints[this.currentCheckpoint];
        const distToGate = targetWp ? Math.round(this.playerVehicle.position.distanceTo(targetWp)) : 0;

        // Generous 22m checkpoint pass detection zone
        if (targetWp && distToGate < 22) {
          sound.playCheckpointChime();
          this.currentCheckpoint++;

          if (this.currentCheckpoint >= this.worldManager.raceWaypoints.length) {
            this.currentCheckpoint = 0;
            this.raceLap++;

            if (this.activeMission.laps && this.raceLap > this.activeMission.laps) {
              this.finishMission(true);
            }
          }
        }

        // Live update for Beacon & Guide Arrow
        if (this.worldManager.updateBeacon) {
          this.worldManager.updateBeacon(this.currentCheckpoint, dt);
        }
        this.updateGuideArrow(dt);

        // Time Trial / Police Pursuit check
        if (this.activeMission.targetTime) {
          if (this.activeMission.type === 'POLICE PURSUIT') {
            if (this.raceTimer >= this.activeMission.targetTime) this.finishMission(true);
          } else {
            if (this.raceTimer > this.activeMission.targetTime) this.finishMission(false);
          }
        }

        // Drift Event Goal
        if (this.activeMission.targetScore && this.activeMission.type === 'DRIFT EVENT') {
          if (this.playerVehicle.driftScore >= this.activeMission.targetScore) {
            this.finishMission(true);
          }
        }

        // Update Mission HUD Metrics
        const mins = Math.floor(this.raceTimer / 60);
        const secs = (this.raceTimer % 60).toFixed(1);
        document.getElementById('hud-time-val').innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (this.activeMission.laps) {
          document.getElementById('hud-lap-val').innerText = `${Math.min(this.raceLap, this.activeMission.laps)} / ${this.activeMission.laps}`;
        }
        document.getElementById('hud-checkpoint-val').innerText = `${this.currentCheckpoint + 1} / ${this.worldManager.raceWaypoints.length} (${distToGate}M)`;

        // Live Position Rank in HUD
        const posEl = document.getElementById('hud-pos-val');
        if (posEl) {
          posEl.innerText = `${this.calculateRacePosition()} / ${this.rivalVehicles.length + 1}`;
        }
      } else if (this.guideArrow) {
        this.guideArrow.visible = false;
      }

      // 4. Damped Camera Following
      this.updateCamera(dt);

      // 5. Update Digital Gauge Clusters (Speedometer, RPM, Nitro)
      this.updateHUDReadouts();

      // 6. Draw 2D Radar
      this.drawRadar();
    }

    this.renderer.render(this.scene, this.camera);
  }

  triggerCrashAnimation(contactPos, normal, impactKmh) {
    if (this.crashParticleManager) {
      this.crashParticleManager.emitCrash(contactPos, normal, impactKmh);
    }

    const shakeIntensity = Math.min(1.5, 0.45 + (impactKmh / 130));
    this.triggerCameraShake(shakeIntensity);

    sound.playCrashSound(Math.min(1.0, impactKmh / 100));

    const flash = document.getElementById('hit-flash');
    if (flash) {
      flash.classList.add('flashing');
      setTimeout(() => flash.classList.remove('flashing'), 140);
    }

    const crashOverlay = document.getElementById('crash-overlay');
    const crashSpeed = document.getElementById('crash-speed');
    if (crashOverlay && crashSpeed) {
      crashSpeed.innerText = `${Math.round(impactKmh)} KM/H IMPACT · CHASSIS RECOIL`;
      crashOverlay.classList.add('active');
      if (this.crashBannerTimeout) clearTimeout(this.crashBannerTimeout);
      this.crashBannerTimeout = setTimeout(() => {
        crashOverlay.classList.remove('active');
      }, 1200);
    }
  }

  triggerGentleBump(speedKmh) {
    sound.playGentleBumpSound(speedKmh);
    this.triggerCameraShake(0.08);
  }

  triggerCameraShake(intensity = 0.5) {
    this.cameraTrauma = Math.min(1.6, (this.cameraTrauma || 0) + intensity);
  }

  showStuntNotification(title = 'STUNT JUMP!', subtext = 'AIRBORNE') {
    const banner = document.getElementById('stunt-banner');
    const speedEl = document.getElementById('stunt-speed');
    if (banner && speedEl) {
      speedEl.innerText = subtext;
      banner.classList.add('active');
      if (this.stuntTimeout) clearTimeout(this.stuntTimeout);
      this.stuntTimeout = setTimeout(() => {
        banner.classList.remove('active');
      }, 1800);
    }
  }

  updateCamera(dt) {
    if (this.cameraMode === 'chase') {
      // Dynamic chase offset that stretches slightly with speed
      const speedFraction = Math.min(this.playerVehicle.speedKmh / 300, 1.0);
      const dist = 7.5 + speedFraction * 2.5;
      const height = 3.2 + speedFraction * 0.8;

      const idealOffset = new THREE.Vector3(
        -Math.sin(this.playerVehicle.yaw) * dist,
        height,
        -Math.cos(this.playerVehicle.yaw) * dist
      );
      const idealLook = this.playerVehicle.position.clone().add(new THREE.Vector3(
        Math.sin(this.playerVehicle.yaw) * 6,
        1.2,
        Math.cos(this.playerVehicle.yaw) * 6
      ));

      const targetCamPos = this.playerVehicle.position.clone().add(idealOffset);
      this.camera.position.lerp(targetCamPos, dt * 7.5);
      this.camera.lookAt(idealLook);
    } else if (this.cameraMode === 'cockpit') {
      const cockpitOffset = new THREE.Vector3(
        -0.25,
        1.05,
        0.1
      ).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerVehicle.yaw);

      const lookAhead = this.playerVehicle.position.clone().add(
        new THREE.Vector3(Math.sin(this.playerVehicle.yaw) * 12, 0.9, Math.cos(this.playerVehicle.yaw) * 12)
      );

      this.camera.position.copy(this.playerVehicle.position.clone().add(cockpitOffset));
      this.camera.lookAt(lookAhead);
    } else if (this.cameraMode === 'hood') {
      const hoodOffset = new THREE.Vector3(0, 0.72, 1.8).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerVehicle.yaw);
      const lookAhead = this.playerVehicle.position.clone().add(
        new THREE.Vector3(Math.sin(this.playerVehicle.yaw) * 15, 0.65, Math.cos(this.playerVehicle.yaw) * 15)
      );

      this.camera.position.copy(this.playerVehicle.position.clone().add(hoodOffset));
      this.camera.lookAt(lookAhead);
    }

    // Dynamic Camera Trauma & Crash Shake
    if (this.cameraTrauma > 0) {
      this.cameraTrauma = Math.max(0, this.cameraTrauma - dt * 2.6);
      const shake = this.cameraTrauma * this.cameraTrauma;
      this.camera.position.x += (Math.random() - 0.5) * shake * 1.4;
      this.camera.position.y += (Math.random() - 0.5) * shake * 1.4;
      this.camera.position.z += (Math.random() - 0.5) * shake * 1.4;
    }

    // Dynamic FOV: stretches smoothly when Nitro is engaged to emphasize breaching the normal speed barrier
    const targetFov = this.playerVehicle.isNitroActive ? 78 : (65 + (this.playerVehicle.speedKmh / this.playerVehicle.maxSpeedKmh) * 6);
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(dt * 6.5, 1.0);
    this.camera.updateProjectionMatrix();
  }

  updateHUDReadouts() {
    const spdEl = document.getElementById('hud-speed-num');
    const gearEl = document.getElementById('hud-gear-num');
    const rpmFill = document.getElementById('hud-rpm-fill');
    const nitroFill = document.getElementById('hud-nitro-fill');
    const nitroVal = document.getElementById('hud-nitro-val');

    if (spdEl) spdEl.innerText = this.playerVehicle.speedKmh;
    if (gearEl) gearEl.innerText = this.playerVehicle.gear;
    if (rpmFill) {
      const rpmPct = Math.min(100, Math.max(0, ((this.playerVehicle.rpm - 1000) / 8000) * 100));
      rpmFill.style.width = `${rpmPct}%`;
    }
    if (nitroFill && nitroVal) {
      const nitroPct = Math.round((this.playerVehicle.nitro / this.playerVehicle.nitroCapacity) * 100);
      nitroFill.style.width = `${nitroPct}%`;
      if (this.playerVehicle.isNitroActive) {
        nitroVal.innerText = `MAX SPEED (${nitroPct}%)`;
        nitroVal.style.color = '#00f0ff';
      } else {
        nitroVal.innerText = `${nitroPct}%`;
        nitroVal.style.color = '';
      }
    }

    // Drift points HUD
    const driftHud = document.getElementById('hud-drift-container');
    const driftVal = document.getElementById('hud-drift-val');
    if (driftHud && driftVal) {
      if (this.playerVehicle.driftScore > 0) {
        driftHud.classList.remove('hidden');
        driftVal.innerText = this.playerVehicle.driftScore.toLocaleString();
      }
    }

    // Top Header Credits & Free-Roam Motives HUD
    const credEl = document.getElementById('hud-credits');
    if (credEl) credEl.innerText = `${(this.state.credits || 0).toLocaleString()} CR`;
    const colEl = document.getElementById('hud-collectibles-val');
    if (colEl) {
      colEl.innerText = `🪙 ${this.state.collectedCoins || 0} · 🔑 ${(this.state.collectedKeys || []).length} KEYS`;
    }
  }

  handleRoamCrashRespawn(impactKmh) {
    if (this.isRespawning) return;
    this.isRespawning = true;

    // Show intense red crash flash
    const flash = document.getElementById('hit-flash');
    if (flash) flash.classList.add('flashing');

    setTimeout(() => {
      if (flash) flash.classList.remove('flashing');
      sound.playRespawnSwoosh();
      const spawnP = this.getSpawnPointForCurrentWorld();
      this.playerVehicle.resetAt(spawnP.x, spawnP.y || 0, spawnP.z, spawnP.rotY || 0);
      this.playerVehicle.mesh.position.copy(this.playerVehicle.position);
      this.triggerCameraShake(0.2);
      this.showToast('VEHICLE RECOVERED', `Crash at ${Math.round(impactKmh)} KM/H · Restarted at spawn point.`);
      this.isRespawning = false;
    }, 650);
  }

  getSpawnPointForCurrentWorld() {
    const wId = this.worldManager.currentWorldId;
    if (wId === 'raceway') {
      return { x: -14, y: 0, z: -260, rotY: Math.PI / 2 };
    }
    // Metrovale, Highlands, and Neon start at (0, 0, 0) on the open grand boulevard facing directly towards stunt jumps!
    return { x: 0, y: 0, z: 0, rotY: 0 };
  }
}

// ============================================================================
// 10. ENTRYPOINT INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  // Ensure Three.js is available or retry briefly
  const checkThree = setInterval(() => {
    if (typeof THREE !== 'undefined') {
      clearInterval(checkThree);
      window.game = new DriveLabGame();
    }
  }, 50);
});
