# Chat Widget - Embeddable AI Chat Widget

Um widget de chat embeddable construído com React e TypeScript, pronto para ser integrado em qualquer website. Inclui suporte completo para acessibilidade (WCAG 2.1), tratamento robusto de erros, e uma API flexível.

## Características

- **Totalmente customizável** - Cores, posição e comportamento
- **Acessível** - Suporte completo para leitores de tela e navegação por teclado
- **Error Handling** - Error boundaries e tratamento robusto de erros
- **Persistência** - Mensagens salvas automaticamente no localStorage
- **Responsivo** - Funciona perfeitamente em desktop e mobile
- **Fácil integração** - Suporte para React e HTML puro
- **TypeScript** - Totalmente tipado para melhor DX

## Instalação

### Como NPM Package

\`\`\`bash
npm install chat-widget-edson
\`\`\`

### Uso em React

\`\`\`tsx
import { ChatWidget } from 'chat-widget-edson';

function App() {
  return (
    <ChatWidget
      apiKey="your-api-key"
      primaryColor="#8b5cf6"
      position="bottom-right"
      isOnline={true}
      maintenanceMode={false}
      onMessageSent={(message) => {
        console.log('Message sent:', message);
      }}
    />
  );
}
\`\`\`

**Exemplo Completo:** Veja o exemplo React completo em \`example/react-example/\` que demonstra como usar o componente em uma aplicação React real.

### Embed em HTML (Script Tag)

Adicione o script na sua página HTML:

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Página</title>
</head>
<body>
  <h1>Bem-vindo</h1>
  
  <!-- Chat Widget -->
  <script 
    src="https://cdn.example.com/chat-widget/dist/widget.js"
    data-api-key="your-api-key"
    data-primary-color="#8b5cf6"
    data-position="bottom-right"
    data-online="true"
    data-maintenance="false"
  ></script>
</body>
</html>
\`\`\`

## Build e Desenvolvimento

### Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

Isso gerará os arquivos em \`dist/\`:
- \`index.esm.js\` - Módulo ES
- \`index.cjs\` - CommonJS
- \`widget.js\` - Script embeddable (IIFE)
- \`index.d.ts\` - Definições TypeScript

### Testar Localmente

#### Teste com HTML (Embed)

1. Build o package:
\`\`\`bash
npm run build
\`\`\`

2. Use o arquivo de exemplo em \`example/index.html\` ou crie seu próprio HTML:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Teste Chat Widget</title>
</head>
<body>
  <h1>Teste do Chat Widget</h1>
  <script src="./dist/widget.js" data-api-key="sua-api-key"></script>
</body>
</html>
\`\`\`

3. Abra o arquivo em um servidor local (use \`npm run preview\` ou um servidor HTTP simples)

#### Teste com React

1. Build o package:
\`\`\`bash
npm run build
\`\`\`

2. Navegue até o exemplo React:
\`\`\`bash
cd example/react-example
npm install
npm run dev
\`\`\`

3. Abra o navegador em \`http://localhost:5173\`

## API Reference

### React Component Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`apiKey\` | \`string?\` | - | Chave da API para integração com backend. Se não fornecida, usa mock responses |
| \`primaryColor\` | \`string\` | \`#8b5cf6\` | Cor primária do widget (hex, rgb, ou nome de cor CSS) |
| \`position\` | \`'bottom-right' \\| 'bottom-left'\` | \`'bottom-right'\` | Posição do widget na tela |
| \`isOnline\` | \`boolean\` | \`true\` | Status online/offline do chat |
| \`maintenanceMode\` | \`boolean\` | \`false\` | Ativa modo de manutenção, desabilitando envio de mensagens |
| \`onMessageSent\` | \`(message: string) => void\` | - | Callback chamado quando uma mensagem é enviada |

### HTML Attributes (Script Tag)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| \`data-api-key\` | \`string\` | Chave da API para integração |
| \`data-primary-color\` | \`string\` | Cor primária (hex, rgb, ou nome de cor CSS) |
| \`data-position\` | \`'bottom-right' \\| 'bottom-left'\` | Posição do widget |
| \`data-online\` | \`'true' \\| 'false'\` | Status online/offline |
| \`data-maintenance\` | \`'true' \\| 'false'\` | Modo de manutenção |

## Customização

### Cores

O widget aceita qualquer cor CSS válida:

\`\`\`tsx
<ChatWidget primaryColor="#007bff" />
<ChatWidget primaryColor="rgb(0, 123, 255)" />
<ChatWidget primaryColor="blue" />
\`\`\`

### Posicionamento

\`\`\`tsx
<ChatWidget position="bottom-right" />
<ChatWidget position="bottom-left" />
\`\`\`

## Acessibilidade

O widget foi desenvolvido seguindo as diretrizes WCAG 2.1 Level AA:

- **ARIA Labels** - Todos os elementos interativos têm labels apropriados
- **Navegação por Teclado** - Suporte completo para navegação via teclado
  - \`Tab\` - Navegar entre elementos
  - \`Enter\` - Enviar mensagem
  - \`Escape\` - Fechar janela do chat
- **Leitores de Tela** - Compatível com NVDA, JAWS, VoiceOver
- **Contraste** - Cores seguem o mínimo de contraste 4.5:1
- **Focus Visible** - Indicadores de foco claros
- **Live Regions** - Anúncios dinâmicos para mudanças de estado

### Exemplo de Uso com Leitores de Tela

O widget anuncia automaticamente:
- Quando novas mensagens chegam
- Quando o status muda (online/offline)
- Quando ocorrem erros
- Quando o modo de manutenção está ativo

## Error Handling

O widget inclui tratamento robusto de erros:

### Error Boundary

Um Error Boundary captura erros de renderização e exibe uma UI de fallback:

\`\`\`tsx
import { ErrorBoundary } from 'chat-widget-edson';

<ErrorBoundary fallback={<CustomErrorUI />}>
  <ChatWidget />
</ErrorBoundary>
\`\`\`

### Tratamento de Erros de API

O widget trata automaticamente:

- **Timeout** - Requisições que excedem 30 segundos
- **Network Errors** - Problemas de conexão
- **API Errors** - Erros retornados pela API
- **Invalid Messages** - Mensagens vazias ou muito longas (>5000 caracteres)

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| \`INVALID_MESSAGE\` | Mensagem vazia ou inválida |
| \`MESSAGE_TOO_LONG\` | Mensagem excede 5000 caracteres |
| \`TIMEOUT\` | Requisição excedeu 30 segundos |
| \`NETWORK_ERROR\` | Erro de conexão |
| \`API_ERROR\` | Erro retornado pela API |
| \`INVALID_API_KEY\` | API key inválida ou expirada |
| \`INSUFFICIENT_QUOTA\` | Quota da API excedida |
| \`RATE_LIMIT\` | Limite de requisições excedido |
| \`UNKNOWN_ERROR\` | Erro não identificado |

### Exemplo de Tratamento de Erros

\`\`\`tsx
<ChatWidget
  apiKey="your-api-key"
  onMessageSent={(message) => {
    // Mensagem enviada com sucesso
  }}
/>
// Erros são automaticamente exibidos na interface do chat
\`\`\`

## Persistência de Dados

As mensagens são automaticamente salvas no \`localStorage\` e restauradas quando o widget é recarregado. Isso permite que os usuários mantenham o histórico de conversas mesmo após recarregar a página.

### Limpar Mensagens

\`\`\`typescript
// Nota: Esta função não está exportada atualmente
// As mensagens são gerenciadas internamente pelo widget
\`\`\`

## Integração com API

### Endpoint Esperado

Quando \`apiKey\` é fornecida, o widget faz requisições para:

\`\`\`
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer {apiKey}
Content-Type: application/json

{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "User message here"
    }
  ]
}
\`\`\`

### Resposta Esperada

\`\`\`json
{
  "choices": [
    {
      "message": {
        "content": "AI response here"
      }
    }
  ]
}
\`\`\`

### Modo Mock

Se \`apiKey\` não for fornecida, o widget usa respostas mock para desenvolvimento e testes.

## Responsividade

O widget é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop** - Janela fixa de 420px de largura
- **Mobile** - Ocupa toda a largura disponível (com margens)
- **Tablet** - Ajusta automaticamente

## Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| \`Tab\` | Navegar entre elementos |
| \`Enter\` | Enviar mensagem |
| \`Escape\` | Fechar janela do chat |
| \`Shift + Enter\` | Nova linha (se implementado) |

## Desenvolvimento

### Estrutura do Projeto

\`\`\`
src/
├── components/
│   ├── ChatWidget.tsx      # Componente principal
│   ├── ChatWindow.tsx      # Janela do chat
│   ├── MessageList.tsx     # Lista de mensagens
│   ├── MessageInput.tsx    # Input de mensagem
│   ├── StatusIndicator.tsx # Indicador de status
│   ├── ErrorBoundary.tsx   # Error boundary
│   └── Icons.tsx           # Componentes de ícones SVG
├── utils/
│   ├── api.ts              # Cliente API
│   └── storage.ts          # Persistência
├── types/
│   └── index.ts            # Definições TypeScript
├── styles/
│   └── widget.scss         # Estilos
└── embed.tsx               # Script de embed
\`\`\`

### Scripts Disponíveis

\`\`\`bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test:api     # Build e preview para testar API
npm run lint         # Linter
npm run type-check   # Verificação de tipos
\`\`\`

## Licença

MIT

## Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do email de suporte.