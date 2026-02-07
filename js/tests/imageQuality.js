import BaseTest from './BaseTest.js';

export default class ImageQualityTest extends BaseTest {
    constructor(container) {
        super(container);
    }

    start() {
        this.container.style.backgroundColor = 'black';
        this.render();
        this.showGuide(this.t('d_imageQuality'));
    }

    render() {
        this.container.innerHTML = '';

        // Use Unsplash source for high quality random nature image
        const img = document.createElement('img');
        img.src = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2560&auto=format&fit=crop';
        // Landscape photo. (Using a fixed URL for consistency, rather than random every time)

        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        img.onload = () => {
            // Image loaded
        };

        img.onerror = () => {
            this.container.innerHTML = '<div style="color:white;display:flex;justify-content:center;align-items:center;height:100%;">Image Load Failed</div>';
        };

        this.container.appendChild(img);
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
