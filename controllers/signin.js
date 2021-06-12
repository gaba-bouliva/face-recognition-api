const handleSignin = (req, res, db, bcrypt) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.json('Incorrect username or password');
  }

  db.select('email', 'hash')
    .where('email', '=', req.body.email)
    .from('login')
    .then((data) => {
      if (data.length) {
        bcrypt.compare(req.body.password, data[0].hash, function (err, result) {
          if (result) {
            return db
              .select('*')
              .from('users')
              .where('email', '=', req.body.email)
              .then((user) => {
                res.json(user[0]);
              })
              .catch((err) => {
                res.json('Error email or password incorrect');
              });
          }
        });
      } else {
        console.log('Can not connect');
        res.json('Error email or password incorrect');
      }
    })
    .catch((err) => res.json('Wrong Credentials'));
};

module.exports = {
  handleSignin: handleSignin,
};
