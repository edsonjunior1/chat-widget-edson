import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Read API key from .env file (never use in production/publication)
function getApiKey() {
  // ALWAYS use placeholder for publication builds
  // The key should only be used locally for testing
  const isPublishing = process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'prepublishOnly';
  
  if (isPublishing) {
    console.log('INFO: Using placeholder API key for build (publication mode)');
    return 'YOUR_API_KEY_HERE';
  }

  const envPath = resolve(rootDir, '.env');
  
  if (!existsSync(envPath)) {
    console.warn('WARNING: .env file not found. Using placeholder.');
    return 'YOUR_API_KEY_HERE';
  }

  try {
    const envContent = readFileSync(envPath, 'utf-8');
    const apiKeyMatch = envContent.match(/^OPENAI_API_KEY=(.+)$/m);
    
    if (apiKeyMatch && apiKeyMatch[1]) {
      const apiKey = apiKeyMatch[1].trim();
      if (apiKey && apiKey !== 'sk-proj-your-api-key-here') {
        console.log('SUCCESS: API key found in .env (local development only)');
        return apiKey;
      }
    }
  } catch (error) {
    console.warn('WARNING: Error reading .env:', error.message);
  }

  console.warn('WARNING: API key not found in .env. Using placeholder.');
  return 'YOUR_API_KEY_HERE';
}

// Generate test HTML
function generateTestHTML(apiKey) {
  const hasApiKey = apiKey !== 'YOUR_API_KEY_HERE';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Widget Test - ChatGPT</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
      line-height: 1.6;
      background: #f5f5f5;
    }
    h1 { color: #333; }
    .demo-section {
      margin: 40px 0;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .success {
      background: #d1e7dd;
      border: 1px solid #0f5132;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
  <h1>Chat Widget Test with ChatGPT</h1>
  
  ${!hasApiKey ? `
  <div class="warning">
    <strong>IMPORTANT:</strong> 
    <ol>
      <li>Create a <code>.env</code> file in the project root</li>
      <li>Add: <code>OPENAI_API_KEY=your-api-key-here</code></li>
      <li>Run <code>npm run build</code> again</li>
    </ol>
  </div>
  ` : `
  <div class="success">
    <strong>API Key configured!</strong> The widget is ready to test with the ChatGPT API.
  </div>
  `}
  
  <div class="demo-section">
    <h2>Widget Configuration</h2>
    <ul>
      <li><strong>API:</strong> ChatGPT (OpenAI GPT-3.5-turbo)</li>
      <li><strong>Position:</strong> bottom-right</li>
      <li><strong>Status:</strong> Online</li>
      <li><strong>Primary Color:</strong> #8b5cf6</li>
      <li><strong>API Key:</strong> ${hasApiKey ? 'Configured' : 'Not configured'}</li>
    </ul>
  </div>

  <div class="demo-section">
    <h2>How to Test</h2>
    <ol>
      <li>Click the chat button in the bottom right corner</li>
      <li>Type a message (e.g., "Hello, how are you?" or "Explain what React is")</li>
      <li>Press Enter or click the send button</li>
      <li>Wait for the ChatGPT response (may take a few seconds)</li>
      <li>Check the browser console (F12) to see logs and possible errors</li>
    </ol>
  </div>

  <div class="demo-section">
    <h2>Verifying if It's Working</h2>
    <ul>
      <li><strong>Success:</strong> You receive a response from ChatGPT</li>
      <li><strong>API Key Error:</strong> Check if the key is correct in the .env file</li>
      <li><strong>CORS Error:</strong> Normal in local development</li>
      <li><strong>Timeout:</strong> The request may take time - wait up to 60 seconds</li>
    </ul>
  </div>

  <!-- Chat Widget Embed -->
  <script 
    src="./widget.js"
    data-api-key="${apiKey}"
    data-primary-color="#8b5cf6"
    data-position="bottom-right"
    data-online="true"
    data-maintenance="false"
  ></script>
</body>
</html>`;
}

// Generate HTML file
const apiKey = getApiKey();
const htmlContent = generateTestHTML(apiKey);
const outputPath = resolve(rootDir, 'dist/index.html');

writeFileSync(outputPath, htmlContent, 'utf-8');
console.log(`SUCCESS: index.html file created in dist/ with API key ${apiKey !== 'YOUR_API_KEY_HERE' ? '(configured)' : '(placeholder)'}`);
