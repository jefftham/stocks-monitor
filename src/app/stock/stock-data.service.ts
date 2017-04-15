import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Stock } from './stock.model';
import 'rxjs/Rx';


// using Google Firebase to save  stock list
@Injectable()
export class StockDataService {
    private purchasedDB = 'https://stocks-dd1e5.firebaseio.com/purchase.json';
    private favoriteDB = 'https://stocks-dd1e5.firebaseio.com/favorite.json';

    constructor(private http: Http) { }

    savePurchasedStockList(purchasedStockList: Stock[]) {
        return this.http.put(this.purchasedDB, purchasedStockList)
            .subscribe(
            (res: Response) => { console.log('purchasedStockList is saved.'); console.log('purchasedStockList saved: ', purchasedStockList) },
            (error: Response) => { console.log(error); console.log('purchasedStockList that going to save : ', purchasedStockList) }
            );
    }

    saveFavoriteStockList(favoriteStockList: Stock[]) {
        return this.http.put(this.favoriteDB, favoriteStockList)
            .subscribe(
            (res: Response) => console.log('favoriteStockList is saved.'),
            (error: Response) => console.log(error)
            );
    }

    getPurchasedStockList() {
        return this.http.get(this.purchasedDB)
            .map(
            (res: Response) => {
                return res.json();
            }
            );
    }

    getFavoriteStockList() {
        return this.http.get(this.favoriteDB)
            .map(
            (res: Response) => {
                return res.json();
            }
            );
    }

}
