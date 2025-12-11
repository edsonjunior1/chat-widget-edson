import React, { useState } from 'react';
import { ChatWidget } from 'chat-widget-edson';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [isOnline, setIsOnline] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleMessageSent = (message: string) => {
    console.log('Message sent:', message);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Example - Chat Widget</h1>
        <p>This is an example of how to use ChatWidget as a React component</p>
      </header>

      <main className="app-main">
        <section className="config-panel">
          <h2>Widget Configuration</h2>
          
          <div className="config-group">
            <label htmlFor="api-key">
              API Key (OpenAI):
              <input
                id="api-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="config-input"
              />
            </label>
            <small>Leave empty to use mock mode</small>
          </div>

          <div className="config-group">
            <label htmlFor="primary-color">
              Primary Color:
              <input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="config-input"
              />
            </label>
          </div>

          <div className="config-group">
            <label htmlFor="position">
              Position:
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value as 'bottom-right' | 'bottom-left')}
                className="config-input"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </label>
          </div>

          <div className="config-group">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              Online
            </label>
          </div>

          <div className="config-group">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
              />
              Maintenance Mode
            </label>
          </div>
        </section>

        <section className="info-panel">
          <h2>How to Use</h2>
          <ol>
            <li>Configure the options above</li>
            <li>Click the chat button in the corner of the screen</li>
            <li>Type a message and send it</li>
            <li>See the ChatGPT response (or mock if no API key is provided)</li>
          </ol>

          <h3>Code Example</h3>
          <pre className="code-block">
{`import { ChatWidget } from 'chat-widget-edson';

function App() {
  return (
    <ChatWidget
      apiKey="your-api-key-here"
      primaryColor="#8b5cf6"
      position="bottom-right"
      isOnline={true}
      maintenanceMode={false}
      onMessageSent={(message) => {
        console.log('Message:', message);
      }}
    />
  );
}`}
          </pre>
        </section>
      </main>

      {/* Chat Widget Component */}
      <ChatWidget
        apiKey={apiKey || undefined}
        primaryColor={primaryColor}
        position={position}
        isOnline={isOnline}
        maintenanceMode={maintenanceMode}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default App;
