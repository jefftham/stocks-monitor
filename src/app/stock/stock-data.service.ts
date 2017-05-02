import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Stock } from './stock.model';
import 'rxjs/Rx';
import { MessageService } from '../shared/message.service';
import { environment } from '../../environments/environment.prod';


// using Google Firebase to save  stock list
@Injectable()
export class StockDataService {
    private purchasedDB = environment.purchasedDB;
    private favoriteDB = environment.favoriteDB;
    private configDB = environment.configDB;

    constructor(private http: Http, private messageService: MessageService) { }

    savePurchasedStockList(purchasedStockList: Stock[]) {
        return this.http.put(this.purchasedDB, purchasedStockList)
            .subscribe(
            (res: Response) => {
                // console.log('purchasedStockList is saved.');
                this.messageService.inbox.next(this.messageService.send('success', 'Purchased Stocks saved.'));
            },
            (error: Response) => {
                console.log(error);
                console.log('purchasedStockList that going to save : ', purchasedStockList);
                this.messageService.inbox.next(this.messageService.send('error', 'Purchased Stocks is not saved.'));
            }
            );
    }

    saveFavoriteStockList(favoriteStockList: Stock[]) {
        return this.http.put(this.favoriteDB, favoriteStockList)
            .subscribe(
            (res: Response) => this.messageService.inbox.next(this.messageService.send('success', 'Favorite Stocks saved.')),
            (error: Response) => {
                console.log(error);
                console.log('favoriteStockList that going to save : ', favoriteStockList);
                this.messageService.inbox.next(this.messageService.send('error', 'Favorite Stocks is not saved.'));
            }
            );
    }


    saveConfig(config: object) {
        return this.http.put(this.configDB, config)
            .subscribe(
            (res: Response) => console.log('Saved config'),
            (error: Response) => {
                console.log(error);
                console.log('config that going to save : ', config);
            }
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

    getConfig() {
        return this.http.get(this.configDB)
            .map(
            (res: Response) => {
                return res.json();
            }
            );
    }

}
