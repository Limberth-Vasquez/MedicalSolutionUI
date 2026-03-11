function CreateAppointment() {
    this.InitView = () => {
        $('#btnCreate').click(() => {
            let view = new CreateAppointment();
            view.SubmitCreateAppointment();
        });
        this.PopulateSpecialties();
    };

    this.PopulateSpecialties = () => {
        $.ajax({
            url: API_URL_BASE + "/api/RHConnector/GetAllSpecialties",
            method: "GET",
            dataType: "json",
            contentType: "application/json;chartset=utf-8"
        }).done((response) => {
            let select = $('#ddSpeciality');
            select.find('option').remove();

            for (let row in response) {
                select.append('<option value=' + response[row] + '>' + response[row] + '</option>');
            }

        }).fail((error) => {
            console.error("Error del ajax", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar especialidades',
                text: 'Hubo un error, contacte al administrador '
            });
        });
    };

    this.SubmitCreateAppointment = () => {
        let cita = {};
        cita.title = $('#txtTitle').val();
        cita.appointmentDate = $('#txtDate').val();
        cita.speciality = $('#ddSpeciality').find(':selected').val();
        cita.patientId = sessionStorage["patientId"];

        $.ajax({
            url: API_URL_BASE + "/api/Appointment/CrearCita",
            method: "POST",
            dataType: "json",
            contentType: "application/json;chartset=utf-8",
            hasContent: true,
            data: JSON.stringify(cita),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        }).done((response) => {
            if (response.result == "ok") {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: response.data,
                    timer: 2000
                }).then(() => {
                    //aca notificamos por correo al paciente que se ha creado la cita
                    let view = new CreateAppointment();
                    view.CommunicatePatient();

                    window.location = '/Appointments/AppointmentList';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }

        }).fail((error) => {
            console.error("Error del ajax", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear cita',
                text: 'Hubo un error, contacte al administrador '
            });
        });
    };

    this.CommunicatePatient = () => {
        $.ajax({
            url: API_URL_BASE + "/api/Communications/EnviarCorreo?emailAddress=" + "lvasquezq@ucenfotec.ac.cr", //sessionStorage["patientEmail"],
            method: "GET",
            dataType: "json",
            contentType: "application/json;chartset=utf-8"
        }).done((response) => {
            console.log("Correo enviado", response);
        }).fail((error) => {
            console.error("Error del ajax", error);
        });
    };
}

$(document).ready(() => {
    let view = new CreateAppointment();
    view.InitView();
});