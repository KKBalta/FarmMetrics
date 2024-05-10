const express = require('express');
const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// import middlewares
const authenticateToken = require('./middleware/auth');

// Import routes
const farmerRoutes = require('./routes/farmerRoutes');
const liveStockRoutes = require('./routes/liveStockRoutes');
const monthlyWeightRoutes = require('./routes/monthlyWeightRoutes');
const rasyonRoutes = require('./routes/rasyonRoutes');
const slaughterSchemaRoutes = require('./routes/slaughterSchemaRoutes');
const livestockRasyonRoutes = require('./routes/livestockRasyonRoutes')

// Use routes
app.use('/farmers', farmerRoutes);
app.use('/livestock',liveStockRoutes);
app.use('/monthlyWeights', monthlyWeightRoutes);
app.use('/rasyon',rasyonRoutes);
app.use('/slaughterSchema',slaughterSchemaRoutes);
app.use('/livestockRasyon',livestockRasyonRoutes)


app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
