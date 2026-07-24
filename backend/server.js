
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/productRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const cartRoutes = require('./routes/cart');
// const user = require('./routes/user')
// const blog = require("./routes/blogRoutes");
// const order = require("./routes/orderRouter");
// const galleryRoutes = require("./routes/galleryRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const homeRoutes = require("./routes/homeRoutes");
// const reviewRoutes = require("./routes/reviewRoutes")

// require('dotenv').config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/gallery", galleryRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/user', user);
// app.use("/api/blog", blog);
// app.use("/api/order", order);
// app.use("/api/home", homeRoutes);
// app.use("/api/payment", require("./routes/paymentRoutes"));
// app.use("/api/contact", contactRoutes);
// app.use("/api/reviews", reviewRoutes);

// app.get('/', (req, res) => {
//   res.send('API running...');
// });

// app.use((err, req, res, next) => {
//   console.error("Unhandled Error:", err);
//   res.status(500).json({ message: err.message });
// });

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
// });

// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => {
// //     app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
// //   })
// //   .catch(err => console.error('❌ DB error:', err));

//   mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`✅ Server started on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("❌ DB error:", err);
//   });


require("dotenv").config();

const express = require("express");

console.log("STEP 1");

const app = express();

console.log("STEP 2");

app.get("/", (req, res) => {
  console.log("REQUEST HIT");
  res.send("Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("LISTENING", PORT);
});