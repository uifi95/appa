const config = {
    capabilities:
    {
        browserName: 'chrome',
        'goog:loggingPrefs': {
            browser: 'ALL',
            performance: 'ALL',
            driver: 'ALL',
        },
        'goog:chromeOptions': {
            w3c: false,
            'args': ["--disable-gpu","--no-sandbox", "--disable-dev-shm-usage", '--lang=en-US;q=0.8,en;q=0.7'],
        },
    },
    logLevel: 'warn',
};

exports.config = config;