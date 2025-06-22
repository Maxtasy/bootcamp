import { exec } from "child_process";
import chokidar from "chokidar";

const watcher = chokidar.watch("./components/**/*.liquid", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

function runDocs() {
  console.log("📦 Rebuilding docs and snippets...");
  exec("npm run docs", (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Error:", stderr);
    } else {
      console.log("✅ Updated docs and snippets");
    }
  });
}

watcher.on("change", runDocs);
watcher.on("add", runDocs);

console.log("👀 Watching for component changes...");
