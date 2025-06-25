import glob from "fast-glob";
import fs from "fs/promises";
import path from "path";

const COMPONENT_DIR = "./components";
const OUTPUT_FILE = "./component-docs.json";

const DOC_BLOCK_REGEX = /{%\s*doc\s*%}([\s\S]*?){%\s*enddoc\s*%}/i;
const PARAM_REGEX = /@param\s+{([^}]+)}\s+(\[?\w+\]?)\s*-\s*(.*)/g;

async function extractDocs() {
  // Updated glob pattern: match any .liquid file in any subfolder of components
  const files = await glob(`${COMPONENT_DIR}/*/*.liquid`);
  const docs = {};

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8");
    const match = content.match(DOC_BLOCK_REGEX);

    if (!match) continue;

    const docContent = match[1].trim();
    const lines = docContent.split("\n").map((line) => line.trim());

    // Extract the folder name as the component name instead of file basename
    // Because the file name is {COMPONENT_NAME}.liquid inside the folder {COMPONENT_NAME}
    const name = path.basename(path.dirname(filePath));

    const description = lines.find((line) => !line.startsWith("@param")) || "";
    const params = {};

    let paramMatch;
    while ((paramMatch = PARAM_REGEX.exec(docContent)) !== null) {
      const [, type, rawName, desc] = paramMatch;

      const optional = rawName.startsWith("[") && rawName.endsWith("]");
      const name = optional ? rawName.slice(1, -1) : rawName;

      params[name] = {
        type: type.trim(),
        description: desc.trim(),
        optional,
      };
    }

    docs[name] = { description, params };
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(docs, null, 2));
  console.log(`✅ Extracted docs for ${Object.keys(docs).length} components`);
}

extractDocs().catch((err) => {
  console.error("❌ Failed to extract docs:", err);
});
