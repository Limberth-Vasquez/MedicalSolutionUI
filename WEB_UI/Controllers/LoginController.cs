using Microsoft.AspNetCore.Mvc;
using WEB_UI.Models;

namespace WEB_UI.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(User user)
        {
            if (user.UserName == null || user.Password == null)
            {
                ViewBag.message = "Usuario y/o contraseña incorrectos";
                return View();
            }

            //Se debe hacer la validación con la base de datos.
            //HttpClient --: Api(user) --> Manager --> DAO -> DB

            user.FullName = "Limberth Vasquez Quesada";

            //Iniciar Session
            HttpContext.Session.SetString("user", user.FullName);


            return RedirectToAction("Index", "Home");
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }

    }
}
