
 let http = require('http');
 let assert = require('assert')
 let chai = require('chai');
 let should = chai.should();
 let server = require('../server');
 let chaiHttp = require('chai-http');

 var customer;
 
  var newCustomer ={
	  p_first_name: 'David',
	  p_last_name : 'Resh',
	  p_email: 'dcresh@gmail.com',
	  p_phone: '3212792666',
	  p_address: '123 Hello Rd.',
	  p_address_2:  '',
	  p_city: 'Orlando',
	  p_state: 'FL',
	  p_postal_code: '32708',
	  p_alert_email: '0',
	  p_alert_sms: '1' 
  }

  var updatedCustomer ={
	  p_customer_id: 0000000000000,
	  p_first_name: 'David',
	  p_last_name : 'Resh',
	  p_email: 'dcresh@gmail.com',
	  p_phone: '3212792666',
	  p_address: '321 Goodbye Rd.',
	  p_address_2:  '',
	  p_city: 'Orlando',
	  p_state: 'FL',
	  p_postal_code: '32708',
	  p_alert_email: '0',
	  p_alert_sms: '1' 
  }
  
  var newQueue = {
           p_customer_id: '00000000000',
           p_first_name: 'David',
           p_last_name: 'Resh',
           p_phone: '3212792666',
           p_service_id: 1,
           p_note: 'Test test test test'}
            
	var data = {
	  customer_id: '5309102717143589',
	  phone: newCustomer.p_phone,
	  service_id: 1,
	  type: 'Insurance'};		
  
chai.use(chaiHttp);

	describe('/POST/: Customer', () => {
		it('it should POST a customer and add it to the DB', (done) => {
			chai.request(server)
				.post('/InsertCustomer')
				.send(newCustomer)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
        });
   });
	
  
  describe('/POST/:', () => {
      it('it should GET a customer by the given phone number', (done) => {
            chai.request(server)
            .post('/GetCustomerByPhoneNumber')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
			   assert.equal(data.phone, res.body[0].phone);
				console.log(res.body[0].phone);
				customer = res.body[0];
              done();
            });
        });
     });
	 
	 describe('/POST/:', () => {
      it('it should GET a customer by the given Id', (done) => {
            chai.request(server)
            .post('/GetCustomerByID')
            .send(customer)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
			   assert.equal(customer.customer_id, res.body[0].customer_id);
				console.log(res.body[0]);
				updatedCustomer.p_customer_id = parseInt(customer.customer_id);
				newQueue.p_customer_id = customer.customer_id;
				console.log(updatedCustomer.p_customer_id);
              done();
            });
        });
     });
	 
	 describe('/POST/: Queue', () => {
		it('it should POST a queue entry and add it to the DB', (done) => {
			chai.request(server)
				.post('/InsertCustomerToQueue')
				.send(newQueue)
				.end((err, res) => {
					res.should.have.status(200);
					//res.body.should.be.a('array');
					done();
				});
        });
    });
   
   describe('/POST/: ServiceId', () => {
      it('it should GET a service type and the count of the same service in the queue', (done) => {
            chai.request(server)
            .post('/GetQueueByServiceId')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
			  assert.equal(data.type, res.body[0].type);
				console.log(res.body[0]);
              done();
            });
        });
     });
	 
	
	describe('/POST/: Delete Queue', () => {
		it('it should POST and dlete a queue entry from the DB', (done) => {
			chai.request(server)
				.post('/DeleteQueueByCustomerId')
				.send(data)
    			.end((err, res) => {
					res.should.have.status(200);
					//res.body.should.be.a('array');
					done();
				});
       });
    });
	 
	 
	// describe('/POST/: Updated Customer', () => {
	//	it('it should update a customer', (done) => {
	//		chai.request(server)
	//			.post('/UpdateCustomer')
	//			.send(updatedCustomer)
	//			.end((err, res) => {
	//				res.should.have.status(200);
	//				console.log(res.body);
	//				//res.body.should.be.a('array');
	//				done();
	//			});
    //    });
    //});
	
	
	//describe('/POST/:', () => {
     //it('it should GET an UPDATED customer by the given Id', (done) => {
       //     chai.request(server)
         //   .post('/GetCustomerByID')
           //.send(data)
           //.end((err, res) => {
             //   res.should.have.status(200);
               //res.body.should.be.a('array');
			 //assert.equal(updatedCustomer.p_address, res.body[0].address);
			//console.log(res.body[0]);
              //done();
            //});
        //});
     //});
	 
	 
	 
	 
	 describe('/GET customers', () => {
      it('it should GET all the customers', (done) => {
        chai.request(server)
            .get('/GetCustomer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              //  res.body.length.should.be.eql(0);
			 // console.log(res.body);
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
			  //console.log(res.body);
              done();
            });
      });
  });
  
   describe('/GET serviceTypes', () => {
      it('it should GET the service types', (done) => {
        chai.request(server)
            .get('/GetServiceTypes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              //  res.body.length.should.be.eql(0);
			  //console.log(res.body);
              done();
            });
      });
  });