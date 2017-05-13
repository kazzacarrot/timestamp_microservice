
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

var nat = "December 15, 2015";
var unix = "1450137600";
var result = JSON.stringify( { "unix": 1450137600, "natural": "December 15, 2015" });
var bad_nat = "Deember 15, 2015";
var bad_unix = "1lkj00";
var bad_result =JSON.stringify( { "unix": null, "natural": null });

var arb_date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
arb_date.setHours(0); arb_date.setSeconds(0); arb_date.setMilliseconds(0); arb_date.setMinutes(0);
var arb_unix = Math.floor(arb_date/1000)
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"]
var arb_nat = months[arb_date.getMonth()] + " " + arb_date.getDate() + ", " + arb_date.getFullYear();
var arb_result = JSON.stringify( { "unix": arb_unix, "natural": arb_nat });
 
chai.use(chaiHttp);

describe('/GET /', () => {
      it('it should tell me to enter a unix timestamp or natural date', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.eq('Hi there! Try putting a date/unix timestamp into the url.')

                console.log(res)
              done();
            });

      });
});
  describe('/GET /<date>', () => {
      it('The date can be natural timestamp', (done) => {
        chai.request(server)
            .get('/' + nat)
            .end((err, res) => {
                res.text.should.eq(result)
              done();
            });
      });
      it('The date can be unix timestamp', (done) => {
        chai.request(server)
            .get('/' + unix)
            .end((err, res) => {
                res.text.should.eq(result)
              done();
            });
      });
  });
  describe('/GET /<invalid date>', () => {
      it('The date can be natural timestamp', (done) => {
        chai.request(server)
            .get('/' + bad_nat)
            .end((err, res) => {
                res.text.should.eq(bad_result)
              done();
            });
      });
      it('The date can be unix timestamp', (done) => {
        chai.request(server)
            .get('/' + bad_unix)
            .end((err, res) => {
                res.text.should.eq(bad_result)
              done();
            });
      });
  });

  describe('/GET /<arbitrary date>', () => {
      it('The date can be natural timestamp', (done) => {
        chai.request(server)
            .get('/' + arb_nat)
            .end((err, res) => {
                res.text.should.eq(arb_result)
              done();
            });
      });
      it('The date can be unix timestamp', (done) => {
        chai.request(server)
            .get('/' + arb_unix)
            .end((err, res) => {
                res.text.should.eq(arb_result)
              done();
            });
      });
  });
