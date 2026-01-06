var builder = WebApplication.CreateBuilder(args);

// Configure HttpClient to use proxy from HTTPS_PROXY environment variable
builder.Services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");
});

var app = builder.Build();

app.MapGet("/", () => "Minimal .NET Aspire app using Dev Proxy. Call /posts to see the mocked response.");

app.MapGet("/posts", async (IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("ApiClient");
    var response = await client.GetAsync("/posts/1");
    
    // Get response headers to show Dev Proxy headers
    var headers = response.Headers
        .Where(h => h.Key.StartsWith("x-", StringComparison.OrdinalIgnoreCase))
        .ToDictionary(h => h.Key, h => string.Join(", ", h.Value));
    
    var content = await response.Content.ReadAsStringAsync();
    
    return Results.Ok(new
    {
        headers,
        content = System.Text.Json.JsonSerializer.Deserialize<object>(content)
    });
});

app.Run();
