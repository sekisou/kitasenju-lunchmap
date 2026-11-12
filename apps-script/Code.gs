const SPREADSHEET_ID = '1nSGZNDn9MvHKVs73VJEZQYTgfGQKEU44MVrl13hOO20';
const SHEET_NAME = '利用ログ';

function getLogSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['受信日時', '操作種別', '店舗名', '操作日時', '選択条件']);
  }
  return sheet;
}

function doGet() {
  return ContentService
    .createTextOutput('Lunchmap research logger is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('POSTデータがありません');
  }
  const data = JSON.parse(e.postData.contents);
  const sheet = getLogSheet();
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
  getLogSheet();
}
