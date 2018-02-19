import { makeExecutableSchema } from 'graphql-tools'

const users = [
  {
    id: 1,
    name: 'Cersie Lannister',
    email: 'cersei.lannister@got.hbo'
  },
  {
    id: 2,
    name: 'Jon Snow',
    email: 'jon.snow@got.hbo'
  }
]

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
      createUser (name : String!, email: String!) : User
  }
  `;

const resolvers = {
  User: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    email: (parent) => parent.email
  },
  Query : {
    allUsers: () => users,
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = { id: users.length + 1, ...args }
      users.push(newUser)
      return newUser
    }
  }
}

export default makeExecutableSchema({ typeDefs, resolvers })
