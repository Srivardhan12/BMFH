import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use(cors())

const validateBody = (body: any, requiredFields: string[]) => {
  console.log('Validating Body:', body); // Debug log

  for (const field of requiredFields) {
    if (body[field] === null || body[field] === undefined || body[field] === "") {
      console.log(`Validation Failed for Field: ${field}`); // Debug log
      return `Field '${field}' is required.`;
    }
  }
  return null;
};


// ADMIN Routes
app.post('/add-venue', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    // console.log('Request Body:', body); 

    // const requiredFields = ['image', 'name', 'location', 'rating', 'phoneNumber'];
    // const error = validateBody(body, requiredFields);
    // if (error) {
    //   console.log('Validation Error:', error);
    //   return c.json({ error }, 400);
    // }

    const venue = await prisma.venue.create({
      data: {
        image: body.data.image,
        name: body.data.name,
        location: body.data.location,
        rating: body.data.rating,
        phoneNumber: body.data.phoneNumber,
      },
    });

    return c.json({
      msg: `Added ${venue.name} to database`,
      venue,
    });
  } catch (error) {
    console.error('Error Adding Venue:', error);
    return c.json({ error: 'Failed to add venue. Please try again.' }, 500);
  }
});


app.get('/get-popular-venues', async (c) => {
  try {
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
    })

    return c.json({ popularVenues });
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch data. Please try again.' }, 500);
  }
});

app.get('/get-locations', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const locations = await prisma.venue.findMany({
      distinct: ['location'],
      select: {
        location: true,
      },
    });

    return c.json(locations.map((loc) => loc.location));
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch data. Please try again.' }, 500);
  }
});

app.get('/get-venues', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const location = c.req.query('location');
    console.log("Requested location:", location);

    const reqVenues = await prisma.venue.findMany({
      where: {
        location: location,
      },
    });

    console.log("Fetched venues:", reqVenues.map((data) => {
      data.name
    }));

    return c.json({ reqVenues });
  } catch (error) {
    console.error(error);
    return c.json({ error: `Failed to fetch venues. Please try again.${error}` }, 500);
  }
});



export default app;
