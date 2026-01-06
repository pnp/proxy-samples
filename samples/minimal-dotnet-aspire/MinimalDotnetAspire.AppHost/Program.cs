using DevProxy.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

// Add the API service
var apiService = builder.AddProject<Projects.MinimalDotnetAspire_ApiService>("apiservice")
    .WithExternalHttpEndpoints();

// Add Dev Proxy as an executable resource
var devProxy = builder.AddDevProxyExecutable("devproxy")
    .WithConfigFile("../.devproxy/devproxyrc.json")
    .WithUrlsToWatch(() => ["https://jsonplaceholder.typicode.com/*"]);

// Configure API service to use Dev Proxy
apiService
    .WithEnvironment("HTTPS_PROXY", devProxy.GetEndpoint(DevProxyResource.ProxyEndpointName))
    .WaitFor(devProxy);

builder.Build().Run();
