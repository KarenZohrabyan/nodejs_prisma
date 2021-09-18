const { PrismaClient } = require(".prisma/client");
const graphql = require("graphql");
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString} = graphql;
// const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const client = new PrismaClient();

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
    })
})

const Query = new GraphQLObjectType({
    name: "userInfo",
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID,
                    defaultValue: 6,
                },
            },
            resolve: async (parent, args) => {
                const users = await client.user.findUnique({
                    where: {
                        id: +args.id,
                    },
                });
                return users;
            }
        }
    }
})

const Query2 = new GraphQLObjectType({
    name: "getAllUsers",
    fields: {
        user: {
            type: new graphql.GraphQLList(UserType),
            resolve: async () => {
                const users = await client.user.findMany();
                return users
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})

// module.exports = {
//     schema1: new GraphQLSchema({
//         query: Query
//     }),
//     schema2: new GraphQLSchema({
//         query: Query2
//     }),
// }

// module.exports = schema;