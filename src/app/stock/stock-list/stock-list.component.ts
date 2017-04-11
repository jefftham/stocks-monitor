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
  purchasedStockList: Stock[];
  pubchaseStocksDetail = [];
  favoriteStockList: Stock[];
  favoriteStocksDetail = [];
  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  private subscriptions: Array<Subscription> = [];

  constructor(private stockservice: StockService) { }

  // ref: http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription
  // ref: http://stackoverflow.com/questions/34442693/how-to-cancel-a-subscription-in-angular2
  ngOnInit() {
    this.purchasedStockList = this.stockservice.getPurchasedStockList();
    this.favoriteStockList = this.stockservice.getFavoriteStockList();
    for (const stock of this.purchasedStockList) {
      const newObserver = this.stockservice.getLiveStockInfo(stock.symbol)
        // .takeUntil(this.ngUnsubscribe)
        .subscribe(
        (data) => {
          this.pubchaseStocksDetail.push(data);
          console.log(data);
        }
        );
      this.subscriptions.push(newObserver);
    }
  }

  ngOnDestroy() {
    console.log('unsubscribe all Observables in stock-list component');
    //  this.ngUnsubscribe.complete();

    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


}
