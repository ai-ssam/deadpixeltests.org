import BaseTest from './BaseTest.js';

export default class ScreenAdjustTest extends BaseTest {
    constructor(container) {
        super(container);
    }

    start() {
        this.container.style.backgroundColor = 'black';
        this.render();
        this.showGuide(this.t('d_screenAdjust'));
    }

    render() {
        // SVG Grid Pattern
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        // Border rect
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", "10");
        rect.setAttribute("y", "10");
        rect.setAttribute("width", "calc(100% - 20px)");
        rect.setAttribute("height", "calc(100% - 20px)");
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke", "white");
        rect.setAttribute("stroke-width", "4");
        svg.appendChild(rect);

        // Center Cross
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "50%");
        line1.setAttribute("y1", "0");
        line1.setAttribute("x2", "50%");
        line1.setAttribute("y2", "100%");
        line1.setAttribute("stroke", "white");
        line1.setAttribute("stroke-width", "2");
        svg.appendChild(line1);

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "0");
        line2.setAttribute("y1", "50%");
        line2.setAttribute("x2", "100%");
        line2.setAttribute("y2", "50%");
        line2.setAttribute("stroke", "white");
        line2.setAttribute("stroke-width", "2");
        svg.appendChild(line2);

        // Circles
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50%");
        circle.setAttribute("cy", "50%");
        circle.setAttribute("r", "25%");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);

        this.container.appendChild(svg);
    }

    showGuide(text) {
        const guide = document.getElementById('test-guide');
        if (guide) guide.textContent = text;
    }
}
