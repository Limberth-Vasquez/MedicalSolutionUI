const columnDefinitions = [
    { field: "socialSecurityId", headerName: "Social Sec. Id" },
    { field: "name", headerName: "Nombre" },
    { field: "lastName", headerName: "Apellido" }
];

const gridOptions = {
    columnDefs: columnDefinitions,
    rowData: [],
    rowSelection: 'single',

    // defaults
    defaultColDef: { sortable: true, filter: true },

    //Events
    onRowDoubleClicked: params => {
        ProcessDoubleClick(params);
    },
    onGridReady: (params) => {
        gridOptions.api = params.api;
    }
};

function ProcessDoubleClick(params) {
    let view = new PatientList();
    view.GetPatientDetails(params.data);
}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    agGrid.createGrid(gridDiv, gridOptions);
});