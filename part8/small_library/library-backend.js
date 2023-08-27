const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');

const { PORT, MONGODB_URI, JWT_SECRET } = require('./utilities/config');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodeToken = /** @type {import('jsonwebtoken').JwtPayload} */ (
            jwt.verify(auth.substring(7), JWT_SECRET)
          );
          const currentUser = await User.findById(decodeToken.id);
          return { currentUser };
        }
      },
    })
  );

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
};

start()