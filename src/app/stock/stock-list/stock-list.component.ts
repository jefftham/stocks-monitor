import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Stock } from '../stock.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/takeUntil';
import 'rxjs/Rx';

import { DataTableModule, SharedModule, SelectItem } from 'primeng/primeng';
import { StockTableConf } from '../stock-table.conf';
import { StockInfoService } from '../stock-info.service';
import { StockDataService } from '../stock-data.service';
import { MessageService } from '../../shared/message.service';
import { SubscriptionsService } from '../../shared/subscriptions.service';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StockListComponent implements OnInit, OnDestroy {
  subtitle = 'Stock List';
  purchasedStockList: Stock[] = [];
  favoriteStockList: Stock[] = [];
  selectedStock: Stock;

  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  //  private subscriptions: Array<Subscription> = [];
  // private smaSubscriptions: Array<Subscription> = [];
  // private emaSubscriptions: Array<Subscription> = [];

  // the configuration for PrimeNg table
  // columns
  purCols: any[] = StockTableConf['purCols'];
  favCols: any[] = StockTableConf['favCols'];
  // purColsOptions: SelectItem[] = [];

  public smaValue = 50;
  public emaValue = 50;


  constructor(private stockInfoService: StockInfoService,
    private stockDataService: StockDataService,
    private messageService: MessageService,
    private subService: SubscriptionsService) { }

  // ref: http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription
  // ref: http://stackoverflow.com/questions/34442693/how-to-cancel-a-subscription-in-angular2
  ngOnInit() {

    // this.messageService.inbox.next(this.messageService.send('info', 'Info Message', 'PrimeNG rocks 1'));
    // this.messageService.inbox.next(this.messageService.send('info', 'Info Message', 'PrimeNG rocks 2'));

    // get purchase stock list from db
    this.stockDataService.getPurchasedStockList().subscribe(
      (data: any[]) => {
        this.purchasedStockList = data;
        // console.log('purchased stocks: ', this.purchasedStockList);
        // this.stockDataService.savePurchasedStockList(this.purchasedStockList);
        // get stock live data
        for (const stock of this.purchasedStockList) {
          // Live
          this.stockSubscribe(stock.symbol, this.purchasedStockList, 'LIVE');

          // SMA for pur
          this.analysisSubscribe(stock.symbol, this.purchasedStockList, 'SMA', this.smaValue);

          // EMA for pur
          this.analysisSubscribe(stock.symbol, this.purchasedStockList, 'EMA', this.emaValue);

        }
      },
      (error: Response) => console.log(error)
    );

    // get favorite  stock list from db
    this.stockDataService.getFavoriteStockList().subscribe(
      (data: any[]) => {
        this.favoriteStockList = data;
        // console.log('favarite stocks: ', this.favoriteStockList);
        // this.stockDataService.saveFavoriteStockList(this.favoriteStockList);
        // get stock live data
        for (const stock of this.favoriteStockList) {
          this.stockSubscribe(stock.symbol, this.favoriteStockList, 'LIVE');

          // SMA for fav
          this.analysisSubscribe(stock.symbol, this.favoriteStockList, 'SMA', this.smaValue);

          // EMA for fav
          this.analysisSubscribe(stock.symbol, this.favoriteStockList, 'eMA', this.emaValue);
        }
      },
      (error: Response) => console.log(error)
    );

    /*    // for DataTable : allow user select witch column to display
        for (let i = 0; i < this.purCols.length; i++) {
          this.purColsOptions.push({ label: this.purCols[i].header, value: this.purCols[i] });
        }*/

  }

  onSmaBlur() {
    console.log('onSmaBlur');
    console.log(this.smaValue);

    // unsbuscribe
    this.subService.clean('sma');

    // subscribe new analysis with new period
    for (const stock of this.purchasedStockList) {
      this.analysisSubscribe(stock.symbol, this.purchasedStockList, 'SMA', this.smaValue);
    }

    // subscribe new analysis with new period
    for (const stock of this.favoriteStockList) {
      this.analysisSubscribe(stock.symbol, this.favoriteStockList, 'SMA', this.smaValue);
    }

  }

  onEmaBlur() {
    console.log('onEmaBlur');
    console.log(this.emaValue);

    // unsbuscribe
    this.subService.clean('ema');

    // subscribe new analysis with new period
    for (const stock of this.purchasedStockList) {
      this.analysisSubscribe(stock.symbol, this.purchasedStockList, 'EMA', this.emaValue);
    }

    // subscribe new analysis with new period
    for (const stock of this.favoriteStockList) {
      this.analysisSubscribe(stock.symbol, this.favoriteStockList, 'EMA', this.emaValue);
    }
  }


  onAddNewStock(newSymbol: string, stockListName: string) {
    // console.log('newStock: ', this.newStock);
    // console.log('newStock symbol : ', this.newStock.symbol);
    const symbol = newSymbol.toUpperCase();
    const stockList: Stock[] = this.stringToStockList(stockListName);

    if (symbol === '') {
      // console.log('empty stock symbol.');
      this.messageService.inbox.next(this.messageService.send('error', 'Please enter a stock symbol.'));
    } else if (this.stockAdded(symbol, stockList)) {
      // console.log(symbol + ' is added.');
      this.messageService.inbox.next(this.messageService.send('error', symbol + ' is added.'));
    } else {
      stockList.push(new Stock(symbol));
      // save the stock list
      this.onSavePurchase();
      this.onSaveFavorite();

      this.stockSubscribe(symbol, stockList, 'LIVE');

      this.analysisSubscribe(symbol, stockList, 'SMA', this.smaValue);

      this.analysisSubscribe(symbol, stockList, 'EMA', this.emaValue);
    }
  }

  // subscribe live stock info
  stockSubscribe(symbol: string, stockList: Stock[], subscriptionName: string) {

    // const stockListName = this.stockListToString(stockList);
    const newObserver = this.stockInfoService.getLiveStockInfo(symbol)
      .subscribe(
      (info: any) => {
        return this.updateStockDetail(symbol, info, stockList);
      });

    this.subService.add(newObserver, subscriptionName);

  }

  // subscribe  stock  analysis
  analysisSubscribe(symbol: string, stockList: Stock[], subscriptionName: string, days: number) {

    // const stockListName = this.stockListToString(stockList);
    const newObserver = this.stockInfoService.getStockAnalysis(subscriptionName, symbol, days, 'close')
      .subscribe(
      (info: any) => {
        return this.updateAnalysis(symbol, info, stockList);
      });

    this.subService.add(newObserver, subscriptionName);
  }


  stockAdded(symbol: string, target: Stock[]) {
    let added = false;
    target.forEach((e, i, a) => {
      if (e.symbol === symbol) {
        added = true;
      };
    });
    return added;
  }

  onDeleteStock(stock: Stock, stockListName: string) {
    // console.log('on delete stock: ', stock);
    const stockList: Stock[] = this.stringToStockList(stockListName);

    stockList.forEach((e, i, a) => {
      if (e.symbol === stock.symbol) {
        a.splice(i, 1);
      }
    });

    // save the stock list
    this.onSavePurchase();
    this.onSaveFavorite();
  }

  onMoveStockTo(stock: Stock, stockListName: string) {
    // console.log('on move stock: ', stock);
    this.messageService.inbox.next(this.messageService.send('success', stock.symbol + ' is moved.'));
    const stockList: Stock[] = this.stringToStockList(stockListName);

    stockList.push(stock);
    // delete the stock from current list
    const reverseStockListName = stockListName !== 'purchasedStockList' ? 'purchasedStockList' : 'favoriteStockList';
    this.onDeleteStock(stock, reverseStockListName);
  }

  stringToStockList(stockListName: string) {
    switch (stockListName) {
      case 'purchasedStockList': return this.purchasedStockList;
      case 'favoriteStockList': return this.favoriteStockList;
      default: console.error('unknown stock list name.');
    }
  }

  stockListToString(stockList: Stock[]) {
    let stockListName: string;

    if (JSON.stringify(stockList) === JSON.stringify(this.purchasedStockList)) {
      // purchasedStockList
      stockListName = 'purchasedStockList';
    } else if (JSON.stringify(stockList) === JSON.stringify(this.favoriteStockList)) {
      // favoriteStockList
      stockListName = 'favoriteStockList';
    } else {
      console.error('stockListToString : Unknown stockListName')
    }

    return stockListName;
  }

  // https://github.com/primefaces/primeng/issues/2535
  onEditComplete() {
    // save the stock list
    // console.log('onEditComplete()')
    this.onSavePurchase();
    this.onSaveFavorite();
  }

  onEditInit() {
    // Since onEditComplete Event only trigger when user hit  Enter on keyboard,
    // this function will  set a timer to set the data.

    let runCount = 0;

    const timerId = setInterval(
      () => {
        runCount++;
        if (runCount > 3) { clearInterval(timerId); }

        // console.log('onEdit saving');
        this.onSavePurchase();
        this.onSaveFavorite();
      }
      , 10 * 1000);    // 10 seconds
  }

  onDebug() {
    console.log('purchasedStockList: ', this.purchasedStockList);
    console.log('selectedStock :', this.selectedStock);
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

    this.subService.cleanAll();
  }

  // modify by reference
  // update the stock list from database
  updateAnalysis(symbol: string, info: object, target: Stock[]) {
    this.updateStockDetail(symbol, info, target);
  }

  // modify by reference
  // update the stock list from database
  updateStockDetail(symbol: string, info: object, target: Stock[]) {
    // console.log('passed symbol is ' + symbol);

    target.forEach((stock, index, thisArray) => {
      if (stock.symbol === symbol) {
        // console.log('updateStockDetail is updating: ', stock.symbol)

        // unpack info
        const keys = Object.keys(info);
        for (const key of keys) {
          stock[key] = parseFloat(info[key]);
        }

        const statusTodayPercentage = parseFloat(((stock['close'] - stock['open']) / stock['open'] * 100).toFixed(2));
        stock['status'] = statusTodayPercentage;

        // calculate the profit
        if (stock['purchasedPrice'] && stock['purchasedUnit']) {
          const diff = (stock['close']) - (stock['purchasedPrice']);
          const profit = diff * (stock['purchasedUnit']);
          const percentage = diff / (stock['purchasedPrice']) * 100;
          stock['profit'] = parseFloat(profit.toFixed(2));
          stock['percentage'] = parseFloat(percentage.toFixed(2));
        } else {
          stock['profit'] = null;
          stock['percentage'] = null;
        }


        // sma - signal
        if (stock['sma'] && !isNaN(stock['sma'])) {
          const diff = (stock['sma']) - (stock['close']);
          const percentage = diff / (stock['close']) * 100;
          stock['sSignal'] = parseFloat(percentage.toFixed(2));
        } else {
          stock['sSignal'] = null;
        }

        // ema - signal
        if (stock['ema'] && !isNaN(stock['ema'])) {
          const diff = (stock['ema']) - (stock['close']);
          const percentage = diff / (stock['close']) * 100;
          stock['eSignal'] = parseFloat(percentage.toFixed(2));
        } else {
          stock['eSignal'] = null;
        }

      }

      // convert string input to number
      stock['purchasedPrice'] = stock['purchasedPrice'] ? parseFloat(stock['purchasedPrice']) : null;
      stock['purchasedUnit'] = stock['purchasedUnit'] ? parseInt(stock['purchasedUnit'], 10) : null;
    });
    // console.log('updated stocks : ', target);
  }


}



// TODO
// improvement:  deleted stock is not removed from subscriptions
// improvement:  stock added in fav list can be added to pur list and move to fav later.
