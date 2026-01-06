using Microsoft.AspNetCore.Mvc;

namespace MinimalDotnetAspnetMvc.Controllers;

public class HomeController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public HomeController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IActionResult> Index()
    {
        var client = _httpClientFactory.CreateClient("ApiClient");
        var response = await client.GetStringAsync("/posts/1");
        
        ViewBag.ApiResponse = response;
        return View();
    }
}
