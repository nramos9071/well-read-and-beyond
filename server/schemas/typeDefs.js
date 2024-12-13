const typeDefs = `
    type User {
        _id: ID!
        username: String
        email: String!
        password: String!
        bio: String
        savedBooks: [Book]
    }

    type Book {
    _id: ID
    title: String
    author: String
  }

    type Auth {
        token: String!
        user: User!
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth

        signUp(username: String!, email: String!, password: String!): Auth

        updateUserBio(bio: String!): User
        removeUser: User 

    }

`

module.exports = typeDefs;