/**
 * Registers `{% doc %}...{% enddoc %}` custom tag in Eleventy
 * for documentation that doesn't output HTML
 */
export default function docTagPlugin(eleventyConfig) {
  // Create a paired tag: {% doc %}...{% enddoc %}
  eleventyConfig.addLiquidTag("doc", function (liquidTagToken) {
    let content = "";

    return {
      parse(tagToken, remainingTokens) {
        this.tokens = [];

        let token;
        while ((token = remainingTokens.shift())) {
          if (token.name === "enddoc") break;
          this.tokens.push(token);
        }
      },

      async render(scope, hash) {
        // Ignore content — documentation only
        return "";
      },
    };
  });

  // Register the paired end tag to avoid errors
  eleventyConfig.addLiquidTag("enddoc", () => ({
    render: async () => "",
  }));
}
