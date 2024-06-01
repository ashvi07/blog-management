const { blog_post } = require('../models');
const { blog_comments } = require('../models');
const { users } = require('../models');
const { Op } = require('sequelize');

const getAllBlogPosts = async (req, res) => {
    try {
        const { title, content, page = 1, limit = 5 } = req.query;
        const offset = (page - 1) * limit;

        // Define conditions based on query parameters
        const conditions = {};
        if (title) {
            conditions.title = { [Op.like]: `%${title}%` };
        }
        if (content) {
            conditions.content = { [Op.like]: `%${content}%` };
        }

        const blogPosts = await blog_post.findAll({
            where: conditions,
            offset: offset,
            limit: parseInt(limit) // Convert limit to integer
        });
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSpecificBlogPosts = async (req, res) => {
    try {
        const { id } = req.params;

        const blogPost = await blog_post.findByPk(id);
        res.status(200).json(blogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addBlogPost = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;

        const authorData = await users.findOne({ where: { email: author } });
        if (!authorData) {
            return res.status(404).json({ message: 'Author not found' });
        }

        let image = '';
        if (req.file) {
            image = req.file.path; // Adjust this based on your storage mechanism
        }

        const newBlogPost = await blog_post.create({ title, content, author: authorData.id, tags, image });
        res.status(201).json(newBlogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, tags } = req.body;

        const authorData = await users.findOne({ where: { email: author } });
        if (!authorData) {
            return res.status(404).json({ message: 'Author not found' });
        }

        let image = '';
        if (req.file) {
            image = req.file.path; // Adjust this based on your storage mechanism
        }

        const blogPost = await blog_post.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const updatedBlogPost = await blogPost.update({ title, content, author: authorData.id, tags, image });
        res.status(201).json(updatedBlogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;

        const blogPost = await blog_post.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const deletedBlogPost = await blogPost.destroy();
        res.status(201).json(deletedBlogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addBlogPostComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, content, createdAt } = req.body;

        const blogPostData = await blog_post.findOne({ where: { id: id } });
        if (!blogPostData) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const authorData = await users.findOne({ where: { email: author } });
        if (!authorData) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const newBlogComment = await blog_comments.create({ blog_post_id: id, author: authorData.id, content, createdAt });
        res.status(201).json(newBlogComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getBlogPostComments = async (req, res) => {
    try {
        const { id } = req.params;

        // Define conditions based on query parameters
        const conditions = {};
        if (id) {
            conditions.blog_post_id = id;
        }
        
        const blogComments = await blog_comments.findAll({
            where: conditions
        });
        res.status(201).json(blogComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBlogPostComments = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        
        const blogComment = await blog_comments.findByPk(commentId);
        if (!blogComment) {
            return res.status(404).json({ message: "Blog comments not found" });
        }

        const deletedBlogComment = await blogComment.destroy();
        res.status(201).json(deletedBlogComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllBlogPosts, getSpecificBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, addBlogPostComment, getBlogPostComments, deleteBlogPostComments };