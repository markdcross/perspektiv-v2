module.exports = (app) => {
  //* ==========================
  //* GET routes
  //* ==========================
  // UNFINISHED GET all restaurants
  app.get('/api/restaurants', (req, res) => {
    res.status(200).send('Here are all the restaurants');
  });

  // UNFINISHED GET a single restaurant
  app.get('/api/restaurants/:id', (req, res) => {
    res
      .status(200)
      .send("You're looking for the restaurant with an id of " + req.params.id);
  });
};
