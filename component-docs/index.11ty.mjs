import docs from "../component-docs.json" assert { type: "json" };

export const data = {
  title: "Component Reference",
  permalink: "/component-docs/index.html",
};

export function render() {
  return `
    <h1>Component Reference</h1>
    ${Object.entries(docs)
      .map(([name, info]) => {
        const params = Object.entries(info.params || {})
          .map(([param, { type, description }]) => {
            return `<tr><td><code>${param}</code></td><td><code>${type}</code></td><td>${description}</td></tr>`;
          })
          .join("");

        return `
        <section style="margin-bottom: 2rem;">
          <h2><code>${name}</code></h2>
          <p>${info.description || ""}</p>
          ${
            params
              ? `
            <table border="1" cellpadding="6" cellspacing="0">
              <thead>
                <tr><th>Param</th><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>${params}</tbody>
            </table>
          `
              : "<p><em>No parameters</em></p>"
          }
        </section>
      `;
      })
      .join("")}
  `;
}
