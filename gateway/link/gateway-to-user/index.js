const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
    type OriTest {
        name: String
    }

    extend type Query {
        linkTest: OriTest
    }
`;

module.exports.resolvers = {
  Query: {
    linkTest() {
      return { name: 'linkTest' };
    }
  },
};
