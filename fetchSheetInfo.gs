function fetchSheetInfo() {
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheets = ss.getSheets()
    const activeSheet = sheets[0]
    const cells = activeSheet.getRange(1, 2, 7)
    const regex = new RegExp(/"/, 'g')


    const toNumber = cells.getCell(1, 1).getValue().toString().replace(regex, '')
    const fromNumber = cells.getCell(2, 1).getValue().toString().replace(regex, '')
    const accountSID = cells.getCell(3, 1).getValue()
    const authToken = cells.getCell(4, 1).getValue()
    const messageServiceId = cells.getCell(5, 1).getValue()
    const email = cells.getCell(6, 1).getValue()

    PropertiesService.getUserProperties().setProperties({
        toNumber,
        fromNumber,
        accountSID,
        authToken,
        messageServiceId,
        email
    })

    PropertiesService.getUserProperties().setProperty('lastSynced', Date.now().toString())
    addUIToSheet()

    return {
        toNumber,
        fromNumber,
        accountSID,
        authToken,
        messageServiceId,
        email
    }

}


function fetchSheetInfoCached() {

    const lastSyncedDate = new Date(parseInt(PropertiesService.getUserProperties().getProperty('lastSynced')))
    const cachedUpto = new Date(lastSyncedDate.getFullYear(), lastSyncedDate.getMonth(), lastSyncedDate.getDate() + 1, lastSyncedDate.getHours(), lastSyncedDate.getMinutes())

    const now = new Date()


    if (!(cachedUpto.getTime() > now.getTime())) {
        fetchSheetInfo()
        console.log('Fetched Info From Sheet')
        console.log('Date.now(): ', now)
        console.log('LastSyncedDate: ', lastSyncedDate)
        console.log('Cached Date: ', cachedUpto)

    }
    return PropertiesService.getUserProperties().getProperties()

}