import BaseTest from './BaseTest.js';

export default class ReadabilityTest extends BaseTest {
    constructor(container) {
        super(container);
        this.bgMode = 'white'; // white or black
        this.toggleMode = this.toggleMode.bind(this);
    }

    start() {
        this.render();
        this.container.addEventListener('click', this.toggleMode);
        this.showGuide(this.t('guide_readability'));
    }

    cleanup() {
        this.container.removeEventListener('click', this.toggleMode);
        super.cleanup();
    }

    toggleMode(e) {
        if (e.target.closest('.ui-btn')) return;
        this.bgMode = this.bgMode === 'white' ? 'black' : 'white';
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.container.style.backgroundColor = this.bgMode;
        this.container.style.color = this.bgMode === 'white' ? 'black' : 'white';

        const content = this.createElement('div', 'readability-content');
        content.style.padding = '50px';
        content.style.maxWidth = '1000px';
        content.style.margin = '0 auto';
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '20px';

        const sizes = [10, 11, 12, 14, 18, 24, 32];
        const sentence = "다람쥐 헌 쳇바퀴에 타고파. The quick brown fox jumps over the lazy dog. 1234567890";

        sizes.forEach(size => {
            const row = document.createElement('div');
            row.style.fontSize = `${size}px`;
            row.style.borderBottom = `1px solid ${this.bgMode === 'white' ? '#ddd' : '#333'}`;
            row.style.padding = '10px 0';

            const label = document.createElement('span');
            label.textContent = `${size}px: `;
            label.style.fontWeight = 'bold';
            label.style.marginRight = '10px';

            const text = document.createElement('span');
            text.textContent = sentence;

            row.appendChild(label);
            row.appendChild(text);
            content.appendChild(row);
        });

        // Add a ClearType test pattern (alternating 1px lines)
        const pattern = document.createElement('div');
        pattern.style.marginTop = '40px';
        pattern.innerHTML = '<h3>ClearType / Sharpness Pattern</h3>';

        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');

        // Vertical lines
        ctx.fillStyle = this.bgMode === 'white' ? 'black' : 'white';
        for (let x = 0; x < 600; x += 2) {
            ctx.fillRect(x, 0, 1, 50);
        }

        pattern.appendChild(canvas);
        content.appendChild(pattern);

        this.container.appendChild(content);
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
