# stocks-monitor

A self-learning project that using [Angular 4](https://angular.io/) as a front-end to monitor the stocks trading info. [Nodejs](https://nodejs.org/en/) is used to build HTTPS back-end server. [Firebase](https://firebase.google.com/) as database server.

[Production Server - a private repo](https://stocks.yeadev.com)

[this demo](https://jeff-stocks-monitor.herokuapp.com/)

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
