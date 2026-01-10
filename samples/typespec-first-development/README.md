# TypeSpec-first API development with LLM

## Summary

This sample demonstrates TypeSpec-first API development workflow using Dev Proxy. TypeSpec is a language for describing APIs that can generate OpenAPI specs, client SDKs, and server stubs. Using Dev Proxy's TypeSpecGeneratorPlugin, you can generate TypeSpec files from your API traffic and use a local language model to enhance the generated output with clearer operation IDs and descriptions.

![Dev Proxy generating TypeSpec from API traffic](assets/screenshot.png)

## Compatibility

![Dev Proxy v2.0.0](https://aka.ms/devproxy/badge/v2.0.0)

## Contributors

- [GitHub Copilot](https://github.com/copilot)

## Version history

Version|Date|Comments
-------|----|--------
1.1|January 10, 2026|Updated to comply with repository guidelines
1.0|January 6, 2026|Initial release

## Minimal path to awesome

### Generate TypeSpec without LLM

1. Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/proxy-samples/tree/main/samples/typespec-first-development) then unzip it)
1. Start Dev Proxy with the basic configuration, specifying your API URL:

   ```console
   devproxy --config-file generate-typespec.json --urls-to-watch "https://api.contoso.com/*" --record
   ```

1. Use your application to issue API requests
1. Stop Dev Proxy by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>
1. Open the generated TypeSpec file in the current working folder

### Generate TypeSpec with LLM (enhanced descriptions)

> [!NOTE]
> Using a local language model requires running a language model host like Ollama on your machine. By default, this configuration uses the `llama3.2` model. Ensure the model is running before starting Dev Proxy.

1. Start your local language model host (e.g., Ollama with llama3.2)
1. Start Dev Proxy with the LLM configuration:

   ```console
   devproxy --config-file generate-typespec-llm.json --urls-to-watch "https://api.contoso.com/*" --record
   ```

1. Use your application to issue API requests
1. Stop Dev Proxy by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>
1. Open the generated TypeSpec file with AI-enhanced descriptions

## Features

Using this sample, you can use Dev Proxy to:

- **Generate TypeSpec from API traffic**: Record API requests and responses to automatically create TypeSpec files
- **Enhance TypeSpec with LLM**: Use a local language model to generate clearer operation IDs and descriptions
- **Kickstart TypeSpec-first development**: Use generated TypeSpec as a starting point for API design

### Without LLM

TypeSpec generated without LLM has basic operation names:

```typescript
@route("/posts")
namespace Posts {
  @get
  op operation1(): Post[];
  
  @get
  @route("/{id}")
  op operation2(@path id: int32): Post;
}
```

### With LLM

TypeSpec generated with LLM includes meaningful descriptions:

```typescript
@route("/posts")
namespace Posts {
  @doc("Retrieves a list of all posts")
  @get
  op getPosts(): Post[];
  
  @doc("Retrieves a specific post by its unique identifier")
  @get
  @route("/{id}")
  op getPostById(@path id: int32): Post;
}
```

### Complete workflow

The TypeSpec-first development workflow enables:

1. **Record API traffic** → Generate TypeSpec file
2. **TypeSpec** → Generate OpenAPI spec using TypeSpec compiler
3. **OpenAPI** → Generate client SDKs for multiple languages

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/proxy-samples/issues?q=label%3A%22sample%3A%20typespec-first-development%22) to see if anybody else is having the same issues.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/proxy-samples/issues/new).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/proxy-samples/issues/new).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://m365-visitor-stats.azurewebsites.net/SamplesGallery/pnp-devproxy-typespec-first-development)
