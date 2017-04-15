import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stock } from '../stock.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/takeUntil';
import 'rxjs/Rx';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { StockTableConf } from '../stock-table.conf';
import { StockInfoService } from '../stock-info.service';
import { StockDataService } from '../stock-data.service';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit, OnDestroy {
  subtitle = 'Stock List';
  purchasedStockList: Stock[] = [];
  favoriteStockList: Stock[] = [];

  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  private subscriptions: Array<Subscription> = [];

  // the configuration for PrimeNg table
  // columns
  purCols: any[] = StockTableConf['purCols'];
  favCols: any[] = StockTableConf['favCols'];


  constructor(private stockInfoService: StockInfoService, private stockDataService: StockDataService) { }

  // ref: http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription
  // ref: http://stackoverflow.com/questions/34442693/how-to-cancel-a-subscription-in-angular2
  ngOnInit() {
    // get purchase stock list from db
    this.stockInfoService.getPurchasedStockList().subscribe(
      (data: any[]) => {
        this.purchasedStockList = data;
        console.log('purchased stocks: ', this.purchasedStockList);
        this.stockDataService.savePurchasedStockList(this.purchasedStockList);
        // get stock live data
        for (const stock of this.purchasedStockList) {
          const newObserver = this.stockInfoService.getLiveStockInfo(stock.symbol)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(
            (info: any) => {
              return this.updateStockDetail(stock.symbol, info, this.purchasedStockList);
            }
            );

          // add to subscriptions, for destroy ithe observable when change component
          this.subscriptions.push(newObserver);
        }
      },
      (error: Response) => console.log(error)
    );

    // get favorite  stock list from db
    this.stockInfoService.getFavoriteStockList().subscribe(
      (data: any[]) => {
        this.favoriteStockList = data;
        console.log('favarite stocks: ', this.favoriteStockList);
        this.stockDataService.saveFavoriteStockList(this.favoriteStockList);
        // get stock live data
        for (const stock of this.favoriteStockList) {
          const newObserver = this.stockInfoService.getLiveStockInfo(stock.symbol)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(
            (info: any) => {
              return this.updateStockDetail(stock.symbol, info, this.favoriteStockList);
            }
            );

          this.subscriptions.push(newObserver);
        }
      },
      (error: Response) => console.log(error)
    );

  }


  onSavePurchase() {
    this.stockDataService.savePurchasedStockList(this.purchasedStockList);
  }

  onSaveFavorite() {
    this.stockDataService.saveFavoriteStockList(this.favoriteStockList);
  }

  ngOnDestroy() {
    console.log('unsubscribe all Observables in stock-list component');
    //  this.ngUnsubscribe.complete();

    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  // modify by reference
  // update the stock list from database
  updateStockDetail(symbol: string, info: object, target: Stock[]) {

    target.forEach((stock, index, thisArray) => {
      if (stock.symbol === symbol) {
        stock.info = info;
      }
    });
    console.log('updated stocks : ', target);
  }


}
