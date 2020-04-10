const config = {
  capabilities:
  {
    browserName: 'firefox',
    acceptInsecureCerts: true,
    'moz:firefoxOptions': {
        'args': ["--disable-gpu", "--no-sandbox", '--start-maximized'],
        prefs: {
        'intl.accept_languages': "en-US",
        'services.sync.prefs.sync.browser.download.useDownloadDir' : true,
        'browser.download.useDownloadDir' : true,
        'browser.download.manager.alertOnEXEOpen' :false,
        'browser.download.manager.closeWhenDone':true,
        'browser.download.manager.focusWhenStarting' : false,
        'browser.download.manager.showWhenStarting' : false,
        'browser.helperApps.alwaysAsk.force':false,
        'browser.download.manager.showAlertOnComplete':false,
        'browser.download.manager.useWindow':false,
        //Disable Firefox's built-in PDF viewer, download prompt is shown if not disabled
        'pdfjs.disabled':false,
        //MIME of files type that need to bypass the confirmation form for download
        'browser.helperApps.neverAsk.saveToDisk' : 'application/dicom,application/zip,application/x-zip-compressed,multipart/x-zip,application/pdf,application/json,text/plain,text/csv,application/csv;text/comma-separat‌​ed-values;application/excel;application/octet-stream;application/xlsx;application/xls;application/vnd.ms-excel;application/vnd.ms-excel.addin.macroenabled.12;application/vnd.ms-excel.sheet.binary.macroenabled.12;application/vnd.ms-excel.template.macroenabled.12;application/vnd.ms-excel.sheet.macroenabled.12;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    },
  },
  logLevel: 'warn',
};

exports.config = config;
