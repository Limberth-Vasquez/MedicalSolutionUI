var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//Agregar la configuracion para acceder al session
builder.Services.AddHttpContextAccessor();

builder.Services.AddSession(session =>
{
    session.IdleTimeout = TimeSpan.FromSeconds(60);
    session.Cookie.HttpOnly = true;
    session.Cookie.IsEssential = false;
    session.Cookie.Name = "LIMBERTH-CLINIC-COOCKIE";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.UseSession();

app.Run();
