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
    id: ID!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
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
        saveBooks(book: BookInput!): User
        updateUserBio(bio: String!): User
        removeUser: User 
        removeBook(id: ID!): User

    }

    input BookInput {
        id: ID!
        title: String!
        authors: [String]
        description: String
        image: String
        link: String
  }

`

module.exports = typeDefs;