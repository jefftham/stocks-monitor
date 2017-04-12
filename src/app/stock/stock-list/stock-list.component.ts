import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/takeUntil';
import 'rxjs/Rx';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit, OnDestroy {
  subtitle = 'Stock List';
  purchasedStockList: Stock[] = [];
  pubchaseStocksDetail = [] = [];
  favoriteStockList: Stock[] = [];
  favoriteStocksDetail = [] = [];
  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  private subscriptions: Array<Subscription> = [];

  constructor(private stockservice: StockService) { }

  // ref: http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription
  // ref: http://stackoverflow.com/questions/34442693/how-to-cancel-a-subscription-in-angular2
  ngOnInit() {
    // get purchase stock list from db
    this.stockservice.getPurchasedStockList().subscribe(
      (data: any[]) => {
        this.purchasedStockList = data;
        console.log('purchased stocks: ', this.purchasedStockList);
        this.stockservice.savePurchasedStock(this.purchasedStockList);
        // get stock live data
        for (const stock of this.purchasedStockList) {
          const newObserver = this.stockservice.getLiveStockInfo(stock.symbol)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(
            (data: any) => {
              return this.updateStockDetail(stock.symbol, data, this.pubchaseStocksDetail);
            }
            );

          this.subscriptions.push(newObserver);
        }
      },
      (error: Response) => console.log(error)
    );

    // get favorite  stock list from db
    this.stockservice.getFavoriteStockList().subscribe(
      (data: any[]) => {
        this.favoriteStockList = data;
        console.log('favarite stocks: ', this.favoriteStockList);
        this.stockservice.saveFavoriteStock(this.favoriteStockList);
        // get stock live data
        for (const stock of this.favoriteStockList) {
          const newObserver = this.stockservice.getLiveStockInfo(stock.symbol)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(
            (data: any) => {
              return this.updateStockDetail(stock.symbol, data, this.favoriteStocksDetail);
            }
            );

          this.subscriptions.push(newObserver);
        }
      },
      (error: Response) => console.log(error)
    );

  }

  // modify by reference
  updateStockDetail(symbol: string, info: object, target: any[]) {
    let found = false;
    // symbol is added
    for (let stock of target) {
      if (stock.symbol === symbol) {
        found = true;
        stock.info = info;
      }
    }

    // symbol is not added, add it now
    if (!found) {
      target.push({
        symbol: symbol,
        info: info
      })
    }
  }
  onSavePurchase() {
    this.stockservice.savePurchasedStock(this.purchasedStockList);
  }

  onSaveFavorite() {
    this.stockservice.saveFavoriteStock(this.favoriteStockList);
  }
  ngOnDestroy() {
    console.log('unsubscribe all Observables in stock-list component');
    //  this.ngUnsubscribe.complete();

    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


}
