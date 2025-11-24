import { http, HttpResponse } from 'msw';
import products from '../../data/Products.json';



let users = []; 
export const handlers = [

  http.get('/api/products', () => {
    console.log('[MSW] Returning products:', products);
    return HttpResponse.json(products);
  }),
  http.post('/api/signup', async ({ request }) => {
  try {
    const body = await request.json();
    console.log("[MSW] Signup body:", body);

    const existingUser = users.find(u => u.email === body.email);
    if (existingUser) {
      console.warn('[MSW] Signup failed: email already in use', body.email);
      return HttpResponse.json(
        { error: 'Email address already in use' },
        { status: 400 }
      );
    }

    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);

    console.log("these are the current users", users);
    console.log('[MSW] New user signed up:', newUser);

    return HttpResponse.json({
      message: 'User signed up successfully',
      user: newUser,
    });
  } catch (err) {
    console.error("[MSW] Signup handler crashed:", err);
    return HttpResponse.json(
      { error: "Internal server error in mock" },
      { status: 500 }
    );
  }
}),
http.post('/api/signin', async ({ request }) => {
  try {
    const body = await request.json();
    console.log("[MSW] Current users at signin:", users);
    const user = users.find(u => u.email === body.email);

    if (!user) {
      console.log("[MSW] Invalid signin attempt:", body.email);
      return HttpResponse.json(
        { field: "email", error: "Email not found" },
        { status: 401 }
      );
    }

    if (!user.password || user.password !== body.password) {
      console.log("[MSW] Wrong password for:", body.email);
      return HttpResponse.json(
        { field: "password", error: "Incorrect password" },
        { status: 401 }
      );
    }

    console.log("[MSW] User signed in successfully:", user);
    return HttpResponse.json({
      message: "Sign in successful",
      user,
    });
  } catch (err) {
    console.error("[MSW] Signin handler crashed:", err);
    return HttpResponse.json(
      { error: "Internal server error in mock" },
      { status: 500 }
    );
  }
})

];