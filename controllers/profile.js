const handleProfileGet = (req, res, db) => {
  const { id } = req.params;

  db.select('*')
    .from('users')
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.json('User Not Found');
      }
    })
    .catch((err) => res.status(400).json('Erro getting user'));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
