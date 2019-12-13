const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTables = () => {
  pool.query(`CREATE TABLE IF NOT EXISTS 
  users(
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    jobrole VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    registeredon TIMESTAMP DEFAULT current_timestamp  
    )`)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};

const createGifsTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  gifs(
    gifid SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    publicid VARCHAR(255) NOT NULL,
    createDate TIMESTAMP DEFAULT current_timestamp,
    updateDate TIMESTAMP DEFAULT current_timestamp,
    type VARCHAR(255) DEFAULT 'gif',
    userid SERIAL REFERENCES users(userid)
  )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};

const createArticlesTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  articles(
    articleid SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    article VARCHAR(255) NOT NULL,
    createDate TIMESTAMP DEFAULT current_timestamp,
    updateDate TIMESTAMP DEFAULT current_timestamp,
    type VARCHAR(255) DEFAULT 'article',
    userid SERIAL REFERENCES users(userid)
  )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};

const createArticleCommentsTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  article_comments(
    commentid SERIAL PRIMARY KEY,
    createdon TIMESTAMP DEFAULT current_timestamp,
    comment VARCHAR(255) NOT NULL,
    articleid integer REFERENCES articles(articleid),
    userid integer REFERENCES users(userid)
)`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });

};

const creategifCommentsTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  gif_comments(
    commentid SERIAL PRIMARY KEY,
    createdon TIMESTAMP DEFAULT current_timestamp,
    comment VARCHAR(255) NOT NULL,
    gifid integer REFERENCES gifs(gifid),
    userid integer REFERENCES users(userid)
)`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });

}

module.exports = {
  createUsersTables,
  createGifsTables,
  createArticlesTables,
  createArticleCommentsTables,
};

require('make-runnable');
