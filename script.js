const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send('Error fetching posts.');
        } else {
            res.json(posts);
        }
    });
});

app.post('/posts', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    newPost.save((err) => {
        if (err) {
            res.send('Error publishing post.');
        } else {
            res.send('Post published successfully.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
