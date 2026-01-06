using var client = new HttpClient();

Console.WriteLine("Fetching https://jsonplaceholder.typicode.com/posts/1...\n");

var response = await client.GetAsync("https://jsonplaceholder.typicode.com/posts/1");

Console.WriteLine($"Status: {(int)response.StatusCode} {response.StatusCode}");
Console.WriteLine("\nHeaders:");
foreach (var header in response.Headers)
{
    Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
}

var content = await response.Content.ReadAsStringAsync();
Console.WriteLine($"\nBody:\n{content}");
