function sendSms(data, config) {

    const accountSid = config.accountSID
    const authToken = config.authToken
    console.log(data, config)
    const authorizationHeader = `Basic ${Utilities.base64Encode(`${accountSid}:${authToken}`)}`
var options = {
  'method' : 'post',
  'payload' : data,
  'headers': {
    'Authorization':authorizationHeader
  }

};

const twilioUrl  = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSID}/Messages.json`
return UrlFetchApp.fetch(twilioUrl, options)

}