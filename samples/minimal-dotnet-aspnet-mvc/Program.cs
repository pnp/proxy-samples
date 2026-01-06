var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
