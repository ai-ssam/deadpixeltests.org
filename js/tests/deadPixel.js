import BaseTest from './BaseTest.js';

export default class DeadPixelTest extends BaseTest {
    constructor(container) {
        super(container);
        this.colors = [
            'black', 'white', 'red', 'lime', 'blue',
            'cyan', 'magenta', 'yellow'
        ];
        this.currentIndex = 0;
        this.handleClick = this.handleClick.bind(this);
    }

    start() {
        this.render();
        // We attach click listener to the container (which covers full screen)
        this.container.addEventListener('click', this.handleClick);

        // Show initial guide
        this.showGuide(this.t('guide_next'));
    }

    cleanup() {
        super.cleanup();
        this.container.removeEventListener('click', this.handleClick);
    }

    handleClick(e) {
        // Prevent interfering with UI buttons if they are clicked (though overlay handles pointer-events)
        if (e.target.closest('.ui-btn')) return;

        this.currentIndex = (this.currentIndex + 1) % this.colors.length;
        this.render();
    }

    render() {
        this.container.style.backgroundColor = this.colors[this.currentIndex];

        // Update guide text if needed, or hide it after first interaction
        // For now, we keep the background solid
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) {
            guide.textContent = text;
            guide.style.opacity = '1';
            setTimeout(() => {
                guide.style.opacity = '0'; // Fade out after 3 seconds
            }, 3000);
        }
    }
}
