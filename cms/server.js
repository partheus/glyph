const express = require('express');
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const app = express();

// Sanitize the title
function sanitizeTitle(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
        .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
}

// Serve static files from the "cms" directory
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/create-post', (req, res) => {
    let { title, description, date, content } = req.body;

    // Check if the title is empty
    if (!title) {
        res.status(400).json({ message: 'Title is required' });
        return;
    }

    // sanitize the title
    title = sanitizeTitle(title);

    const data = {
        title,
        description,
        date
    };

    const markdown = matter.stringify(data, content);

    const postsDir = path.join(__dirname, '../src/posts');

    if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(postsDir, `${title}.md`), markdown);

    res.json({ message: 'Post created successfully' });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
