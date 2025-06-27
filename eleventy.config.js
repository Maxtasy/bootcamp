import docTagPlugin from "./eleventy-plugins/doc-tag.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(docTagPlugin);

  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // Add a passthrough for all components (./components/{COMPONENT_NAME})
  eleventyConfig.addPassthroughCopy({
    components: true,
  });
}
