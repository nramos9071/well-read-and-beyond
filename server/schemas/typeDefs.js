const typeDefs = `
    type Profile {
        _id: ID
        username: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: Profile
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }

`

module.exports = typeDefs;