using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class PatientsController : Controller
    {
        public IActionResult PatientList()
        {
            return View();
        }
    }
}
