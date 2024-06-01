const express = require('express');
const router = express.Router();
const { getAllBlogPosts, getSpecificBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, addBlogPostComment, getBlogPostComments, deleteBlogPostComments } = require('../controllers/blogController');
const authenticateToken = require("../middleware/authMiddleware");
const { validateBlogPost, validateBlogCommentPost } = require('../middleware/blogPostValidationMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(authenticateToken);

// Set blog post routes
router.get('/', getAllBlogPosts);
router.get('/:id', getSpecificBlogPosts);
router.post('/', upload.single('image'), validateBlogPost, addBlogPost);
router.put('/:id', upload.single('image'), validateBlogPost, updateBlogPost);
router.delete('/:id', deleteBlogPost);
router.post('/:id/comments', validateBlogCommentPost, addBlogPostComment);
router.get('/:id/comments', getBlogPostComments);
router.delete('/:id/comments/:commentId', deleteBlogPostComments);

module.exports = router;