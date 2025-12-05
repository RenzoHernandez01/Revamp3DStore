import { http, HttpResponse } from 'msw';
import products from '../../data/Products.json';
import seller from '../../data/sellerProfiles.json';


let users = []; 
export const handlers = [

 http.get('/api/products', async () => {
  console.log('[MSW] Returning products:', products);
  await new Promise(res => setTimeout(res, 300));
  return HttpResponse.json(products || []);
}),

 http.get('/api/seller', async () => {
  console.log('[MSW] Returning seller:', seller);
  await new Promise(res => setTimeout(res, 300));
  return HttpResponse.json(seller || []);
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
}),

http.post('/api/storeCcInfo', async ({ request }) => {
  try {
    const body = await request.json();
    console.log("[MSW] Store CC Info body:", body);
    const user = users.find(u => u.email === body.email);
    if (!user) {
      console.warn("[MSW] Tried to store CC info for non-existent user:", body.email);
      return HttpResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    user.ccInfo = {
      ccNumber: body.ccNumber,
      ccDate: body.ccDate,
      cvc: body.cvc,
      ccName: body.ccName,
      country: body.country,
      address: body.address,
    };
    console.log("[MSW] Updated user with CC info:", user);
    return HttpResponse.json({
      message: "CC info stored successfully",
      user,
    });
  } catch (err) {
    console.error("[MSW] storeCCInfo handler crashed:", err);
    return HttpResponse.json(
      { error: "Internal server error in mock" },
      { status: 500 }
    );
  }
}),

http.post('/api/purchase', async ({ request }) => {
  try {
    const body = await request.json();
    console.log("[MSW] Purchase body:", body);

    const user = users.find(u => u.email === body.email);
    if (!user) {
      return HttpResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const purchase = {
      productId: body.productId,
      purchaseDate: new Date().toISOString(), 
      priceAtPurchase: body.priceAtPurchase,
    };

 
    if (!user.purchases) {
      user.purchases = [];
    }
    user.purchases.push(purchase);

    console.log("[MSW] Updated user with purchase:", user);

    return HttpResponse.json({
      message: "Purchase recorded successfully",
      purchase,
      user,
    });
  } catch (err) {
    console.error("[MSW] purchase handler crashed:", err);
    return HttpResponse.json(
      { error: "Internal server error in mock" },
      { status: 500 }
    );
  }
}),


];