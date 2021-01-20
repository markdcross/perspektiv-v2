module.exports = (app) => {
  //* ==========================
  //* GET routes
  //* ==========================
  // UNFINISHED GET all murals
  app.get('/api/murals', (req, res) => {
    res.status(200).send('Here are all the murals');
  });

  // UNFINISHED GET a single mural
  app.get('/api/murals/:id', (req, res) => {
    res
      .status(200)
      .send("You're looking for the mural with an id of " + req.params.id);
  });
};
