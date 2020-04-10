const config = {
  capabilities:
  {
    browserName: 'internet explorer',
    "se:ieOptions": {
      "ie.ensureCleanSession": true,
      'ie.ensureCleanSession':true,
      'ignoreProtectedModeSettings': true,
    },
  },
  logLevel: 'warn',
};

exports.config = config;
