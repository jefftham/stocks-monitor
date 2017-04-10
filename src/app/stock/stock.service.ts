import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Stock } from './stock.model';

const api = 'https://www.alphavantage.co/query?function=';
const intraday = 'TIME_SERIES_INTRADAY';
const apiKey = 1537;
const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

@Injectable()
export class StockService {

    private purchasedStockList: Stock[] = [new Stock('AAPL', 140)];
    private favoriteStockList: Stock[] = [new Stock('TSLA', 250)];
    private lastRefreshed;


    constructor(private http: Http) { }

    getPurchasedStockList() {
        return this.purchasedStockList.slice();
    }

    getFavoriteStockList() {
        return this.favoriteStockList.slice();
    }

    // CORS error occurred here, maybe the  stock api is not a modern CORS  API. use JSONP instead.
    getLiveStockInfo(symbol: string) {

        const url = api + intraday + '&symbol=' + symbol + '&interval=1min&apikey=' + apiKey;
        return this.http.get(url, { headers: headers })
            .map(
            (res: Response) => {
                return res.json();
            }
            )
            .catch(
            (error: Response) => {
                return Observable.throw('Unable to get live stock data.');

            }
            );
    }

    addPurchasedStock(stock: Stock) {
        this.purchasedStockList.push(stock);
    }

    addFavoriteStock(stock: Stock) {
        this.favoriteStockList.push(stock);
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
