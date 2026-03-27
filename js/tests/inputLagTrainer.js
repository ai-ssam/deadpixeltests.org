import BaseTest from './BaseTest.js';

export default class InputLagTrainerTest extends BaseTest {
    constructor(container) {
        super(container);
        this.round = 0;
        this.maxRounds = 8;
        this.results = [];
        this.waitTimer = null;
        this.state = 'idle';
        this.triggerTime = 0;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    start() {
        this.container.style.background = '#050505';
        this.container.style.display = 'grid';
        this.container.style.placeItems = 'center';

        this.panel = this.createElement('div', 'lag-panel');
        Object.assign(this.panel.style, {
            width: 'min(720px, 90vw)',
            padding: '24px',
            border: '1px solid #2f536e',
            borderRadius: '12px',
            background: 'rgba(16, 40, 62, 0.88)',
            color: '#eaf4ff',
            textAlign: 'center'
        });

        this.status = document.createElement('h2');
        this.status.style.marginBottom = '10px';
        this.panel.appendChild(this.status);

        this.sub = document.createElement('p');
        this.sub.style.color = '#9eb7cb';
        this.panel.appendChild(this.sub);

        this.resultBox = document.createElement('pre');
        Object.assign(this.resultBox.style, {
            marginTop: '14px',
            padding: '12px',
            borderRadius: '8px',
            background: '#0b1b2a',
            color: '#9cff57',
            textAlign: 'left',
            whiteSpace: 'pre-wrap'
        });
        this.panel.appendChild(this.resultBox);

        this.container.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeyDown);

        this.showGuide('Press SPACE or click when the screen turns green.');
        this.nextRound();
    }

    cleanup() {
        if (this.waitTimer) clearTimeout(this.waitTimer);
        this.container.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeyDown);
        this.container.style.background = '';
        this.container.style.display = '';
        this.container.style.placeItems = '';
        super.cleanup();
    }

    onClick(e) {
        if (e.target.closest('.ui-btn')) return;
        this.handleInput();
    }

    onKeyDown(e) {
        if (e.code !== 'Space') return;
        e.preventDefault();
        this.handleInput();
    }

    handleInput() {
        if (this.state === 'ready') {
            const ms = performance.now() - this.triggerTime;
            this.results.push(ms);
            this.round += 1;
            this.status.textContent = `Round ${this.round}/${this.maxRounds}: ${ms.toFixed(1)} ms`;
            this.sub.textContent = 'Great. Preparing next random trigger...';
            this.state = 'cooldown';
            this.renderSummary();
            this.nextRound();
            return;
        }

        if (this.state === 'waiting') {
            this.status.textContent = 'Too early.';
            this.sub.textContent = 'Wait for green. Restarting this round...';
            this.state = 'idle';
            if (this.waitTimer) clearTimeout(this.waitTimer);
            this.nextRound(900);
        }
    }

    nextRound(delay = 450) {
        if (this.round >= this.maxRounds) {
            this.finish();
            return;
        }

        this.container.style.background = '#050505';
        this.status.textContent = `Round ${this.round + 1}/${this.maxRounds}`;
        this.sub.textContent = 'Wait for green signal...';
        this.state = 'waiting';

        const waitMs = delay + 700 + Math.random() * 2200;
        this.waitTimer = setTimeout(() => {
            this.container.style.background = '#0d3f1f';
            this.status.textContent = 'GO';
            this.sub.textContent = 'Press SPACE or click now.';
            this.triggerTime = performance.now();
            this.state = 'ready';
        }, waitMs);
    }

    finish() {
        this.container.style.background = '#10283e';
        this.status.textContent = 'Session complete';
        this.sub.textContent = 'Use this as practical reaction + display chain timing, not lab-grade input lag.';
        this.state = 'done';
        this.renderSummary();
    }

    renderSummary() {
        if (this.results.length === 0) {
            this.resultBox.textContent = 'No successful rounds yet.';
            return;
        }

        const avg = this.results.reduce((a, b) => a + b, 0) / this.results.length;
        const min = Math.min(...this.results);
        const max = Math.max(...this.results);
        const variance = this.results.reduce((acc, v) => acc + (v - avg) ** 2, 0) / this.results.length;
        const sd = Math.sqrt(variance);

        this.resultBox.textContent = [
            `samples: ${this.results.length}`,
            `avg: ${avg.toFixed(1)} ms`,
            `min: ${min.toFixed(1)} ms`,
            `max: ${max.toFixed(1)} ms`,
            `stdev: ${sd.toFixed(1)} ms`
        ].join('\n');
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
