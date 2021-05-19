function updateServiceStatus() {
    const state = PropertiesService.getUserProperties().getProperty('smsEnabled')
    state === 'true' ? PropertiesService.getUserProperties().setProperty('smsEnabled', 'false') :
        PropertiesService.getUserProperties().setProperty('smsEnabled', 'true')

    addUIToSheet()
}