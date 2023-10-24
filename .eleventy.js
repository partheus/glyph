module.exports = function (eleventyConfig) {
    eleventyConfig.addCollection('post', function (collection) {
        return collection.getFilteredByGlob('src/posts/*.md').reverse();
    });

    eleventyConfig.addPassthroughCopy("src/css");
    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
