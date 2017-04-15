import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from './stock.model';
import { StockDataService } from './stock-data.service';

// const api = 'https://www.alphavantage.co/query?function=';
const api = '/api/';
const report = 'TIME_SERIES_DAILY';
// const report = 'TIME_SERIES_INTRADAY';
const outputsize = 'compact';
// const outputsize = 'full';  // or 'compact'
const apiKey = 1537;
// const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

const stockEnum = {
    '1. open': 'open',

    '2. high': 'high',

    '3. low': 'low',

    '4. close': 'close',

    '5. volume': 'volume'
};

@Injectable()
export class StockInfoService {

    private purchasedStockList: Stock[] = [];
    // private purchasedStockList: Stock[] = [];
    private favoriteStockList: Stock[] = [];
    // private subscribedObservables = [];
    private lastRefreshed;


    constructor(private http: Http, private databaseService: StockDataService) { }


    getPurchasedStockList() {
        return this.databaseService.getPubchasedStockList();


    }

    getFavoriteStockList() {
        return this.databaseService.getFavoriteStockList();
    }



    // CORS error occurred here, maybe the  stock api is not a modern CORS  API. use  proxy or route traffic from own server
    getLiveStockInfo(symbol: string) {

        const url = api + report + '&symbol=' + symbol + '&outputsize=' + outputsize + '&interval=1min&apikey=' + apiKey;
        // console.log(url);
        // return this.http.get(url, { headers: headers })
        //  return this.http.get(url)
        return Observable.timer(0, 1000 * 60).flatMap(() => this.http.get(url)
            .map(
            (res: Response) => {
                // console.log(res);
                let data = res.json();
                // parse data, just return the latest stock price
                console.log('latest data of ' + symbol + ' : ', Object.keys(data['Time Series (Daily)'])[0]);
                data = data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]];

                // change the data key with stockEnum
                const newData = {};
                // tslint:disable-next-line:forin
                for (const key in data) {
                    newData[stockEnum[key]] = parseFloat(data[key]).toFixed(2);
                }
                console.log(newData);
                return newData;
            }
            )
            .catch(
            (error: Response) => {
                return Observable.throw('Unable to get live stock data.');

            }
            )
        );
    }


    deletePurchasedStock(symbol: string) {
        this.purchasedStockList = this.purchasedStockList.filter(
            (stock) => { return stock.symbol === symbol; }
        );
    }

    deleteFavoriteStock(symbol: string) {
        this.favoriteStockList = this.favoriteStockList.filter(
            (stock) => { return stock.symbol === symbol; }
        );
    }
}
