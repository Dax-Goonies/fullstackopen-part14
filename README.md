
# Vercel deployment

https://fullstackopen-part14-ezmbozjvq-dax-7b92.vercel.app/

# Run migration to Vercel

npx drizzle-kit generate
npx drizzle-kit migrate

# Dev mode

npm run dev

# Prod mode

npm run build && npm run start



// Populate the app with data
let blogs: Blog[] = [
  { id: 1, title: 'Full Stack Open', author: 'Matti Luukkainen', url: 'https://fullstackopen.com/en/', likes: 10 },
  { id: 2, title: 'Next.js', author: 'Vercel', url: 'https://nextjs.org/', likes: 3 },
]