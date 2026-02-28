function AppointmentList() {

    this.InitView = () => {
        this.GetAppointments();
        this.LoadContextInformation();

        $('#btnCreate').click(() => {
            var view = new AppointmentList();
            view.RedirectCreatAppointment();
        });
    };

    this.GetAppointments = () => {
        $.ajax({
            url: API_URL_BASE + "/api/Appointment/GetAppointmentByPatientId?patientId=" + sessionStorage["patientId"],
            method: "GET",
            dataType: "json",
            contentType: "application/json;chartset=utf-8"
        }).done((response) => {
            if (response.result == "ok") {
                console.log("Estos fueron los datos que recibimos del API", response.data);
                gridOptions.api.setGridOption('rowData', response.data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema al cargar cita de paciente',
                    text: 'Hubo un problema al cargar cita de paciente ' + response.message
                });
            }
        }).fail((error) => {
            console.error("Error del ajax", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar cita',
                text: 'Hubo un error, contacte al administrador '
            });
        });
    };

    this.LoadContextInformation = () => {
        $('#txtPacientData').val(sessionStorage["PatientData"]);
    };

    this.RedirectCreatAppointment = () => {
        window.location = "/Appointments/CreateAppointment";
    };
}
$(document).ready(() => {
    let view = new AppointmentList();
    view.InitView();
});