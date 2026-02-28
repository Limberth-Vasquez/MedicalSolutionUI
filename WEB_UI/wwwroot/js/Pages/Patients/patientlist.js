function PatientList()
{
    this.InitView = () => {
        this.ListPatients();

        $('#btnVerCitas').click(() => {
            var view = new PatientList();
            view.ShowAppointments();
        });
    };

    this.GetPatientDetails = (patientDto) => {
        console.log("Paciente seleccionado", patientDto);
        $('#txtSocialSecId').val(patientDto.socialSecurityId);
        $('#txtName').val(patientDto.name);
        $('#txtLastName').val(patientDto.lastName);

        sessionStorage["patientId"] = patientDto.id;
        sessionStorage["PatientData"] = patientDto.socialSecurityId + " " + patientDto.name + " " + patientDto.lastName;
    };

    this.ListPatients = () => {
        $.ajax({
            url: API_URL_BASE + "/api/Patients/GetAll",
            method: "GET",
            dataType: "json",
            contentType: "application/json;chartset=utf-8"
        }).done((response) => {
            if (response.result == "ok") {
                console.log("Estos fueron los datos que recibimos del API", response.data);
                gridOptions.api.setGridOption('rowData', response.data);
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema al cargar pacientes',
                    text: 'Hubo un problema al carga pacientes ' + response.message
                });
            }
        }).fail((error) => {
            console.error("Error del ajax", error);
            swal.fire({
                icon: 'error',
                title: 'Error al cargar pacientes',
                text: 'Hubo un error ' + error
            });
        });
    };

    this.ShowAppointments = () => {
        window.location = "/Appointments/AppointmentList";
    };
}
$(document).ready(() => {
    let view = new PatientList();
    view.InitView();
});