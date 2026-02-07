import BaseTest from './BaseTest.js';

export default class GammaTest extends BaseTest {
    constructor(container) {
        super(container);
    }

    start() {
        this.container.style.backgroundColor = '#808080';
        this.render();
        this.showGuide(this.t('guide_gamma'));
    }

    render() {
        const wrapper = this.createElement('div', 'gamma-wrapper');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.height = '100%';
        wrapper.style.gap = '20px';

        const gammas = [1.8, 2.2, 2.6];

        gammas.forEach(g => {
            const box = document.createElement('div');
            box.style.width = '300px';
            box.style.height = '300px';
            box.style.background = 'white'; // Placeholder for complex pattern
            box.style.position = 'relative';
            box.style.display = 'flex';
            box.style.justifyContent = 'center';
            box.style.alignItems = 'center';
            box.style.flexDirection = 'column';

            // Create a pattern using CSS repeating-linear-gradient for "50% gray" visual mix
            // vs a solid gray block of specific brightness.

            // Target brightness for Gamma G at 50% signal is: 0.5 ^ G
            const targetLum = Math.pow(0.5, g);
            const val = Math.round(targetLum * 255);

            // Striped Background (visual 50%)
            const bgPattern = document.createElement('div');
            bgPattern.style.position = 'absolute';
            bgPattern.style.top = '0';
            bgPattern.style.left = '0';
            bgPattern.style.width = '100%';
            bgPattern.style.height = '100%';
            // 1px black, 1px white horizontal stripes
            bgPattern.style.backgroundImage = 'repeating-linear-gradient(to bottom, black 0px, black 1px, white 1px, white 2px)';
            box.appendChild(bgPattern);

            // Inner Solid Box
            const innerBox = document.createElement('div');
            innerBox.style.width = '100px';
            innerBox.style.height = '100px';
            innerBox.style.backgroundColor = `rgb(${val}, ${val}, ${val})`;
            innerBox.style.position = 'relative';
            innerBox.style.zIndex = '10';
            box.appendChild(innerBox);

            const label = document.createElement('div');
            label.textContent = `Gamma ${g}`;
            label.style.marginTop = '20px';
            label.style.fontWeight = 'bold';
            label.style.color = 'black';
            label.style.backgroundColor = 'white';
            label.style.padding = '5px';
            label.style.position = 'relative';
            label.style.zIndex = '10';
            box.appendChild(label);

            wrapper.appendChild(box);
        });
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
