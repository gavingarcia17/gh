import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';
import router from './routes/index.js'; // Explicitly import index.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4500;

async function startServer() {
  try {
    const server = new ApolloServer({                                 
      typeDefs,            
      resolvers,                                   
      context: authMiddleware,
    });

    await server.start();
    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Use routes
    app.use(router);

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();