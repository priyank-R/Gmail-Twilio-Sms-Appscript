function mainFunction() {
    // sheet service
    let config = fetchSheetInfoCached()
    console.log('config: ', config)
    console.log(PropertiesService.getUserProperties().getProperty('smsEnabled'))
    if (PropertiesService.getUserProperties().getProperty('smsEnabled') === 'true') {
        console.log('gets in if')
        let messageThreads = fetchUnreadThreads(20)
        sendSmsToUnreadThreads(config.email, messageThreads,
            config)
    }
    return;


}


// function temp(){
//   const threads = GmailApp.getInboxThreads(0,20)
//   threads.forEach((thread)=>{
//     const messages = thread.getMessages()
//     messages.forEach((message)=>{

//     })
//   })
// }




function fetchUnreadThreads(totalThreadsToFetch = 1) {
    return GmailApp.getInboxThreads(0, totalThreadsToFetch)
}

function sendSmsToUnreadThreads(email, messageThreads, config) {
    console.log('Message Threads' + messageThreads)
        //If already checked by the Script
    messageThreads.forEach((thread) => {

        if (hasLabel(thread)) {
            return;
        }
        if (!thread.isUnread()) {
            return;
        }

        const messages = thread.getMessages();
        messages.forEach((message) => {
            if (message.isUnread()) {
                console.log("Message.getFrom: ", message.getFrom())
                let from = extractEmailFromString(message.getFrom())
                if (from === email) {
                    //trigger sms api here
                    console.log('TWILLIO API TRIGGERED FOR: ', message.getSubject())
                    console.log("getUserLabelByName: ", GmailApp.getUserLabelByName("xyz"))
                    var data = {
                        To: config.toNumber,
                        From: config.fromNumber,
                        MessagingServiceSid: config.messageServiceId,
                        Body: message.getSubject()
                    };

                    //api-call-to-twillio
                    const response = sendSms(data, config)

                    //adding a new label if the sms is sent successfully
                    thread.addLabel(GmailApp.getUserLabelByName("SMS-SENT"))
                }
            }
        })

    })
}

function hasLabel(thread, labelName = "SMS-SENT") {
    let result = false
    let labels = thread.getLabels()
    labels.forEach((label) => {
        if (label.getName() === labelName) {
            result = true
            return
        }
    })

    return result
}

function extractEmailFromString(from = "Wordpress Rupareliya <piyurupareliya@gmail.com>") {
    // const regex = RegExp(/ <.*[@].*[.].*>/gm)
    const betterRegex = RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
    const fromEmail = from.match(betterRegex)[0].trim()
        // return fromEmail.slice(1,fromEmail.length -1)
    return fromEmail
}