
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cartRoutes = require('./routes/cart');
const user = require('./routes/user')
const blog = require("./routes/blogRoutes");
const order = require("./routes/orderRouter");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const homeRoutes = require("./routes/homerotes")

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/gallery", galleryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', user);
app.use("/api/blog", blog);
app.use("/api/order", order);
app.use("/api/home", homeRoutes);
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/contact", contactRoutes);

app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB error:', err));
