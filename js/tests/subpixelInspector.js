import BaseTest from './BaseTest.js';

export default class SubpixelInspectorTest extends BaseTest {
    constructor(container) {
        super(container);
        this.zoom = 14;
        this.onZoom = this.onZoom.bind(this);
    }

    start() {
        this.container.style.background = '#030303';
        this.container.style.display = 'grid';
        this.container.style.placeItems = 'center';
        this.render();
        this.showGuide('Inspect RGB fringe and subpixel order. Use slider for zoom.');
    }

    cleanup() {
        if (this.zoomInput) this.zoomInput.removeEventListener('input', this.onZoom);
        this.container.style.background = '';
        this.container.style.display = '';
        this.container.style.placeItems = '';
        super.cleanup();
    }

    render() {
        const wrap = this.createElement('div', 'subpixel-wrap');
        Object.assign(wrap.style, {
            width: 'min(1020px, 96vw)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #2f536e',
            background: '#0a1c2c'
        });

        const top = document.createElement('div');
        Object.assign(top.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '10px'
        });

        const label = document.createElement('label');
        label.textContent = 'Zoom';
        label.style.color = '#eaf4ff';
        top.appendChild(label);

        this.zoomInput = document.createElement('input');
        this.zoomInput.type = 'range';
        this.zoomInput.min = '8';
        this.zoomInput.max = '24';
        this.zoomInput.value = String(this.zoom);
        this.zoomInput.style.width = '220px';
        this.zoomInput.addEventListener('input', this.onZoom);
        top.appendChild(this.zoomInput);

        this.zoomLabel = document.createElement('span');
        this.zoomLabel.style.color = '#9eb7cb';
        top.appendChild(this.zoomLabel);

        wrap.appendChild(top);

        this.canvas = document.createElement('canvas');
        this.canvas.width = 960;
        this.canvas.height = 560;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        this.canvas.style.border = '1px solid #315a79';
        this.canvas.style.borderRadius = '8px';
        wrap.appendChild(this.canvas);

        this.drawPattern();
    }

    onZoom() {
        this.zoom = Number(this.zoomInput.value);
        this.drawPattern();
    }

    drawPattern() {
        const ctx = this.canvas.getContext('2d');
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, w, h);

        const blockW = this.zoom;
        const blockH = this.zoom * 2;

        for (let y = 30; y < 320; y += blockH + 2) {
            for (let x = 20; x < w - 20; x += blockW * 3 + 3) {
                ctx.fillStyle = '#ff2d2d';
                ctx.fillRect(x, y, blockW, blockH);
                ctx.fillStyle = '#3cff52';
                ctx.fillRect(x + blockW, y, blockW, blockH);
                ctx.fillStyle = '#3f7bff';
                ctx.fillRect(x + blockW * 2, y, blockW, blockH);
            }
        }

        ctx.fillStyle = '#eaf4ff';
        ctx.font = `${Math.max(20, this.zoom + 8)}px Arial`;
        ctx.fillText('RGB fringes and font edge behavior', 24, 390);

        ctx.fillStyle = '#9eb7cb';
        ctx.font = '20px Arial';
        ctx.fillText('The quick brown fox jumps over the lazy dog 1234567890', 24, 430);

        this.drawChecker(ctx);
        this.zoomLabel.textContent = `${this.zoom}x`;
    }

    drawChecker(ctx) {
        const x0 = 24;
        const y0 = 450;
        const cell = 14;

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 30; x++) {
                const odd = (x + y) % 2 === 0;
                ctx.fillStyle = odd ? '#f5f5f5' : '#101010';
                ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
            }
        }
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
