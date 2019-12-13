/* eslint-disable no-undef */
// Import the dependencies for testing
const chai = require('chai');

const { expect } = require('chai');

const chaiHttp = require('chai-http');

const jwt = require('jsonwebtoken');

const fs = require('fs');

const app = require('../app');

const articleModel = require('../models/article-model');

const gifModel = require('../models/gif-model');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Default user(tester) details
const user = {
  firstname: 'tester',
  lastname: 'Lukman',
  email: 'admintest@mail.com',
  password: 'password',
  gender: 'male',
  jobRole: 'test',
  department: 'testing',
  address: 'test/testpages',
};

// Generate JWT
const userId = 2;
const token = jwt.sign(
  { userId },
  'RANDOM_TOKEN_SECRET',
  { expiresIn: '24h' },
);
// Assign JWT
const gentoken = `Bearer ${token}`;

// test article
const article = {
  title: 'testImage',
  article: 'My article',
};

// test gif
const gif = {
  title: 'testimage',
  description: 'test-image-description',
};

// Feature 1 - Admin can create new user
describe('POST /auth/signup', () => {
  it('should create a new User', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        res.should.have.status(201);
        expect(body).to.contain.property('status').that.equal('success');
        expect(body.data).to.contain.property('message').that.equal('User account successfully created');
        expect(body.data).to.contain.property('token');
        expect(body.data).to.contain.property('userId');
        done();
      });
  });
});

// Feature 2 - Employee can signin
describe('POST /auth/signin', () => {
  it('should Login a user', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        res.should.have.status(200);
        expect(body).to.contain.property('status').that.equal('success');
        expect(body.data).to.contain.property('token');
        expect(body.data).to.contain.property('userId');
        done();
      });
  });
});

describe('POST /gifs', () => {
  it('should create a gif', (done) => {
    chai.request(app)
      .post('/gifs')
      .set({ Authorization: gentoken })
      .field('title', 'testimage')
      .field('description', 'test-desc')
      .attach('image', fs.readFileSync('images/200px-Rotating_earth_(large).gif'), 'rotating-earth.gif')
      .end(
        (err, res) => {
          const { body } = res;
          res.should.have.status(201);
          expect(body).to.contain.property('status').that.equal('success');
          expect(body.data).to.contain.property('gifId');
          expect(body.data).to.contain.property('message').that.equal('GIF image successfully posted');
          expect(body.data).to.contain.property('createdOn');
          expect(body.data).to.contain.property('title');
          done();
        },
      );
  }).timeout(20000);
});

// Feature 4 - Employee can create articles
describe('POST /articles', () => {
  it('should create an article', (done) => {
    chai.request(app)
      .post('/articles')
      .set({ Authorization: gentoken })
      .send(article)
      .end((err, res) => {
        const { body } = res;
        res.should.have.status(201);
        expect(body).to.contain.property('status').that.equal('success');
        expect(body.data).to.contain.property('message').that.equal('Article successfully created');
        expect(body.data).to.contain.property('title');
        done();
      });
  });
});

// Feature 5 - Employees can edit their articles. 
describe('PATCH /articles', () => {
  it('should update an article', (done) => {
    // Gets an article from the db with the title
    articleModel.getTest(article).then(
      (data) => {
        articleId = data.rows[0].articleid;
        chai.request(app)
          .patch(`/articles/${articleId}`)
          .set({ Authorization: gentoken })
          .send(article)
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('message').that.equal('Article successfully updated');
            expect(body.data).to.contain.property('title');
            expect(body.data).to.contain.property('article');
            done();
          });
      },
    );
  });
});

// Feature 8 - Employees can comment on other colleagues' article post.
describe('POST /articles/<articleId>/comment', () => {
  it('Employees can comment on other colleagues\'s article post', (done) => {
    articleModel.getTest(article).then(
      (data) => {
        const articleId = data.rows[0].articleid;
        const comment = {
          comment: 'test article comment',
        };
        chai.request(app)
          .post(`/articles/${articleId}/comment`)
          .set({ Authorization: gentoken })
          .send(comment)
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(200);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('message').that.equal('Comment successfully created');
            expect(body.data).to.contain.property('createdOn');
            expect(body.data).to.contain.property('articleTitle');
            expect(body.data).to.contain.property('article');
            expect(body.data).to.contain.property('comment');
            done();
          });
      },
    );
  });
});

// Feature 9 - Employees can comment on other colleagues' gif post.
describe('POST /gifs/<:gifId>/comment', () => {
  it('Employees can comment on other colleagues\' gif post', (done) => {
    gifModel.getTest(gif).then(
      (data) => {
        gifId = data.rows[0].gifid;
        const comment = 'test gif comment';
        chai.request(app)
          .post(`/gifs/{gifid}/comment`)
          .set({ Authorization: token })
          .send(comment)
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('message').that.equal('Comment successfully created');
            expect(body.data).to.contain.property('createdOn');
            expect(body.data).to.contain.property('gifTitle');
            expect(body.data).to.contain.property('comment');
            done();
          });
      },
    );
  });
});

// Feature 10 - Employees can view all articles, showing the most recently posted articles first.  
describe('GET /feed', () => {
  it('Employees can view all articles or gifs, showing the most recently posted articles or gifs first ', (done) => {
    chai.request(app)
      .get('/feed')
      .set({ Authorization: token })
      .end((err, res) => {
        const { body } = res;
        res.should.have.status(200);
        expect(body).to.contain.property('status').that.equal('success');
        const data = body.data[0];
        expect(data).to.contain.property('id');
        expect(data).to.contain.property('createdOn');
        // expect(data).to.contain.property('article');
        expect(data).to.contain.property('authorId');
        done();
      });
  });
});

// Feature 11 - Employees can view a specific article.
describe('GET /article/<:articleId>', () => {
  it('Employees can view a specific article', (done) => {
    articleModel.getTest(article).then(
      (articleid) => {
        const id = articleid.rows[0].articleid;
        chai.request(app)
          .get(`/articles/${id}`)
          .set('Authorization', token)
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            const { data } = body;
            expect(data).to.contain.property('id');
            expect(data).to.contain.property('createdOn');
            expect(data).to.contain.property('title');
            expect(data).to.contain.property('article');
            const comments = data.comments[0];
            expect(comments).to.contain.property('commentId');
            expect(comments).to.contain.property('comment');
            expect(comments).to.contain.property('authorId');
            done();
          });
      },
    );
  });
});

// Feature 12 - Employee can view a specific gif Post
describe('GET /gif/<:gifId>', () => {
  it('Employees can view a specific gif post', (done) => {
    gifModel.getTest(gif).then(
      (gifid) => {
        const id = gifid.rows[0].gifid;
        chai.request(app)
          .get(`/gifs/${id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('id');
            expect(body.data).to.contain.property('createdOn');
            expect(body.data).to.contain.property('title');
            expect(body.data).to.contain.property('url');
            expect(body.data.comments).to.contain.property('commentId');
            expect(body.data.comments).to.contain.property('authorId');
            expect(body.data.comments).to.contain.property('comment');
            done();
          });
      },
    );
  });
});

// Feature 6 - Employees can delete their articles.  
describe('DELETE /articles/<article:id>', () => {
  it('should delete an employee\'s article', (done) => {
    // Gets an article from the db with the title
    articleModel.getTest(article).then(
      (data) => {
        articleId = data.rows[0].articleid;
        chai.request(app)
          .delete(`/articles/${articleId}`)
          .set({ Authorization: gentoken })
          .send()
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('message').that.equal('Article successfully deleted');
            done();
          });
      },
    );
  });
});

// Feature 7 - Employees can delete their gifs post.
describe('DELETE /gifs/<:gifId>', () => {
  it('Employee can delete their gifs', (done) => {
    gifModel.getTest(gif).then(
      (data) => {
        const gifId = data.rows[0].gifid;
        chai.request(app)
          .delete(`/gifs/${gifId}`)
          .set({ Authorization: gentoken })
          .end((err, res) => {
            const { body } = res;
            res.should.have.status(201);
            expect(body).to.contain.property('status').that.equal('success');
            expect(body.data).to.contain.property('message').that.equal('gif post successfully deleted');
            done();
          });
      },
    );
  });
});
