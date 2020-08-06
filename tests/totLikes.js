const listHelper = require('../utils/list_helper')
const { testEnvironment } = require('../jest.config')

test('number of total likes', () => {
  const blogs = [
    {
      title: "eka",
      author: "ekak",
      url: ".",
      likes: 77
    },
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    }
]

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(99)
})