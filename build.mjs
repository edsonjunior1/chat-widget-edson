import { build } from "vite";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Função para injetar CSS nos arquivos JavaScript
function injectCssIntoJs() {
  const cssPath = join(__dirname, "dist", "chat-widget-edson.css");
  const esmPath = join(__dirname, "dist", "index.esm.js");
  const cjsPath = join(__dirname, "dist", "index.cjs");

  if (existsSync(cssPath)) {
    const cssContent = readFileSync(cssPath, "utf-8");
    const cssInjectionCode = `(function(){if(typeof document!=="undefined"){var style=document.createElement("style");style.textContent=${JSON.stringify(cssContent)};document.head.appendChild(style);}})();`;

    // Injetar no ESM
    if (existsSync(esmPath)) {
      const esmContent = readFileSync(esmPath, "utf-8");
      writeFileSync(esmPath, cssInjectionCode + "\n" + esmContent, "utf-8");
      console.log("✅ CSS injetado em index.esm.js");
    }

    // Injetar no CJS
    if (existsSync(cjsPath)) {
      const cjsContent = readFileSync(cjsPath, "utf-8");
      writeFileSync(cjsPath, cssInjectionCode + "\n" + cjsContent, "utf-8");
      console.log("✅ CSS injetado em index.cjs");
    }

    // Remover o arquivo CSS (não é mais necessário)
    // Não vamos remover para manter compatibilidade, mas podemos comentar isso
    // execSync(`rm ${cssPath}`);
  }
}

console.log("🔨 Building library...");
await build({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": "{}",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "ChatWidget",
      fileName: (format) => (format === "cjs" ? "index.cjs" : "index.esm.js"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
  },
});

// Injetar CSS nos bundles JavaScript
injectCssIntoJs();

console.log("🔨 Building embed widget...");
await build({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": "{}",
    global: "window",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/embed.tsx"),
      name: "ChatWidgetEmbed",
      fileName: () => "widget.js",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {},
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: false,
  },
});

// Injetar CSS no widget.js também
const widgetCssPath = join(__dirname, "dist", "chat-widget-edson.css");
const widgetJsPath = join(__dirname, "dist", "widget.js");
if (existsSync(widgetCssPath) && existsSync(widgetJsPath)) {
  const cssContent = readFileSync(widgetCssPath, "utf-8");
  const cssInjectionCode = `(function(){if(typeof document!=="undefined"){var style=document.createElement("style");style.textContent=${JSON.stringify(cssContent)};document.head.appendChild(style);}})();`;
  const widgetContent = readFileSync(widgetJsPath, "utf-8");
  writeFileSync(widgetJsPath, cssInjectionCode + "\n" + widgetContent, "utf-8");
  console.log("✅ CSS injetado em widget.js");
}

console.log("📝 Generating TypeScript declarations...");
try {
  execSync("tsc --project tsconfig.build.json", {
    stdio: "inherit",
    cwd: __dirname,
  });

  // Copiar e limpar o index.d.ts para a raiz do dist
  const srcIndexDts = join(__dirname, "dist", "src", "index.d.ts");
  const distIndexDts = join(__dirname, "dist", "index.d.ts");

  if (existsSync(srcIndexDts)) {
    let content = readFileSync(srcIndexDts, "utf-8");
    // Remover a linha que importa o SCSS
    content = content.replace(/^import ['"].*\.scss['"];?\s*\n?/gm, "");
    writeFileSync(distIndexDts, content, "utf-8");
    console.log("✅ index.d.ts criado na raiz do dist");
  }
} catch (error) {
  console.warn("⚠️  Erro ao gerar tipos TypeScript:", error.message);
}

console.log("📄 Generating test HTML...");
try {
  execSync("node scripts/generate-test-html.js", {
    stdio: "inherit",
    cwd: __dirname,
  });
} catch (error) {
  console.warn("⚠️  Erro ao gerar HTML de teste:", error.message);
}

console.log("✅ Build completo!");
