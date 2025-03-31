import express from "express";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import querystring from "querystring";

import productRouter from "./routes/productRouter.js";
import inventoryRouter from "./routes/inventoryRoutes.js";
// import {amazonService} from "./utils/amazonServiceToGetListing.js";

import session from "express-session";
import passport from "passport";
import flash from "connect-flash";

dotenv.config();

import { initializePassport } from "./middleware/passportConfig.js";
import productListRouter from "./routes/amazonSpProductRoute.js";
import { getListingStatus } from "./utils/amazonServiceToGetListing.js";
import MongoStore from "connect-mongo";
import myntraRouter from "./routes/myntraRoutes.js";
import flipkartInventoryRouter from "./routes/flipkartRoutes.js";
// import shopifyRouterrNew from "./routes/shopifyRoute.js";
import shopifyRoute from "./routes/shopifyRoute.js";
import flipkartOrderManagementRouter from "./routes/flipkartOrderManagementRoutes.js";
import flipkartInventoryManagementRouter from "./routes/flipkartInventoryManagementRoutes.js";
// import shopifyRouter from "./routes/shopifyRoute.js";
// import shopifyRouter from "./routes/shopifyRoutes.js";
import amazonRoutes from "./routes/amazonRoutes.js";
initializePassport(passport);

// for .env file

// App
const app = express();



app.use(cors({
  origin: 'https://3000-unibazar-frontendreact-ehpdpajnk7e.ws-us118.gitpod.io',  // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true,  // If you need cookies or credentials
}));

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Allow cookies and credentials
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"], // Allow these headers
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI here
      ttl: 14 * 24 * 60 * 60, // Session lifetime in seconds (14 days)
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// app.use(cors({origin:allowedOrigins , credentials: true, }));

// PORT
const PORT = process.env.PORT || 4000;

// CONNECTED TO DATABASE
connectDB();

// API USES
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/productList", productListRouter);
app.use("/api/myntra", myntraRouter);
app.use("/api/flipkart", flipkartInventoryRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/shopify", shopifyRoute);
app.use("/api/flipkart/order-management", flipkartOrderManagementRouter);
app.use("/api/flipkart/inventory-management", flipkartInventoryManagementRouter);

app.use("/api", amazonRoutes);


// Schema for storing Flipkart tokens
const TokenSchema = new mongoose.Schema({
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  createdAt: { type: Date, default: Date.now },
});

const Token = mongoose.model("Token", TokenSchema);

// Route to handle Flipkart authorization
app.post("/api/flipkart/generate-tokens", async (req, res) => {
  const { code } = req.body;
console.log(code,"code")
  if (!code) return res.status(400).json({ error: "Authorization code is missing" });

  try {
    const url = "https://api.flipkart.net/oauth-service/oauth/token";
    const params = querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: 'https://unibazar.in/',
    });

    const auth = Buffer.from(
      `${'4550a67b03b6698378421141826920304488'}:${'38dfa126e56810846db203f47049c666'}`
    ).toString("base64");

    const response = await axios.post(`${url}?${params}`, null, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Store token in DB
    await Token.findOneAndUpdate(
      {},
      { access_token, refresh_token, expires_in, createdAt: new Date() },
      { upsert: true }
    );

    res.json({ message: "Flipkart connected successfully!", access_token });
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

// Fetch inventory (Example)
app.get("/api/flipkart/inventory-data", async (req, res) => {
  const tokenData = await Token.findOne();
  if (!tokenData) return res.status(401).json({ error: "No valid access token found" });

  try {
    const response = await axios.get("https://api.flipkart.net/sellers/v3/inventory", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching inventory:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});


app.post("/api/refresh", (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ success: false, message: "No refresh token provided" });
  }

  JWT.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });

    const { accessToken } = createTokens(decoded.id);

    res.cookie("jwtToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "Lax",
    });

    res.json({ success: true, accessToken });
  });
});


app.get('/api/listing-status', async (req, res) => {
  try {
    const result = await getListingStatus();
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use(errorMiddleware);

// Server Running
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
