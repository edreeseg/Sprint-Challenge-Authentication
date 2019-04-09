const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        error: 'Please provided values for both username and password keys.',
      });
    const credentials = { username, password };
    const hash = bcrypt.hashSync(password, 12);
    credentials.password = hash;

    const [id] = await db('users').insert(credentials);
    const payload = { id, username };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'Keep it secret, keep it safe',
      { expiresIn: '1d' }
    );
    res.status(201).json({ token });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint'))
      res.status(400).json({ error: 'Username is not available.' });
    else
      res
        .status(500)
        .json({ error: 'There was an error while attempting registration.' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        error: 'Please provided values for both username and password keys.',
      });
    const credentials = { username, password };
    const storedUser = await db('users')
      .where({ username })
      .first();
    if (!storedUser) throw 401;
    if (!bcrypt.compareSync(credentials.password, storedUser.password))
      throw 401;
    const payload = { id: storedUser.id, username };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'Keep it secret, keep it safe',
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (error) {
    if (error === 401) res.status(401).json({ error: 'You shall not pass!' });
    else
      res
        .status(500)
        .json({ error: 'There was an error while attempting login.' });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
