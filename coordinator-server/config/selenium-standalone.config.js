module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '3.141.5',
  drivers: {
    chrome: {
      version: '2.43',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    ie: {
      version: '3.150.0',
      arch: 'ia32',
      baseURL: 'https://selenium-release.storage.googleapis.com'
    },
    firefox: {
      version: '0.23.0',
      arch: process.arch,
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
    },
    edge: {
      version: '17134'
    }
  }
};
