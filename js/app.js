import I18n from './i18n.js';

class App {
    constructor() {
        this.i18n = new I18n();
        this.dashboard = document.getElementById('dashboard');
        this.testContainer = document.getElementById('test-container');
        this.testContent = document.getElementById('test-content');
        this.currentTestModule = null;

        if (!this.dashboard || !this.testContainer || !this.testContent) {
            return;
        }

        this.init();
    }

    init() {
        this.dashboard.addEventListener('click', (event) => {
            const card = event.target.closest('.test-card');
            if (!card) {
                return;
            }

            const testName = card.dataset.test;
            if (testName) {
                this.startTest(testName);
            }
        });

        const backButton = document.getElementById('btn-back');
        if (backButton) {
            backButton.addEventListener('click', () => this.stopTest());
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.stopTest();
            }
        });
    }

    async startTest(testName) {
        try {
            const module = await import(`./tests/${testName}.js`);
            const TestClass = module.default;

            this.currentTestModule = new TestClass(this.testContent);

            this.dashboard.classList.add('hidden');
            this.testContainer.classList.remove('hidden');

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(() => {
                    // Browsers may reject fullscreen without a direct trusted gesture.
                });
            }

            this.currentTestModule.start();
        } catch (error) {
            console.error(`Failed to load test: ${testName}`, error);
            alert(`Failed to load the selected test module: ${testName}`);
        }
    }

    stopTest() {
        if (!this.currentTestModule) {
            return;
        }

        if (typeof this.currentTestModule.cleanup === 'function') {
            this.currentTestModule.cleanup();
        }

        this.currentTestModule = null;
        this.testContent.innerHTML = '';
        this.testContainer.classList.add('hidden');
        this.dashboard.classList.remove('hidden');

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {
                // Ignore fullscreen exit failures.
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
