import BaseTest from './BaseTest.js';

export default class WhiteBalanceTest extends BaseTest {
    constructor(container) {
        super(container);
    }

    start() {
        this.container.style.backgroundColor = '#FFFFFF';
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';
        this.render();
        this.showGuide(this.t('d_whiteBalance'));
    }

    render() {
        const grid = this.createElement('div', 'wb-grid');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
        grid.style.gridTemplateRows = 'repeat(3, 1fr)'; // Force 3 rows
        grid.style.width = 'min(90vw, 1000px)';
        grid.style.height = 'min(60vh, 600px)'; // Use reasonable height
        grid.style.gap = '10px'; // Larger gap for visibility

        // Very subtle near-white shades
        // 255 to 227
        for (let i = 0; i < 15; i++) {
            const div = document.createElement('div');
            const val = 255 - (i * 2);
            div.style.backgroundColor = `rgb(${val},${val},${val})`;
            div.style.border = '1px solid #ddd';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.color = '#808080';
            div.style.fontSize = '1.2rem';
            div.style.fontWeight = 'bold';
            div.textContent = val;
            grid.appendChild(div);
        }
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
