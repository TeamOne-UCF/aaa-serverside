//twilio.js
var twilio = require('twilio');
 
var client = twilio('ACe3223ae563addadc2019ab9fbf9b0d99', '55bcf3dd634459b85a7a8abb16870baf');
 
var method = TwilioSms.prototype;
 
// Send the text message.

 function TwilioSms(phone, name, smsBody) {
  this.phone = phone;
  this.name = name;
  this.smsBody = smsBody;
 }
 
 method.sendSms = function() {

 client.sendMessage({
    to: this.phone,
    from: '4072037864',
	body: this.smsBody
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