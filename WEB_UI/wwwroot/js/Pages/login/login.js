function LoginView()
{
    this.Validate = () => {
        let div = $('#validations');

        if (div.text() !== "")
        {
            Swal.fire({
                icon: 'error',
                text: div.text(),
                title: 'Error'
            });
        }
    };

}

$(document).ready(() => {
    let view = new LoginView();
    view.Validate();
});