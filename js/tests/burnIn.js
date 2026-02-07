import BaseTest from './BaseTest.js';

export default class BurnInTest extends BaseTest {
    constructor(container) {
        super(container);
        this.state = 'pattern'; // pattern -> gray
        this.handleClick = this.handleClick.bind(this);
    }

    start() {
        this.showGuide(this.t('d_burnIn'));
        this.renderPattern();
        this.container.addEventListener('click', this.handleClick);
    }

    cleanup() {
        this.container.removeEventListener('click', this.handleClick);
        super.cleanup();
    }

    handleClick(e) {
        if (e.target.closest('.ui-btn')) return;

        if (this.state === 'pattern') {
            this.state = 'gray';
            this.renderGray();
            this.showGuide(this.t('d_burnIn'));
        } else {
            this.state = 'pattern';
            this.renderPattern();
            this.showGuide(this.t('d_burnIn'));
        }
    }

    renderPattern() {
        this.container.innerHTML = '';
        this.container.className = ''; // Reset

        // CSS Checkerboard
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const size = 100;
        const cols = Math.ceil(canvas.width / size);
        const rows = Math.ceil(canvas.height / size);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                ctx.fillStyle = (r + c) % 2 === 0 ? 'white' : 'black';
                ctx.fillRect(c * size, r * size, size, size);
            }
        }

        this.container.appendChild(canvas);
        this.elements.push(canvas);
    }

    renderGray() {
        this.container.innerHTML = '';
        this.container.style.backgroundColor = '#808080';
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
