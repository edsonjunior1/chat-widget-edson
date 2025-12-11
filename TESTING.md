# Testing Guide

Quick guide to test the chat widget locally.

## Option 1: HTML Embed Test (Simplest)

### Step 1: Build the Package

```bash
npm run build
```

This generates the `dist/widget.js` file needed for HTML embedding.

### Step 2: Test with HTML

You have two options:

#### Option A: Use the Generated Test HTML

```bash
npm run build
npm run preview
```

This will:
- Build the package
- Generate `dist/index.html` with the widget
- Start a preview server
- Open your browser automatically

#### Option B: Use the Example HTML

1. Open `example/index.html` in your browser
2. Make sure `dist/widget.js` exists (run `npm run build` first)
3. Update the API key in the HTML if needed:
   ```html
   <script 
     src="./dist/widget.js"
     data-api-key="YOUR_API_KEY_HERE"
     ...
   ></script>
   ```

**Note:** If you get CORS errors when opening the HTML file directly, use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000

# Then open: http://localhost:8000/example/index.html
```

## Option 2: React Component Test (Recommended)

### Step 1: Build the Main Package

```bash
npm run build
```

### Step 2: Navigate to React Example

```bash
cd example/react-example
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Development Server

```bash
npm run dev
```

This will:
- Start Vite dev server
- Open `http://localhost:5173` in your browser
- Show a full React app with the chat widget
- Allow you to configure the widget in real-time

## Testing Without API Key

The widget works in **mock mode** if you don't provide an API key:

- **HTML:** Leave `data-api-key` empty or remove it
- **React:** Don't pass `apiKey` prop or pass `undefined`

In mock mode, the widget will return simulated responses for testing.

## Testing With API Key

### Option 1: Environment Variable

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

The build script will automatically use this when generating test HTML.

### Option 2: Direct in Code

**For HTML:**
```html
<script 
  src="./dist/widget.js"
  data-api-key="sk-your-actual-api-key-here"
  ...
></script>
```

**For React:**
```tsx
<ChatWidget apiKey="sk-your-actual-api-key-here" />
```

## Quick Test Commands

```bash
# Build and preview HTML test
npm run test:api

# Build only
npm run build

# Preview built files
npm run preview

# React example (after building main package)
cd example/react-example && npm install && npm run dev
```

## Troubleshooting

### Widget Not Appearing

1. Make sure you ran `npm run build` first
2. Check browser console for errors (F12)
3. Verify the script path is correct

### CORS Errors

- Use a local server instead of opening HTML directly
- Use `npm run preview` or a simple HTTP server

### API Key Errors

- Check if the API key is valid
- Verify it's correctly formatted (starts with `sk-`)
- Check browser console for specific error messages

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Check Node.js version (should be 18+)
- Try deleting `node_modules` and `dist`, then reinstall

## What to Test

1. **Widget Appearance:** Button appears in corner
2. **Open/Close:** Click button to open/close chat window
3. **Send Message:** Type and send a message
4. **Responses:** Verify you get responses (mock or real API)
5. **Persistence:** Reload page - messages should be saved
6. **Keyboard:** Test Tab, Enter, Escape keys
7. **Mobile:** Test on mobile device or responsive mode
