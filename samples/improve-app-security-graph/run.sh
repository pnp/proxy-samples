# enable job control so that we can send SIGINT to Dev Proxy
set -m

log_file=devproxy.log

echo "Starting Dev Proxy..."

# start Dev Proxy in the background
# log Dev Proxy output to the log file
# log stdout and stderr to the file
./devproxy/devproxy --record > $log_file 2>&1 &

proxy_pid=$!

# wait for init
echo "Waiting for Dev Proxy to start..."
while true; do
  if grep -q "Recording" $log_file; then
    break
  fi
  sleep 1
done

# From: https://www.eliostruyf.com/playwright-microsoft-dev-proxy-github-actions/
# setup certificates
echo "Export the Dev Proxy's Root Certificate"
openssl pkcs12 -in ~/.config/dev-proxy/rootCert.pfx -clcerts -nokeys -out dev-proxy-ca.crt -passin pass:""

echo "Installing certutil..."
sudo apt install libnss3-tools

echo "Adding certificate to the NSS database for Chromium..."
mkdir -p $HOME/.pki/nssdb
certutil --empty-password -d $HOME/.pki/nssdb -N 
certutil -d sql:$HOME/.pki/nssdb -A -t "CT,," -n dev-proxy-ca.crt -i dev-proxy-ca.crt
echo "Certificate trusted."

echo "Running Playwright tests..."
npm test

# send SIGINT to Dev Proxy to close it gracefully
echo "Stopping Dev Proxy..."
kill -INT $proxy_pid

echo "Waiting for Dev Proxy to complete..."
while true; do
  if grep -q -e "DONE" -e "No requests to process" -e "An error occurred in a plugin" $log_file; then
    break
  fi
  sleep 1
done