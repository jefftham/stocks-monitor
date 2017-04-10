import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Stock } from './stock.model';

@Injectable()
export class StockService {
    private purchasedStockList: Stock[] = [new Stock('APPL', 140)];
    private favoriteStockList: Stock[] = [new Stock('TSLA', 250)];

    getPurchasedStockList() {
        return this.purchasedStockList.slice();
    }

    getFavoriteStockList() {
        return this.favoriteStockList.slice();
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
        )
    }

    deleteFavoriteStock(symbol: string) {
        this.favoriteStockList = this.favoriteStockList.filter(
            (stock) => { return stock.symbol === symbol; }
        )
    }
}
