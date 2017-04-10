
 let http = require('http');
 let assert = require('assert')
 let chai = require('chai');
 let should = chai.should();
 let server = require('../server');
 let chaiHttp = require('chai-http');

  var newCustomer ={
	  p_first_name: 'John',
	  p_last_name : 'Doe Jr.',
	  p_email: 'janedoe@test.com',
	  p_phone: '908080810',
	  p_address: '321 Hello Rd.',
	  p_address_2:  '',
	  p_city: 'La La Land',
	  p_state: 'CA',
	  p_postal_code: '32708',
	  p_alert_email: '0',
	  p_alert_sms: '1' 
  }

chai.use(chaiHttp);

//describe('/POST/:', () => {
  //   it('it should POST a customer and add it to the DB', (done) => {
    //        chai.request(server)
      //     .post('/InsertCustomer')
        //   .send(newCustomer)
          // .end((err, res) => {
            //   res.should.have.status(200);
              // //res.body.should.be.a('array');
              //done();
            //});
        //});
     //});

  
  var data = {phone: newCustomer.p_phone};
  describe('/POST/:', () => {
      it('it should GET a customer by the given phone number', (done) => {
            chai.request(server)
            .post('/GetCustomerByPhoneNumber')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
			   assert.equal(data.phone, res.body[0].phone);
				console.log(res.body[0].phone);
              done();
            });
        });
     });
	 
	 describe('/GET customers', () => {
      it('it should GET all the customers', (done) => {
        chai.request(server)
            .get('/GetCustomer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              //  res.body.length.should.be.eql(0);
			  console.log(res.body);
              done();
            });
      });
  });
  describe('/GET queue', () => {
      it('it should GET the queue', (done) => {
        chai.request(server)
            .get('/GetQueue')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              //  res.body.length.should.be.eql(0);
			  console.log(res.body);
              done();
            });
      });
  });
  
   