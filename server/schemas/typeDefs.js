const typeDefs = `
    type Profile {
        _id: ID
        username: String
        password: String
    }

    type Query {
        me: Profile
    }

`

module.exports = typeDefs;