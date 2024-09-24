const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    helloChristian(message: String!): String
    helloJuanMiguel(message: String!): String
    helloDanielArias(message: String!): String
    helloJeanPalomino(message: String!): String
    helloMargaritaGrisales(message: String!): String
    helloLesliMartinez(message: String!): String
    helloLeonD(message: String!): String
    helloZairaNaviaa(message: String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    helloChristian: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Christian `;
      },
    helloJuanMiguel: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Juan miguel `;
    },
    helloDanielArias: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Daniel Arias `;
    },
    helloJeanPalomino: (_, { message }) => {
      
        return `¡Hola, ${message}! Un saludo por parte de Jean Palomino `;
    },
    helloMargaritaGrisales: (_, { message }) => {
      
      return `¡Hola, ${message}! Un saludo por parte de Margarita Grisales `;
  },
  helloLeonD: (_, { message }) => {
      
    return `¡Hola, ${message}! Un saludo por parte de Leon Dominguez `;
},
  },
    helloLesliMartinez: (_, { message }) => {
      
    return `¡Hola, ${message}! Un saludo por parte de Lesli Martinez `;
},

helloZairaNaviaa: (_, { message }) => {
      
  return `¡Hola, ${message}! Un saludo por parte de Zaira Navia `;
},
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

