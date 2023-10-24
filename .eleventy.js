module.exports = function (eleventyConfig) {
    // Add a collection of posts in reverse date order
    eleventyConfig.addCollection('post', function (collection) {
        return collection.getFilteredByGlob('src/posts/*.md').reverse();
    });

    // Create a custom "date" filter
    eleventyConfig.addFilter('date', function(value, format) {
        const date = new Date(value);
        if (isNaN(date)) {
            return value; // Return the original value if it's not a valid date
        }
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("CNAME");

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
