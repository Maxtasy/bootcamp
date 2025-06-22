import docTagPlugin from "./eleventy-plugins/doc-tag.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(docTagPlugin);

  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // Add a passthrough for all .js files inside ./components/{COMPONENT_NAME}
  eleventyConfig.addPassthroughCopy({
    "components/*/*.js": true,
  });
  // Add a passthrough for all .css files inside ./components/{COMPONENT_NAME}
  eleventyConfig.addPassthroughCopy({
    "components/*/*.css": true,
  });
}
