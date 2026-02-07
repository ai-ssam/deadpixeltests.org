import BaseTest from './BaseTest.js';

export default class ColorDifferenceTest extends BaseTest {
    constructor(container) {
        super(container);
        this.colors = [
            { name: 'Red', base: [255, 0, 0] },
            { name: 'Green', base: [0, 255, 0] },
            { name: 'Blue', base: [0, 0, 255] },
            { name: 'Magenta', base: [255, 0, 255] }
        ];
        this.stage = 0;
        this.handleClick = this.handleClick.bind(this);
    }

    start() {
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.render();
        this.container.addEventListener('click', this.handleClick);
        this.showGuide(this.t('guide_next'));
    }

    cleanup() {
        this.container.removeEventListener('click', this.handleClick);
        this.container.style.display = '';
        this.container.style.justifyContent = '';
        this.container.style.alignItems = '';
        this.container.style.backgroundColor = '';
        super.cleanup();
    }

    handleClick(e) {
        if (e.target.closest('.ui-btn')) return;
        this.stage = (this.stage + 1) % this.colors.length;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        const color = this.colors[this.stage];
        this.container.style.backgroundColor = '#111';

        const grid = this.createElement('div', 'color-grid');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        grid.style.gap = '20px';
        grid.style.padding = '20px';

        // 9 boxes. Center is base. Others deviate slightly.
        // Actually, let's make a pattern where inner text helps or something.
        // Or just a gradient of intensity.

        // Let's do 3x3 grid.
        // Top row: -2%, -1%, Base
        // Mid row: Base, +1%, +2%
        // etc.

        const [r, g, b] = color.base;

        // Deviations: -4, -3, -2, -1, 0, +1, +2, +3, +4 percent approx
        const steps = [-10, -8, -6, -4, 0, 4, 6, 8, 10]; // RGB value delta

        steps.forEach((delta, idx) => {
            const div = document.createElement('div');
            div.style.width = '200px';
            div.style.height = '200px';

            // Apply delta safely
            const nr = Math.max(0, Math.min(255, r + delta));
            const ng = Math.max(0, Math.min(255, g + delta));
            const nb = Math.max(0, Math.min(255, b + delta));

            div.style.backgroundColor = `rgb(${nr}, ${ng}, ${nb})`;
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.color = 'rgba(255,255,255,0.5)';
            div.style.fontSize = '1.2rem';
            div.style.fontWeight = 'bold';

            // Only show text on hover or always? Let's hide text to make it a test,
            // or show the delta to help check?
            // Let's show the delta.
            const label = delta === 0 ? 'Ref' : (delta > 0 ? `+${delta}` : `${delta}`);
            div.textContent = label;

            grid.appendChild(div);
        });

        this.container.appendChild(grid);
        this.updateGuide(`${this.t('t_colorDifference')} (${color.name})`);
    }

    updateGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }

    showGuide(text) { this.updateGuide(text); }
}
