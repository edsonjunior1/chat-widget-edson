# Chat Widget

An embeddable AI chat widget built with React and TypeScript. Integrate it into any website as a React component or via HTML script tag.

## Features

- **Customizable** - Colors, position, and behavior
- **Accessible** - WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Error Handling** - Robust error boundaries and API error handling
- **Persistent** - Messages saved automatically in localStorage
- **Responsive** - Works on desktop and mobile
- **TypeScript** - Fully typed

## Design & Architecture Decisions

This widget was designed to be **self-contained**, **framework-agnostic at runtime**, and **easy to embed with minimal code**, following patterns inspired by tools like Intercom and Chatbase.

Key decisions:

- **Single bundled output for HTML embedding** to avoid dependency conflicts with host applications.
- **Isolated styles and scoped CSS** to minimize interference with host website styles.
- **React + TypeScript** for maintainability, strong typing, and predictable component behavior.
- **Mock-first approach** for API interaction, allowing the widget to function without an API key during development and evaluation.
- **Local persistence via `localStorage`** to preserve conversation context across page reloads.
- **Graceful degradation** when offline or in maintenance mode.

These decisions prioritize ease of integration, developer experience, and predictable behavior in third-party environments.

## Installation

```bash
npm install chat-widget-edson
```

## Usage

### React Component

```tsx
import { ChatWidget } from "chat-widget-edson";

function App() {
  return (
    <ChatWidget
      apiKey="your-api-key"
      primaryColor="#8b5cf6"
      position="bottom-right"
      isOnline={true}
      maintenanceMode={false}
      onMessageSent={(message) => {
        console.log("Message sent:", message);
      }}
    />
  );
}
```

See `example/react-example/` for a complete React example.

### HTML Script Tag

```html
<script
  src="https://cdn.example.com/chat-widget/dist/widget.js"
  data-api-key="your-api-key"
  data-primary-color="#8b5cf6"
  data-position="bottom-right"
  data-online="true"
  data-maintenance="false"
></script>
```

## API Reference

### Props

| Prop              | Type                              | Default          | Description                                          |
| ----------------- | --------------------------------- | ---------------- | ---------------------------------------------------- |
| `apiKey`          | `string?`                         | -                | OpenAI API key. If not provided, uses mock responses |
| `primaryColor`    | `string`                          | `#8b5cf6`        | Primary color (hex, rgb, or CSS color name)          |
| `position`        | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position                                      |
| `isOnline`        | `boolean`                         | `true`           | Online/offline status                                |
| `maintenanceMode` | `boolean`                         | `false`          | Enable maintenance mode (disables message sending)   |
| `onMessageSent`   | `(message: string) => void`       | -                | Callback when a message is sent                      |

### HTML Attributes

| Attribute            | Type                              | Description           |
| -------------------- | --------------------------------- | --------------------- |
| `data-api-key`       | `string`                          | OpenAI API key        |
| `data-primary-color` | `string`                          | Primary color         |
| `data-position`      | `'bottom-right' \| 'bottom-left'` | Widget position       |
| `data-online`        | `'true' \| 'false'`               | Online/offline status |
| `data-maintenance`   | `'true' \| 'false'`               | Maintenance mode      |

## Events & Callbacks

The widget exposes lifecycle and interaction hooks to allow host applications to react to user behavior.

### React Callbacks

| Callback                         | Description                             |
| -------------------------------- | --------------------------------------- |
| `onMessageSent(message: string)` | Triggered when the user sends a message |
| `onOpen?()`                      | Fired when the widget is opened         |
| `onClose?()`                     | Fired when the widget is closed         |

Example:

````tsx
<ChatWidget
  onOpen={() => console.log('Widget opened')}
  onClose={() => console.log('Widget closed')}
  onMessageSent={(msg) => console.log('User sent:', msg)}
/>

## Development

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
````

## Testing

### Quick Test (HTML)

```bash
npm run build
npm run preview
```

### React Example

```bash
npm run build
cd example/react-example
npm install
npm run dev
```

**See [TESTING.md](./TESTING.md) for detailed testing instructions.**

## API Integration

The widget uses OpenAI's ChatGPT API. When `apiKey` is provided, it makes requests to:

```
POST https://api.openai.com/v1/chat/completions
```

If `apiKey` is not provided, the widget uses mock responses for development.

## Error Handling

The widget automatically handles:

- Timeout errors (30s limit)
- Network errors
- API errors (invalid key, quota exceeded, rate limits)
- Invalid messages (empty or >5000 characters)

## Accessibility

- ARIA labels on all interactive elements
- Full keyboard navigation (Tab, Enter, Escape)
- Screen reader compatible
- WCAG 2.1 Level AA compliant

## License

MIT
