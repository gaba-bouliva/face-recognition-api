const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ffaac4cc86824ef89c6f2786cd3deda5', //c6d0e5cfdeab4aa2a62a12056f29cf69
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      console.log('returning', data);
      res.json(data);
    })
    .catch((err) => res.json(err));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => res.json('unable to get user entries'));
};

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall,
};
