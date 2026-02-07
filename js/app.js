import I18n from './i18n.js';

/**
 * Main Application Controller
 */
class App {
    constructor() {
        this.i18n = new I18n(); // Initialize Internationalization

        this.dashboard = document.getElementById('dashboard');
        this.testContainer = document.getElementById('test-container');
        this.testContent = document.getElementById('test-content');
        this.currentTestModule = null;

        this.init();
    }

    init() {
        // Event delegation for dashboard buttons
        this.dashboard.addEventListener('click', (e) => {
            const card = e.target.closest('.test-card');
            if (card) {
                const testName = card.dataset.test;
                this.startTest(testName);
            }
        });

        // Back button
        document.getElementById('btn-back').addEventListener('click', () => {
            this.stopTest();
        });

        // Global Key Listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.stopTest();
            }
        });
    }

    async startTest(testName) {
        console.log(`Starting test: ${testName}`);

        try {
            // Dynamic import of test module
            // We assume each test is exported as a default class in js/tests/<name>.js
            const module = await import(`./tests/${testName}.js`);
            const TestClass = module.default;

            this.currentTestModule = new TestClass(this.testContent);

            // Switch View
            this.dashboard.classList.add('hidden');
            this.testContainer.classList.remove('hidden');

            // Request Fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Fullscreen blocked or cancelled');
                    // Continue anyway
                });
            }

            // Start Test
            this.currentTestModule.start();

        } catch (error) {
            console.error(`Failed to load test: ${testName}`, error);
            alert('테스트 모듈을 불러오는 중 오류가 발생했습니다: ' + testName);
        }
    }

    stopTest() {
        if (!this.currentTestModule) return;

        // Cleanup test
        if (this.currentTestModule.cleanup) {
            this.currentTestModule.cleanup();
        }
        this.currentTestModule = null;
        this.testContent.innerHTML = ''; // Clear content

        // Restore View
        this.testContainer.classList.add('hidden');
        this.dashboard.classList.remove('hidden');

        // Exit Fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log('Exit fullscreen failed'));
        }
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
