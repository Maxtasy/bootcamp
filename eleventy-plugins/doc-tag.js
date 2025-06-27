/**
 * Registers `{% doc %}...{% enddoc %}` custom tag in Eleventy
 * for documentation that doesn't output HTML
 */
export default function docTagPlugin(eleventyConfig) {
  // Register the {% doc %} paired tag
  eleventyConfig.addLiquidTag("doc", () => {
    return {
      parse(tagToken, remainingTokens) {
        this.tokens = [];

        while (remainingTokens.length) {
          const token = remainingTokens.shift();
          if (token.name === "enddoc") break;
          this.tokens.push(token);
        }
      },
      render: async () => "", // No HTML output
    };
  });

  // Prevent Liquid from complaining about unmatched {% enddoc %}
  eleventyConfig.addLiquidTag("enddoc", () => ({
    render: async () => "",
  }));
}
