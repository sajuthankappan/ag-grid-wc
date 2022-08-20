
/**
 * @typedef { import("ag-grid-community").GridOptions } GridOptions
 */

/**
 * 
 * @param {HTMLElement | ShadowRoot} rootElement 
 * @returns {GridOptions}
 */
export function getSelectableGridOptions(rootElement, columnDefs, rowData = []) {
  /** @type GridOptions */
  const gridOptions = {
    columnDefs,
    rowSelection: 'single',
    rowData,
    defaultColDef: { sortable: true },
    onRowDoubleClicked: (event) => {
      dispatchRowSelected(event.node.data, rootElement);
    },
    onRowSelected: (event) => {
      if (event.event) {
        if (event.node.isSelected()) {
          dispatchRowSelected(event.node.data, rootElement);
        }
      }
    },
  };

  return gridOptions;
}

/**
 * Disptaches row selected event
 * @param {String} sequence 
 * @param {HTMLElement | ShadowRoot} rootElement 
 */
export function dispatchRowSelected(sequence, rootElement) {
  const rowSelectedEvent = new CustomEvent('row-selected', {
    detail: sequence,
    bubbles: true,
    composed: true,
  });
  rootElement.dispatchEvent(rowSelectedEvent);
}

export function rupeesGetter(params) {
  return params.data[params.colDef.field] && params.data[params.colDef.field] / 100;
}

export function dateFormatter(params) {
  return new Date(params.value).toLocaleDateString()
}