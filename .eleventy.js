const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
    // Add a collection of posts in reverse date order
    eleventyConfig.addCollection('post', function (collection) {
        return collection.getFilteredByGlob('src/posts/*.md').reverse();
    });

    // Set template formats
    eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

    // // Add support for footnotes
    eleventyConfig.setLibrary("md", markdownIt(
        {
            html: true, // Enable HTML tags in source
            breaks: true,  // Convert '\n' in paragraphs into <br>
            linkify: true // Autoconvert URL-like text to links
        }
    ).use(markdownItFootnote));


    // Create a custom "date" filter
    eleventyConfig.addFilter('date', function (value, format) {
        const date = new Date(value);
        if (isNaN(date)) {
            return value; // Return the original value if it's not a valid date
        }
        return date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
    });

    // Create a slug from a string
    eleventyConfig.addFilter('customPermalink', (page) => {
        const year = page.date ? page.date.getFullYear() : new Date().getFullYear();
        const fileSlug = page.fileSlug || '';

        return `/${year}/posts/${fileSlug}/`;
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("public.asc");
    eleventyConfig.addPassthroughCopy(".nojekyll");
    eleventyConfig.addPassthroughCopy("garden-social.webp");
    eleventyConfig.addPassthroughCopy({"favicon.ico": "/favicon.ico"});

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
