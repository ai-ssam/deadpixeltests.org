import BaseTest from './BaseTest.js';

export default class ResponseRateTest extends BaseTest {
    constructor(container) {
        super(container);
        this.isRunning = false;
        this.frameId = null;
        this.lastTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        this.lastFpsTime = 0;
        this.ufoPos = 0;
        this.speed = 960; // Pixels per second
    }

    start() {
        this.container.style.backgroundColor = '#404040';
        this.container.style.overflow = 'hidden';
        this.render();
        this.isRunning = true;
        this.lastTime = performance.now();
        this.lastFpsTime = this.lastTime;
        this.animate(this.lastTime);
        this.showGuide(this.t('guide_response'));
    }

    cleanup() {
        this.isRunning = false;
        if (this.frameId) cancelAnimationFrame(this.frameId);
        super.cleanup();
    }

    render() {
        // FPS Counter
        this.fpsElement = this.createElement('div', 'fps-counter');
        Object.assign(this.fpsElement.style, {
            position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '24px', fontWeight: 'bold', color: 'lime', zIndex: 10
        });

        // Track layers (Background lines for reference)
        const track = this.createElement('div', 'track');
        Object.assign(track.style, {
            position: 'absolute', top: '50%', left: '0', width: '100%', height: '2px', backgroundColor: '#666'
        });

        // The Moving Object (UFO)
        this.ufo = this.createElement('div', 'ufo');
        Object.assign(this.ufo.style, {
            position: 'absolute', top: '50%', left: '0', width: '80px', height: '80px',
            backgroundColor: 'cyan', borderRadius: '50%', border: '4px solid white',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px cyan'
        });

        // Add vertical lines to ufo to see blur/tearing better
        const line = document.createElement('div');
        Object.assign(line.style, {
            width: '4px', height: '100%', backgroundColor: 'black', margin: '0 auto'
        });
        this.ufo.appendChild(line);
    }

    animate(now) {
        if (!this.isRunning) return;

        // FPS Calculation
        this.frameCount++;
        if (now - this.lastFpsTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
            this.frameCount = 0;
            this.lastFpsTime = now;
            this.fpsElement.textContent = `${this.fps} FPS / ${this.fps} Hz`;
        }

        // Motion Logic
        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        const width = this.container.clientWidth;

        // Move UFO
        this.ufoPos += this.speed * dt;
        if (this.ufoPos > width + 100) {
            this.ufoPos = -100;
        }

        this.ufo.style.left = `${this.ufoPos}px`;

        this.frameId = requestAnimationFrame(this.animate.bind(this));
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
