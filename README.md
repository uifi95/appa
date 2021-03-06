# Appa

A project that synchronizes web browser actions using webdriver.io

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You will need
* [Node and npm](https://nodejs.org/) - with the package there you can install both.
* [Java 8+](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

Also you will need to have the browsers installed which you want to use.
We currently support these four:

```
Microsoft Edge
Firefox
Chrome
Internet Explorer
```

### Installing

Clone the repo and then
```
cd ./coordinator-server
npm install
```

After that run

```
npm run selenium-install
```

And finally

```
npm start   
```
## Run with server side debugging 

```
npm run debug
```

This will open 3 browsers, Go into the chrome one, and start clicking around.

## High level diagram

![diagram](./docs/diagram.svg)

## Built With

* [NodeJS](https://nodejs.org/) - For coordination server
* [WebDriverIO](https://webdriver.io/) - Event Simulation
* [Selenium Standalone](https://webdriver.io/docs/selenium-standalone-service.html) - Used to manage webdrivers


## Authors

* **Sergiu Uifalean** - [uifi95](https://github.com/uifi95)
* **Adelina Roxana Suhani** - The idea lady - [AdelaS](https://github.com/AdelaS)
* **Adrian Constantin Borsos**  [AdiBorsos](https://github.com/AdiBorsos)
* **Peter Sandor** - [sanyee04](https://github.com/sanyee04)


## License

This project is licensed under the MIT License
