const SPREADSHEET_ID = 'ここにスプレッドシートIDを入力';
const SHEET_NAME = '利用ログ';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([
    new Date(),
    data.event || '',
    data.store || '',
    data.timestamp || '',
    JSON.stringify(data.filters || {})
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['受信日時', '操作種別', '店舗名', '操作日時', '選択条件']);
  }
}
