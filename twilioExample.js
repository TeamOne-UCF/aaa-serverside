// index.js

var twilio = require('./lib/twilio');

var sms = new twilio('3212792666', 'John', 'www.aaa.com');
sms.sendSms();