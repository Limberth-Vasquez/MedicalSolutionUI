using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class AppointmentsController : Controller
    {
        public IActionResult AppointmentList()
        {
            return View();
        }
        public IActionResult CreateAppointment()
        {
            return View();
        }
    }
}
