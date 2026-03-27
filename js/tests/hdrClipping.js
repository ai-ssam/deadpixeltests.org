import BaseTest from './BaseTest.js';

export default class HdrClippingTest extends BaseTest {
    constructor(container) {
        super(container);
        this.stage = 0;
        this.stages = ['luma', 'color', 'shadow'];
        this.onClick = this.onClick.bind(this);
    }

    start() {
        this.container.addEventListener('click', this.onClick);
        this.render();
    }

    cleanup() {
        this.container.removeEventListener('click', this.onClick);
        super.cleanup();
    }

    onClick(e) {
        if (e.target.closest('.ui-btn')) return;
        this.stage = (this.stage + 1) % this.stages.length;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.container.style.background = '#000';
        this.container.style.display = 'grid';
        this.container.style.placeItems = 'center';

        const wrap = this.createElement('div', 'hdr-wrap');
        Object.assign(wrap.style, {
            width: 'min(1100px, 96vw)',
            padding: '14px',
            border: '1px solid #2f536e',
            borderRadius: '12px',
            background: '#0a1c2c'
        });

        const title = document.createElement('h2');
        title.style.marginBottom = '10px';
        title.style.color = '#eaf4ff';
        wrap.appendChild(title);

        const pattern = document.createElement('div');
        Object.assign(pattern.style, {
            height: '60vh',
            borderRadius: '8px',
            border: '1px solid #325a7a',
            overflow: 'hidden'
        });
        wrap.appendChild(pattern);

        if (this.stages[this.stage] === 'luma') {
            title.textContent = 'Highlight clipping ramp (235 to 255)';
            pattern.style.background = 'linear-gradient(90deg, rgb(235,235,235), rgb(255,255,255))';
            this.drawLabels(pattern, 235, 255, 'gray');
            this.showGuide('If right-side bars blend completely, highlights are clipping. Click for next pattern.');
        }

        if (this.stages[this.stage] === 'color') {
            title.textContent = 'Color-channel clipping stress';
            pattern.style.background = 'linear-gradient(90deg, rgb(255,0,0), rgb(255,220,220), rgb(0,255,0), rgb(220,255,220), rgb(0,0,255), rgb(220,220,255))';
            this.drawLabels(pattern, 240, 255, 'rgb');
            this.showGuide('Inspect whether bright red/green/blue detail collapses to flat patches. Click for next pattern.');
        }

        if (this.stages[this.stage] === 'shadow') {
            title.textContent = 'Near-black shadow detail (0 to 30)';
            pattern.style.background = 'linear-gradient(90deg, rgb(0,0,0), rgb(30,30,30))';
            this.drawLabels(pattern, 0, 30, 'shadow');
            this.showGuide('Use this to verify black crush. First few bars should still be visible. Click to restart cycle.');
        }
    }

    drawLabels(parent, min, max, mode) {
        const grid = document.createElement('div');
        Object.assign(grid.style, {
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            height: '100%'
        });

        for (let i = 0; i < 8; i++) {
            const val = Math.round(min + ((max - min) * i) / 7);
            const cell = document.createElement('div');
            cell.style.display = 'flex';
            cell.style.alignItems = 'flex-end';
            cell.style.justifyContent = 'center';
            cell.style.paddingBottom = '8px';
            cell.style.color = mode === 'shadow' ? '#ddd' : '#111';
            cell.style.fontWeight = '700';
            cell.style.textShadow = mode === 'shadow' ? '0 0 3px #000' : '0 0 3px #fff';
            cell.textContent = `${val}`;
            grid.appendChild(cell);
        }
        parent.appendChild(grid);
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
