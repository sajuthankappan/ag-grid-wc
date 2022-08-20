import { Grid } from "ag-grid-community";
import mainCss from './saju-ag-grid.css';

class SajuAgGrid extends HTMLElement {
  /** @type {import("ag-grid-community").GridOptions} */
  #options;
  /** @type {HTMLElement} */
  #gridElement;

  static get observedAttributes() {
    return ['options', 'data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#initStyles(this.shadowRoot);

    this.#gridElement = document.createElement('div');
    this.#gridElement.className = 'ag-theme-alpine saju-ag-grid-height';
    this.shadowRoot.appendChild(this.#gridElement);
  }

  async #initStyles(renderRoot) {
    const sheet = new CSSStyleSheet();
    await sheet.replace(mainCss);
    renderRoot.adoptedStyleSheets = [sheet];
  }


  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case 'options':
          if (!newVal) return;
          this.options = JSON.parse(newVal);
          break;

        case 'data':
          if (!newVal) return;
          this.data = JSON.parse(newVal);
          break;

        default:
          break;
      }
    }
  }

  set options(value) {
    if (!value) return;

    this.#options = value;
    const grid = new Grid(this.#gridElement, this.#options);
  }

  get options() {
    return this.#options;
  }

  set data(value) {
    if (!value) return;

    this.#options?.api.setRowData(value);
    // this.sizeColumns();
  }

  sizeColumns() {
    if (this.#isDesktop()) {
      this.#options?.api.sizeColumnsToFit();
    } else {
      // this.#options?.columnApi.autoSizeAllColumns(false);  
      this.#options?.api.sizeColumnsToFit();
    }
  }

  #isDesktop() {
    return window?.screen?.width > 1024;
  }
}

customElements.define('saju-ag-grid', SajuAgGrid);
