#!/bin/bash

# enable job control so that we can send SIGINT to Dev Proxy
set -m

log_file=devproxy.log
config_file=${1:-.devproxy/devproxyrc.json}
start_time=$SECONDS

echo "Using config file: $config_file"

echo "Ensuring Dev Proxy rootCert folder..."
mkdir -p ~/.config/dev-proxy/rootCert

echo "Starting Dev Proxy..."

# start Dev Proxy in the background
# log Dev Proxy output to the log file
# log stdout and stderr to the file
./devproxy/devproxy --config-file "$config_file" --record > $log_file 2>&1 &

proxy_pid=$!

echo "Waiting for Dev Proxy to start..."
while true; do
  if grep -q "Listening on 127.0.0.1:8000" $log_file; then
    break
  fi
  if grep -q "Recording" $log_file; then
    break
  fi
  # timeout after 60 seconds
  if [ $((SECONDS - start_time)) -gt 60 ]; then
    echo "Timeout waiting for Dev Proxy to start"
    cat $log_file
    exit 1
  fi
  sleep 1
done

echo "Dev Proxy started successfully!"

# export the Dev Proxy's Root Certificate
echo "Exporting the Dev Proxy's Root Certificate..."
openssl pkcs12 -in ~/.config/dev-proxy/rootCert.pfx -clcerts -nokeys -out dev-proxy-ca.crt -passin pass:""

# install root certificate
echo "Installing the Dev Proxy's Root Certificate..."
sudo cp dev-proxy-ca.crt /usr/local/share/ca-certificates/

# update CA certificates
echo "Updating the CA certificates..."
sudo update-ca-certificates

# set proxy environment variables
export http_proxy=http://127.0.0.1:8000
export https_proxy=http://127.0.0.1:8000

echo "Running API tests..."

# Add your test commands here
# Example:
# npm test
# dotnet test
# python -m pytest

# For demonstration, making sample curl requests
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/customers || true
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/customers/1 || true
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/orders || true
curl -ikx http://127.0.0.1:8000 https://api.contoso.com/orders/1 || true

# stop Dev Proxy
echo "Stopping Dev Proxy..."
curl -s -X POST http://localhost:8897/proxy/stop || kill -INT $proxy_pid

stop_time=$SECONDS
echo "Waiting for Dev Proxy to complete..."
while true; do
  if grep -q -e "DONE" -e "No requests to process" -e "An error occurred in a plugin" $log_file; then
    break
  fi
  # timeout after 60 seconds
  if [ $((SECONDS - stop_time)) -gt 60 ]; then
    echo "Timeout waiting for Dev Proxy to complete"
    cat $log_file
    exit 1
  fi
  sleep 1
done

echo "Dev Proxy completed!"
echo ""
echo "Generated reports:"
ls -la *Reporter* 2>/dev/null || echo "No reports generated"
