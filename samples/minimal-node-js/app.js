const url = 'https://jsonplaceholder.typicode.com/posts/1';

console.log(`Fetching ${url}...`);
console.log(`Using proxy: ${process.env.HTTP_PROXY || process.env.HTTPS_PROXY || 'none'}\n`);

const response = await fetch(url);

console.log('Response headers:');
console.log(`  x-powered-by: ${response.headers.get('x-powered-by')}`);
console.log(`  x-mocked-by: ${response.headers.get('x-mocked-by')}`);

const data = await response.json();

console.log('\nResponse body:');
console.log(JSON.stringify(data, null, 2));
