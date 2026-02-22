const context = new AudioContext();

type BufferName = 'laser' | 'explosions' | 'game_over' | 'engine';
const buffers: {[name in BufferName]: AudioBuffer | null} = {
    'laser': null,
    'explosions': null,
    'game_over': null,
    'engine': null,
};
const loadBuffer = async (name: BufferName, url: string) => {
  const response = await fetch(url);
  const bytes = await response.arrayBuffer();
  const buffer = await context.decodeAudioData(bytes);
  buffers[name] = buffer;
}
Promise.all([
    loadBuffer("laser", "./assets/laser.mp3"),
    loadBuffer("explosions", "./assets/explosions.mp3"),
    loadBuffer("game_over", "./assets/game_over.wav"),
    loadBuffer("engine", "./assets/engine.mp3"),
])

export type SoundName = 'laser' | 'game_over' | 'engine' | 'explosion1' | 'explosion2' | 'explosion3' | 'explosion4';
type Sound = {
    buffer: BufferName,
    loop?: boolean,
    start?: number,
    duration?: number,
    parsedBuffer?: AudioBuffer,
};
const sounds: {[name in SoundName]: Sound} = {
    "laser": {buffer:'laser'},
    "game_over": {buffer:'game_over'},
    "engine": {buffer:'engine', loop: true},
    'explosion1': {buffer:'explosions', duration: 2.0, start: 0},
    'explosion2': {buffer:'explosions', duration: 2.0, start: 2.5},
    'explosion3': {buffer:'explosions', duration: 2.0, start: 5.0},
    'explosion4': {buffer:'explosions', duration: 2.0, start: 7.5},
};

export const play = (name: SoundName) => {
    const config = sounds[name];
    const buffer = buffers[config.buffer];
    if (!buffer) {
        return
    }
    const source = context.createBufferSource();
    source.connect(context.destination);
    if (!config.parsedBuffer) {
        if (config.start == undefined || config.duration == undefined) {
            config.parsedBuffer = buffer;
        } else {
            const s = context.sampleRate;
            config.parsedBuffer = context.createBuffer(1, s*config.duration, s);
            const start = s*config.start;
            const end = start + s*config.duration;
            config.parsedBuffer.copyToChannel(buffer.getChannelData(0).slice(start, end), 0);
        }
    }
    source.buffer = config.parsedBuffer;
    source.loop = config.loop || false;
    source.start();
    return source;
}

export const playExplosion = () => {
    const n = Math.floor(Math.random() * 4) + 1;
    play(`explosion${n}` as SoundName)
}
