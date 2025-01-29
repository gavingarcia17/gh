# Tech Blog

## Description
This is a CMS-style blog site where developers can publish articles, blog posts, and share their thoughts and opinions. The application follows the Model-View-Controller (MVC) architecture and utilizes Handlebars.js for templating, Sequelize as the ORM for database interactions, and express-session for user authentication.

## Features
- User authentication (sign up, log in, log out)
- Create, update, and delete blog posts
- Comment on blog posts
- Responsive design with a clean user interface
- Dashboard for managing user posts

## Technologies Used
- Node.js
- Express.js
- Handlebars.js
- Sequelize
- MySQL
- CSS
- JavaScript

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tech-blog
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your database credentials:
   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   SESSION_SECRET=your_session_secret
   ```
5. Run the database migrations and seed the database:
   ```
   npm run seed
   ```
6. Start the server:
   ```
   npm start
   ```

## Usage
- Visit the homepage to view existing blog posts.
- Sign up or log in to create new posts and comment on existing ones.
- Access the dashboard to manage your posts.

## License
This project is licensed under the MIT License.