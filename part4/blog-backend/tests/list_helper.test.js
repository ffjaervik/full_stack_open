const { dummy, totalLikes, favouriteBlog } = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy test', () => {
  const blog = []
  const result = dummy(blog)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty returns zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when array has only one blog, it returns the value of the one blog.likes', () => {
    const result = totalLikes(blogs.slice(0, 1))
    expect(result).toBe(7)
  })

  test('when list has multiple blogs, it returns the sum of all likes', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('when list is empty it returns null', () => {
    const result = favouriteBlog([])
    expect(result).toBeNull()
  })
  test('when list is only one element, it returns that element as an object', () => {
    const result = favouriteBlog(blogs.slice(0, 1))
    const theOne = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }
    expect(theOne).toEqual(result)
  })
  test('when passed an array of blogs it find the favourite and returns an object', () => {
    const result = favouriteBlog(blogs)
    const theOne = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
      title: 'Canonical string reduction',
    }
    expect(result).toEqual(theOne)
  })
})
