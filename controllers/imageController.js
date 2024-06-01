const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = req.file.path;
    blog_post.image = imagePath;

    res.status(201).json({ imagePath });
};

module.exports = { uploadImage };
