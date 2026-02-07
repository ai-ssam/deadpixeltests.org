import BaseTest from './BaseTest.js';

export default class ContrastTest extends BaseTest {
    constructor(container) {
        super(container);
        this.currentStage = 0;
        this.stages = ['gradient', 'black_level', 'white_level'];
        this.handleClick = this.handleClick.bind(this);
    }

    start() {
        this.container.classList.add('contrast-test-container'); // Add specific class if needed
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.render();
        this.container.addEventListener('click', this.handleClick);
        this.showGuide(this.t('guide_next'));
    }

    cleanup() {
        this.container.removeEventListener('click', this.handleClick);
        this.container.style.display = '';
        this.container.style.flexDirection = '';
        this.container.style.justifyContent = '';
        this.container.style.alignItems = '';
        this.container.style.backgroundColor = ''; // Reset
        super.cleanup();
    }

    handleClick(e) {
        if (e.target.closest('.ui-btn')) return;
        this.currentStage = (this.currentStage + 1) % this.stages.length;
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous
        const stage = this.stages[this.currentStage];
        this.container.style.backgroundColor = 'black'; // Default base

        if (stage === 'gradient') {
            this.renderGradient();
            this.updateGuide(this.t('guide_contrast_gradient'));
        } else if (stage === 'black_level') {
            this.renderBlackLevel();
            this.updateGuide(this.t('guide_contrast_black'));
        } else if (stage === 'white_level') {
            this.renderWhiteLevel();
            this.updateGuide(this.t('guide_contrast_white'));
        }
    }

    renderGradient() {
        // 14-step Grayscale Bar
        const barContainer = this.createElement('div', 'contrast-bar-container');
        barContainer.style.display = 'flex';
        barContainer.style.width = '100%';
        barContainer.style.height = '100%';
        barContainer.style.maxHeight = '60vh';
        barContainer.style.padding = '0 20px';

        for (let i = 0; i < 15; i++) {
            const val = Math.round((i / 14) * 255);
            const div = document.createElement('div');
            div.style.flex = '1';
            div.style.backgroundColor = `rgb(${val}, ${val}, ${val})`;
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.color = val > 128 ? 'black' : 'white';
            div.textContent = `${Math.round((i / 14) * 100)}%`;
            barContainer.appendChild(div);
        }
        this.container.appendChild(barContainer);
    }

    renderBlackLevel() {
        // Dark Squares on Black Background
        this.container.style.backgroundColor = '#000000';

        const grid = this.createElement('div', 'level-grid');
        grid.style.display = 'grid';
        grid.style.width = '100%';
        grid.style.height = '100%';
        grid.style.padding = '20px';
        grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
        grid.style.gridAutoRows = 'minmax(60px, 1fr)'; // Dynamic rows
        grid.style.maxWidth = '800px';
        grid.style.aspectRatio = '1/1'; // Keep square aspectish or bounded
        grid.style.justifyContent = 'center';
        grid.style.alignContent = 'center';

        for (let i = 1; i <= 25; i++) {
            const div = document.createElement('div');
            // Very subtle gray steps
            const val = i * 2; // 2, 4, 6... 50
            div.style.backgroundColor = `rgb(${val}, ${val}, ${val})`;
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.color = '#808080';
            div.textContent = i;
            grid.appendChild(div);
        }
        this.container.appendChild(grid);
    }

    renderWhiteLevel() {
        // Bright Squares on White Background
        this.container.style.backgroundColor = '#FFFFFF';

        const grid = this.createElement('div', 'level-grid');
        grid.style.display = 'grid';
        grid.style.width = '100%';
        grid.style.height = '100%';
        grid.style.padding = '20px';
        grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
        grid.style.gridAutoRows = 'minmax(60px, 1fr)';
        grid.style.maxWidth = '800px';
        grid.style.aspectRatio = '1/1';
        grid.style.justifyContent = 'center';
        grid.style.alignContent = 'center';

        for (let i = 1; i <= 25; i++) {
            const div = document.createElement('div');
            // Very subtle steps from 255 down
            const val = 255 - (i * 2);
            div.style.backgroundColor = `rgb(${val}, ${val}, ${val})`;
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.color = '#808080';
            div.textContent = i;
            grid.appendChild(div);
        }
        this.container.appendChild(grid);
    }

    updateGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }

    showGuide(text) { this.updateGuide(text); }
}
