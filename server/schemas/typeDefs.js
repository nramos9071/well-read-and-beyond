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
    bookId: id
    authors: [String]
    description: String
    title: String
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
        type Query {
    books: [Book]
    book(bookId: ID!): Book
  }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth

        signUp(username: String!, email: String!, password: String!): Auth

        updateUserBio(bio: String!): User
        removeUser: User 
        saveBook(user: ID!, body: BookInput): User
        deleteBook(user: ID!, bookId: String!): User

    }

`

module.exports = typeDefs;