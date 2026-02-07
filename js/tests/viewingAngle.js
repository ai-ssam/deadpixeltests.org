import BaseTest from './BaseTest.js';

export default class ViewingAngleTest extends BaseTest {
    constructor(container) {
        super(container);
    }

    start() {
        this.container.style.backgroundColor = '#808080';
        this.render();
        this.showGuide(this.t('guide_viewingAngle'));
    }

    render() {
        const colors = ['red', 'lime', 'blue', 'white', 'black'];

        // Create circles in 5 positions: TopLeft, TopRight, Center, BottomLeft, BottomRight
        const positions = [
            { top: '10%', left: '10%' },
            { top: '10%', right: '10%' },
            { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
            { bottom: '10%', left: '10%' },
            { bottom: '10%', right: '10%' }
        ];

        // Container for circles
        this.container.style.position = 'relative';

        positions.forEach((pos, idx) => {
            const group = document.createElement('div');
            Object.assign(group.style, pos);
            group.style.position = 'absolute';
            group.style.display = 'flex';
            group.style.gap = '10px';

            colors.forEach(color => {
                const circle = document.createElement('div');
                circle.style.width = '60px';
                circle.style.height = '60px';
                circle.style.borderRadius = '50%';
                circle.style.backgroundColor = color;
                circle.style.border = '2px solid rgba(255,255,255,0.2)';

                // Add text to check clarity
                circle.textContent = 'TEXT';
                circle.style.color = color === 'white' || color === 'lime' ? 'black' : 'white';
                circle.style.display = 'flex';
                circle.style.justifyContent = 'center';
                circle.style.alignItems = 'center';
                circle.style.fontWeight = 'bold';
                circle.style.fontSize = '12px';

                group.appendChild(circle);
            });

            this.container.appendChild(group);
        });
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
