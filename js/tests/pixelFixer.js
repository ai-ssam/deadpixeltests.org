import BaseTest from './BaseTest.js';

export default class PixelFixerTest extends BaseTest {
    constructor(container) {
        super(container);
        this.animationId = null;
        this.isRunning = false;
        this.colors = ['red', 'lime', 'blue', 'white', 'black'];

        // Use a canvas for high-performance random noise
        this.canvas = null;
        this.ctx = null;
    }

    start() {
        // 1. Show Warning First
        if (!confirm(this.t('warn_pixelFixer'))) {
            // User cancelled, trigger back logic (would be nice to have a cleaner way, 
            // but for now we rely on the user to press ESC or Back if they clicked cancel, 
            // or we force stop. Since start is async, we can't easily return content.
            // We'll show a safe screen.)
            this.container.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;"><h3>${this.t('menu')}</h3></div>`;
            return;
        }

        this.canvas = this.createElement('canvas', 'full-screen-color');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');

        // Handle resize
        window.addEventListener('resize', this.handleResize.bind(this));

        this.isRunning = true;
        this.animate();

        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = this.t('msg_pixelFixer_stop');
    }

    cleanup() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize.bind(this));
        super.cleanup();
    }

    handleResize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    animate() {
        if (!this.isRunning) return;

        // Generate static noise or random colors
        // Approach: Fill screen with random colored blocks
        const blockSize = 40; // Size of noise blocks
        const w = this.canvas.width;
        const h = this.canvas.height;

        for (let x = 0; x < w; x += blockSize) {
            for (let y = 0; y < h; y += blockSize) {
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, blockSize, blockSize);
            }
        }

        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
}
