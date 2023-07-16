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
export { dummy, totalLikes }
