import BaseTest from './BaseTest.js';

export default class RefreshCadenceTest extends BaseTest {
    constructor(container) {
        super(container);
        this.rafId = null;
        this.lastTime = 0;
        this.frameDiffs = [];
        this.maxSamples = 240;
        this.pos = 0;
        this.dir = 1;
        this.animate = this.animate.bind(this);
    }

    start() {
        this.container.style.background = '#050505';
        this.container.style.overflow = 'hidden';
        this.render();
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.animate);
        this.showGuide('Cadence mapper: observe jitter and dropped-frame spikes.');
    }

    cleanup() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        this.container.style.background = '';
        this.container.style.overflow = '';
        super.cleanup();
    }

    render() {
        this.stats = this.createElement('div', 'cadence-stats');
        Object.assign(this.stats.style, {
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: '#9cff57',
            fontFamily: 'monospace',
            fontSize: '18px',
            lineHeight: '1.4'
        });

        this.track = this.createElement('div', 'cadence-track');
        Object.assign(this.track.style, {
            position: 'absolute',
            left: '5%',
            right: '5%',
            top: '50%',
            height: '2px',
            background: '#777'
        });

        this.probe = this.createElement('div', 'cadence-probe');
        Object.assign(this.probe.style, {
            position: 'absolute',
            top: '50%',
            left: '5%',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#33d1b9',
            boxShadow: '0 0 12px rgba(51, 209, 185, 0.9)'
        });

        this.timeline = this.createElement('canvas', 'cadence-timeline');
        Object.assign(this.timeline.style, {
            position: 'absolute',
            left: '5%',
            right: '5%',
            bottom: '8%',
            width: '90%',
            height: '28%'
        });
        this.timeline.width = Math.max(500, Math.floor(window.innerWidth * 0.9));
        this.timeline.height = Math.max(120, Math.floor(window.innerHeight * 0.28));
        this.timelineCtx = this.timeline.getContext('2d');
    }

    animate(now) {
        const delta = now - this.lastTime;
        this.lastTime = now;

        if (delta > 0 && delta < 100) {
            this.frameDiffs.push(delta);
            if (this.frameDiffs.length > this.maxSamples) this.frameDiffs.shift();
        }

        const trackWidth = window.innerWidth * 0.9;
        this.pos += this.dir * 0.0055 * delta * trackWidth;
        if (this.pos > trackWidth) {
            this.pos = trackWidth;
            this.dir = -1;
        }
        if (this.pos < 0) {
            this.pos = 0;
            this.dir = 1;
        }
        this.probe.style.left = `${window.innerWidth * 0.05 + this.pos}px`;

        this.updateStats();
        this.drawTimeline();
        this.rafId = requestAnimationFrame(this.animate);
    }

    updateStats() {
        if (this.frameDiffs.length < 5) return;

        const avg = this.frameDiffs.reduce((a, b) => a + b, 0) / this.frameDiffs.length;
        const fps = 1000 / avg;
        const variance = this.frameDiffs.reduce((acc, d) => acc + (d - avg) ** 2, 0) / this.frameDiffs.length;
        const stddev = Math.sqrt(variance);
        const worst = Math.max(...this.frameDiffs);

        this.stats.innerHTML = [
            `avg fps: ${fps.toFixed(1)}`,
            `frame avg: ${avg.toFixed(2)} ms`,
            `jitter(sd): ${stddev.toFixed(2)} ms`,
            `worst spike: ${worst.toFixed(2)} ms`
        ].join('<br>');
    }

    drawTimeline() {
        const ctx = this.timelineCtx;
        const w = this.timeline.width;
        const h = this.timeline.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#101010';
        ctx.fillRect(0, 0, w, h);

        if (this.frameDiffs.length < 2) return;

        const stepX = w / (this.maxSamples - 1);
        ctx.strokeStyle = '#33d1b9';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < this.frameDiffs.length; i++) {
            const ms = this.frameDiffs[i];
            const capped = Math.min(40, ms);
            const y = h - (capped / 40) * h;
            const x = i * stepX;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = '#f97316';
        ctx.setLineDash([6, 6]);
        const referenceY = h - (16.67 / 40) * h;
        ctx.beginPath();
        ctx.moveTo(0, referenceY);
        ctx.lineTo(w, referenceY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
