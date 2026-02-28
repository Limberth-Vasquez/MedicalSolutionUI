const columnDefinitions = [
    { field: "appointmentDate", headerName: "Fecha" },
    { field: "title", headerName: "Titulo" },
    { field: "speciality", headerName: "Especialidad" }
];

const gridOptions = {
    columnDefs: columnDefinitions,
    rowData: [],
    rowSelection: 'single',

    // defaults
    defaultColDef: { sortable: true, filter: true },

    //Events
    onGridReady: (params) => {
        gridOptions.api = params.api;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGridAppointments');
    agGrid.createGrid(gridDiv, gridOptions);
});