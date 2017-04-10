//twilio.js
var twilio = require('twilio');
 
var client = twilio('ACe3223ae563addadc2019ab9fbf9b0d99', '55bcf3dd634459b85a7a8abb16870baf');
 
var method = TwilioSms.prototype;
 
// Send the text message.

 function TwilioSms(phone, name, website) {
  this.phone = phone;
  this.name = name;
  this.website = website;
 }
 
 method.sendSms = function() {

 client.sendMessage({
    to: this.phone,
    from: '4072037864',
	body: 'Hello ' + this.name + ',\n\n We will notify you when an agent is ready. ' +
	'Please click the link to view the wait details ' + this.website
  }, function(err, data) {
    if (err) {
      console.error('Could not notify customer');
      console.error(err);
    } else {
      console.log('Customer notified');
    }
  });
 };
 
 module.exports = TwilioSms;