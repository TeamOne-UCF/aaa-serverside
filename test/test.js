
 let http = require('http');
 let assert = require('assert')
 let chai = require('chai');
 let should = chai.should();
 let server = require('../server');
 let chaiHttp = require('chai-http');

  var newCustomer ={
	  p_first_name: 'Billy Bob',
	  p_last_name : 'Thorton',
	  p_email: 'bbthorton@test.com',
	  p_phone: '7410852963',
	  p_address: '321 Hello Rd.',
	  p_address_2:  '',
	  p_city: 'Jersey Shore',
	  p_state: 'NJ',
	  p_postal_code: '78963',
	  p_alert_email: '0',
	  p_alert_sms: '1' 
  }

  var updatedCustomer = {
	  p_customer_id: '5360359982923019',
	  p_first_name: 'Joshua S.',
	  p_last_name: 'Townsend',
	  p_email: 'jtownsend929@gmail.com',
	  p_phone: '5042377231',
	  p_address: '586 Juniper Springs',
	  p_address_2: '',
	  p_city: 'Orlando',
	  p_state: 'FL',
	  p_postal_code: '32828',
	  p_alert_email: '1',
	  p_alert_sms: '1'
  }
chai.use(chaiHttp);

	//describe('/POST/:', () => {
		//it('it should POST a customer and add it to the DB', (done) => {
			//chai.request(server)
				//.post('/InsertCustomer')
				//.send(newCustomer)
				//.end((err, res) => {
					//res.should.have.status(200);
					//res.body.should.be.a('array');
					//done();
				//});
        //});
    //});
	
	describe('/POST/:', () => {
		it('it should update a customer', (done) => {
			chai.request(server)
				.post('/UpdateCustomer')
				.send(updatedCustomer)
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					//res.body.should.be.a('array');
					done();
				});
        });
    });
  
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
  
   