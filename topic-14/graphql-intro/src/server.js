import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { authors, getBooks, getAuthorById } from './data.js'

const typeDefs = `
  enum Genre {
    POETRY
    NOVEL
    ESSAY
  }

  type Author {
    id: ID!
    name: String!
    country: String
  }

  type Book {
    id: ID!
    title: String!
    year: Int!
    pages: Int
    rating: Float
    isTranslated: Boolean!
    genre: Genre!
    author: Author!
    fullTitle: String!
    summary: String
  }

  type Query {
    books(genre: Genre, minYear: Int): [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
  }

  input AddBookInput {
    title: String!
    year: Int!
    genre: Genre!
    authorId: ID!
    pages: Int
    isTranslated: Boolean = false
  }

  type Mutation {
    deleteBook(id: ID!): Boolean!
    addBook(input: AddBookInput!): Book!
  }
`

const resolvers = {
  Query: {
    books: (parent, args) => {
      let result = getBooks()

      if (args.genre) {
        result = result.filter((book) => book.genre === args.genre)
      }

      if (args.minYear) {
        result = result.filter((book) => book.year >= args.minYear)
      }

      return result
    },
    book: (parent, args) => getBooks().find((book) => book.id === args.id),
    authors: () => authors,
  },
  Mutation: {
    deleteBook: (parent, args) => {
      const list = getBooks()
      const index = list.findIndex((book) => book.id === args.id)

      if (index === -1) {
        return false
      }

      list.splice(index, 1)
      return true
    },
    addBook: (parent, args) => {
      if (!getAuthorById(args.input.authorId)) {
        throw new Error('Автора з таким ідентифікатором не існує')
      }

      if (args.input.pages !== undefined && args.input.pages <= 0) {
        throw new Error('Кількість сторінок має бути додатною')
      }

      const list = getBooks()
      const id = Math.max(0, ...list.map((book) => Number(book.id))) + 1
      const book = { id: String(id), ...args.input }
      list.push(book)
      return book
    },
  },
  Book: {
    author: (parent) => getAuthorById(parent.authorId),
    fullTitle: (parent) => `${parent.title} (${parent.year})`,
    summary: (parent) => {
      if (parent.id === '1') {
        throw new Error('Опис недоступний')
      }

      return 'Короткий опис книги'
    },
  },
}

const apollo = new ApolloServer({ typeDefs, resolvers })
await apollo.start()

const app = express()
app.use('/graphql', cors(), express.json(), expressMiddleware(apollo))

app.listen(3000, () => {
  console.log('GraphQL: http://localhost:3000/graphql')
})
