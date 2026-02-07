import BaseTest from './BaseTest.js';

export default class UniformityTest extends BaseTest {
    constructor(container) {
        super(container);
        this.step = 0;
        this.levels = [
            '#000000', // Pure Black
            '#101010', // Near Black (Gray 5%)
            '#202020', // Gray 10%
            '#404040', // Gray 25%
            '#808080'  // Gray 50%
        ];
        this.handleClick = this.handleClick.bind(this);
    }

    start() {
        this.render();
        this.container.addEventListener('click', this.handleClick);
        this.updateGuide();
    }

    cleanup() {
        this.container.removeEventListener('click', this.handleClick);
        super.cleanup();
    }

    handleClick(e) {
        if (e.target.closest('.ui-btn')) return;
        this.step = (this.step + 1) % this.levels.length;
        this.render();
        this.updateGuide();
    }

    render() {
        this.container.style.backgroundColor = this.levels[this.step];
    }

    updateGuide() {
        const guide = document.getElementById('test-guide');
        if (guide) {
            const levelText = this.t('guide_uniformity'); // Simplified to generic guide
            guide.textContent = levelText;
        }
    }
}
