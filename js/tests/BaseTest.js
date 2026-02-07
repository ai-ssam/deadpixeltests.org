/**
 * Base Test Class
 * All test modules should extend this class.
 */
export default class BaseTest {
    constructor(container) {
        this.container = container;
        this.elements = [];
    }

    /**
     * Called when test starts.
     * Override this to render content and set up event listeners.
     */
    start() {
        console.warn('start() method not implemented');
    }

    /**
     * Called when test stops.
     * Override to remove specific listeners if needed.
     * Elements added to this.elements are automatically removed.
     */
    cleanup() {
        this.container.innerHTML = '';
        this.elements = [];
        // Override to remove global listeners (like keydown)
    }

    /**
     * Helper to get translated string
     */
    t(key) {
        if (window.app && window.app.i18n) {
            return window.app.i18n.t(key);
        }
        return key;
    }

    /**
     * Helper to create an element and append to container
     */
    createElement(tag, className, text = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        this.container.appendChild(el);
        this.elements.push(el);
        return el;
    }
}
