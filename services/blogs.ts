export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
};

// Populate the app with data
let blogs: Blog[] = [
  { id: 1, title: 'Full Stack Open', author: 'Matti Luukkainen', url: 'https://fullstackopen.com/en/', likes: 10 },
  { id: 2, title: 'Next.js', author: 'Vercel', url: 'https://nextjs.org/', likes: 3 },
]

// Get all the blogs
export const getBlogs = () => blogs

// Add a new blog
export const addBlog = (blog: Omit<Blog, 'id' | 'likes'>) => {
  const newBlog: Blog = { ...blog, id: blogs.length + 1, likes: 0 }
  blogs = [...blogs, newBlog]
  return newBlog
};

// Get a specific blog by its id
export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

// Update the number of likes for a blog
export const likeBlog = (id: number) => {
  blogs = blogs.map((blog) => 
    blog.id === id ? {...blog, likes: blog.likes + 1} : blog
  )
}