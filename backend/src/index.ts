import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>()

// ADMIN Routes 
app.post('/api/v1/add-venue', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const venue = await prisma.venue.create({
    data: {
      image: body.image,
      name: body.name,
      location: body.location,
      rating: body.rating,
      phoneNumber: body.phoneNumber
    }
  });
  return c.json({
    msg: `Added ${body.name} to database`
  });
})

// Main Site Routes

app.get('/api/v1/get-popular-venues-and-locations', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const popularVenues = await prisma.venue.findMany({
    orderBy: {
      rating: 'desc',
    },
    take: 3,
    select: {
      rating: true,
      image: true,
      name: true,
      location: true,
    },
  });

  const locations = await prisma.venue.findMany({
    select: {
      location: true
    }
  })

  return c.json({ popularVenues, locations });
});


app.get('/api/v1/get-venues', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const reqVenues = await prisma.venue.findMany({
    where: {
      location: body.location
    }
  })

  return c.json({ reqVenues })
})

export default app
