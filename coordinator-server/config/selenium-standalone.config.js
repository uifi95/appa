module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '3.141.59',
  drivers: {
    chrome: {
      version: '86.0.4240.22',
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
    chromiumedge: {
      version: '86.0.622.43',
      arch: process.arch,
      baseURL: 'https://msedgedriver.azureedge.net'
    }
  }
};
