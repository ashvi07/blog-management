# blog-management
Setup Blog Management Module

# Run DB Migration
npx sequelize-cli db:migrate

# Run DB Seeder
npx sequelize db:seed:all

# Import Postman Collection
Blog management postman collection is added in postman folder.

# Auth Routes
1. Signup : POST /api/auth/register
2. User: POST /api/auth/login

# Blog Routes
1. Add Blog : GET /api/blogs
2. Get All Blogs : GET /api/blogs/:id
3. Get Specific Blog : POST /api/blogs
4. Update Blog : PUT /api/blogs/:id
5. Update Blog : DELETE /api/blogs/:id
6. Add Blog Comment : POST /api/blogs/:id/comments
7. Get Blog specific Comments : GET /api/blogs/:id/comments
8. Delete Blog Commets : DELETE /api/blogs/:id/comments/:commentId

# Run the application
npm start