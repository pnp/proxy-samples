# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///

import requests

# Configure the proxy
proxies = {
    "http": "http://127.0.0.1:8000",
    "https": "http://127.0.0.1:8000"
}

# Make API request through Dev Proxy
response = requests.get(
    "https://jsonplaceholder.typicode.com/posts/1",
    proxies=proxies,
    verify=False
)

print(f"Status: {response.status_code}")
print(f"Headers:")
for key, value in response.headers.items():
    print(f"  {key}: {value}")
print(f"Body: {response.json()}")
