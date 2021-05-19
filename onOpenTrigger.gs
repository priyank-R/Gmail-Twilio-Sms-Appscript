function onOpen(e) {
    // Add a custom menu to the spreadsheet.
    addUIToSheet()
}

function addUIToSheet() {
    let isEnabled = PropertiesService.getUserProperties().getProperty('smsEnabled')

    SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
        .createMenu('TwilioSMS-Service')
        .addItem(`${isEnabled == 'true' ? 'Disable Service':'Enable Service'}`, 'updateServiceStatus')
        .addItem('Sync Details', 'fetchSheetInfo')
        .addToUi();
}