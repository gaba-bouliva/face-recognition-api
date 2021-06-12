const handRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.json('Incorrect form submission');
  }
  bcrypt.hash(password, 10, function (err, hashedPwd) {
    if (err) {
      console.log(err);
    } else {
      db.transaction((trx) => {
        trx
          .insert({
            hash: hashedPwd,
            email: email,
          })
          .into('login')
          .returning('email')
          .then((loginEmail) => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      }).catch((err) => res.json('Unable to register!'));
    }
  });
};

module.exports = {
  handleRegister: handRegister,
};
