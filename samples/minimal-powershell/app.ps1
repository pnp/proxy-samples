#!/usr/bin/env pwsh

# Minimal PowerShell script demonstrating Dev Proxy usage
# Fetches a post from JSONPlaceholder API through Dev Proxy

$proxyUrl = "http://127.0.0.1:8000"
$apiUrl = "https://jsonplaceholder.typicode.com/posts/1"

Write-Host "Fetching from $apiUrl through Dev Proxy..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Proxy $proxyUrl
    
    Write-Host "`nResponse:" -ForegroundColor Green
    $response | ConvertTo-Json
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
