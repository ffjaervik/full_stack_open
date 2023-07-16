const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
  //   let likes = 0
  //   blogs.map((blog) => {
  //     return (likes = likes += blog.likes)
  //   })
  //   return likes
}


const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favourite = blogs[0]
  blogs.forEach((next) => {
    if (next.likes > favourite.likes) {
      favourite = next
    }
  })
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  }
}


export { dummy, totalLikes, favouriteBlog }
