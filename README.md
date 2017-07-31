# stocks-monitor

A self-learning project that using [Angular 4](https://angular.io/) as a front-end to monitor the stocks trading info. [Nodejs](https://nodejs.org/en/) is used to build HTTPS back-end server. [Firebase](https://firebase.google.com/) as database server. This project included  front-end UI to allow users to add their own stocks and monitor the stocks performance, and the back-end will send out nortificatons throught Email and/or SMS (Text Message) to alert users about their stocks movement. In addition, several analysises will be running daily to reveal performance and movement of stocks in the market.

[Production Server - a private repo](https://stocks.yeadev.com)

[this demo](https://jeff-stocks-monitor.herokuapp.com/)

## Features
- [x] Authenticate by Google firebase SDK.
- [x] Allow users login with Facebook, Google or Email account.
- [x] Each user contains his own list of stocks.
- [x] Front-end UI produced by Angular 4 that allow users control their own stock list and settings.
- [x] Data transmit throught HTTPS protocol.
- [x] The info of the stocks keep update every minute.
- [x] Auto calculate Profit and Loss for purchased stocks.
- [x] Auto set min price and max price for each stock.
- [x] Auto calculate [SMA](http://www.investopedia.com/terms/s/sma.asp) & [EMA](http://www.investopedia.com/terms/e/ema.asp) and use these as a signal for stock investment.
- [x] A scheduler run every minute (during the market trading period) to check the latest stock price and send out notification.
- [x] A daily stocks summary send out at the morning to notify users for the stock last closing price and its performance.
- [x] Notification can be sent throught Email and/or Text message.
- [x] Mobile UI supported.
- [x] A daily scheduler to analyze most of the stocks in the market and disclose their one year performance and movement.
- [x] Display US Sector Performance (realtime & historical)


## Stocks API
[Alpha Vantage](https://www.alphavantage.co/)

## Front-End ([Angular 4](https://angular.io/) + [PrimeNG](http://primefaces.org/primeng/))

Contain several main component. header, footer, authenticaton, stock-list.component & growth-movement.component.

### stock-list.component

Contain user's purchased stocks, favorite stocks, and user config & preferences.

### growth-movement.component

Contain most of the stocks in the market and its analyzed performance.

### authentication

stock-list.component is protected by authGuard. Only authenticated user can access its only list in firebase.

## Back-End ( [Nodejs](https://nodejs.org/en/) + [Firebase](https://firebase.google.com/))
Several schedulers will run every weekdays during the stock market trading hours to check the users' stocks position and send SMS and/or EMAIL to users in accordingly.

A scheduler will run every mid-night, it analyzes most of the stocks in the market and update it to the database, so growth-movement.component always display the latest analysis.

# Installation in Linux

`sudo apt-get install -y git`

`cd stocks-monitor`

`bash setup.sh`

## Installation  in windows

`npm install`

## Build

`npm run build`

## Start

`npm run start`

## Development in windows

`npm run proxy`

## Debug in windows

`npm run wdebug`
