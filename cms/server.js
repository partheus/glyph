const express = require('express');
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const app = express();

// Serve static files from the "cms" directory
app.use(express.static(path.join(__dirname, '.')));

app.use(express.json());

app.post('/create-post', (req, res) => {
    const { title, description, date, content } = req.body;

    const data = {
        title,
        description,
        date,
    };

    const markdown = matter.stringify(content, data);

    const postsDir = path.join(__dirname, '../src/posts');

    if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(postsDir, `${title}.md`), markdown);

    res.json({ message: 'Post created successfully' });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
