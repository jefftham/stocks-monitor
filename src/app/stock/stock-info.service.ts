import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from './stock.model';
import { StockDataService } from './stock-data.service';
import { MessageService } from '../shared/message.service';

// const api = 'https://www.alphavantage.co/query?function=';
const api = '/api/';

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


    constructor(private http: Http, private databaseService: StockDataService, private messageService: MessageService) { }


    // getPurchasedStockList() {
    //     return this.databaseService.getPubchasedStockList();


    // }

    // getFavoriteStockList() {
    //     return this.databaseService.getFavoriteStockList();
    // }



    // CORS error occurred here, maybe the  stock api is not a modern CORS  API. use  proxy or route traffic from own server
    getLiveStockInfo(symbol: string) {
        const report = 'TIME_SERIES_DAILY';
        // const report = 'TIME_SERIES_INTRADAY';

        const outputsize = 'compact';
        // const outputsize = 'full';  // or 'compact'

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
                // console.log('latest data of ' + symbol + ' : ', Object.keys(data['Time Series (Daily)'])[0]);
                data = data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]];

                // change the data key with stockEnum
                const newData = {};
                // tslint:disable-next-line:forin
                for (const key in data) {
                    newData[stockEnum[key]] = parseFloat(data[key]).toFixed(2);
                }
                // console.log(newData);
                this.messageService.inbox.next(this.messageService.send('info', 'Stock Info Update: ' + symbol));
                return newData;
            }
            )
            .catch(
            (error: Response) => {
                return Observable.throw('Unable to get live stock info.');

            }
            )
        );
    }

    getStockAnalysis(report: string, symbol: string, days: number = 50, series_type: string = 'close') {
        // http://www.alphavantage.co/query?function=SMA&symbol=F&interval=daily&time_period=50&series_type=close&apikey=1537

        const url = api + report + '&symbol=' + symbol + '&interval=daily&time_period=' + days +
            '&series_type=' + series_type + '&apikey=' + apiKey;

        let meta = '';
        switch (report.toUpperCase()) {
            case 'SMA': meta = 'Technical Analysis: SMA'; break;
            case 'EMA': meta = 'Technical Analysis: EMA'; break;
            default: console.error('Unknown report for getStockAnalysis() ');
        }

        // console.log(url);
        // return this.http.get(url, { headers: headers })
        //  return this.http.get(url)
        return Observable.timer(0, 1000 * 60 * 1).flatMap(() => this.http.get(url)
            .map(
            (res: Response) => {
                // console.log(res);
                let data = res.json();
                //  console.log(data);

                // parse data, just return the latest Technical Analysis:
                data = data[meta][Object.keys(data[meta])[0]];
                // console.log('trim: ', data);

                // change the data key with stockEnum
                const newData = {};

                // tslint:disable-next-line:forin
                for (const key in data) {
                    newData[key.toLowerCase()] = parseFloat(data[key]).toFixed(2);
                }

                // console.log(report + ' ', newData);
                this.messageService.inbox.next(this.messageService.send('info', 'Stock Analysis Update: ' + symbol));
                return newData;
            }
            )
            .catch(
            (error: Response) => {
                return Observable.throw('Unable to get analysis stock info.');

            }
            )
        );
    }


    // deletePurchasedStock(symbol: string) {
    //     this.purchasedStockList = this.purchasedStockList.filter(
    //         (stock) => { return stock.symbol === symbol; }
    //     );
    // }

    // deleteFavoriteStock(symbol: string) {
    //     this.favoriteStockList = this.favoriteStockList.filter(
    //         (stock) => { return stock.symbol === symbol; }
    //     );
    // }
}
