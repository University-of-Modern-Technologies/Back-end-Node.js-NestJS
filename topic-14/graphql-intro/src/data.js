export const books = [
  {
    id: '1',
    title: 'Кобзар',
    year: 1840,
    pages: 114,
    rating: 4.8,
    isTranslated: true,
    genre: 'POETRY',
    description: 'Перша збірка поезій Тараса Шевченка.',
    authorId: '1',
    createdAt: '2026-02-11T09:14:00.000Z',
    updatedAt: '2026-02-11T09:14:00.000Z',
  },
  {
    id: '2',
    title: 'Тигролови',
    year: 1944,
    pages: 304,
    rating: 4.5,
    isTranslated: true,
    genre: 'NOVEL',
    description: 'Пригодницький роман про втечу із заслання.',
    authorId: '2',
    createdAt: '2026-02-11T09:15:00.000Z',
    updatedAt: '2026-03-02T17:40:00.000Z',
  },
  {
    id: '3',
    title: 'Місто',
    year: 1928,
    rating: 4.2,
    isTranslated: false,
    genre: 'NOVEL',
    description: 'Урбаністичний роман про Київ двадцятих років.',
    authorId: '3',
    createdAt: '2026-02-11T09:16:00.000Z',
    updatedAt: '2026-02-11T09:16:00.000Z',
  },
]

export const authors = [
  { id: '1', name: 'Тарас Шевченко', country: 'Україна' },
  { id: '2', name: 'Іван Багряний', country: null },
  { id: '3', name: 'Валер’ян Підмогильний', country: 'Україна' },
]

export function getBooks() {
  // console.log('getBooks()')
  return books
}

export function getAuthorById(id) {
  // console.log('getAuthorById(' + id + ')')
  return authors.find((author) => author.id === id)
}
