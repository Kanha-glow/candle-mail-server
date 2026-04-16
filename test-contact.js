// IMPORTANT: Set BACKEND_IDENTIFIER environment variable before running
// Usage: $env:BACKEND_IDENTIFIER="your-identifier"; node test-contact.js

const testData = {
  name: "test",
  email: "test@test.com", 
  message: "test message",
  identifier: process.env.BACKEND_IDENTIFIER || "YOUR_IDENTIFIER_HERE"
};

fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:9002'
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  return response.json();
})
.then(data => {
  console.log('Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});
