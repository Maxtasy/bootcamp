import fs from "fs/promises";
import path from "path";

const DOCS_FILE = "./component-docs.json";
const SNIPPET_OUTPUT = "./.vscode/liquid.code-snippets";

async function generateSnippets() {
  const raw = await fs.readFile(DOCS_FILE, "utf-8");
  const docs = JSON.parse(raw);
  const snippets = {};

  for (const [componentName, info] of Object.entries(docs)) {
    const bodyLines = [
      `{% render 'components/${componentName}/${componentName}',`,
    ];

    const paramEntries = Object.entries(info.params || {});
    paramEntries.forEach(([param, { type }], index) => {
      bodyLines.push(`  ${param}: \${${index + 1}:${type}},`);
    });

    bodyLines.push("%}");

    snippets[`Render ${componentName}`] = {
      prefix: `render-${componentName}`,
      body: bodyLines,
      description: info.description || `Render ${componentName}`,
    };
  }

  await fs.mkdir(path.dirname(SNIPPET_OUTPUT), { recursive: true });
  await fs.writeFile(SNIPPET_OUTPUT, JSON.stringify(snippets, null, 2));
  console.log(`✅ Snippets written to ${SNIPPET_OUTPUT}`);
}

generateSnippets().catch(console.error);
