import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  subtitle = 'Stock List';
  purchasedStockList: Stock[];
  pubchaseStocksDetail = [];
  favoriteStockList: Stock[];
  favoriteStocksDetail = [];
  constructor(private stockservice: StockService) { }

  ngOnInit() {
    this.purchasedStockList = this.stockservice.getPurchasedStockList();
    this.favoriteStockList = this.stockservice.getFavoriteStockList();
    for (const stock of this.purchasedStockList) {
      this.stockservice.getLiveStockInfo(stock.symbol).subscribe(
        (data) => {
          this.pubchaseStocksDetail.push(data);
          console.log(data);
        }
      );
    }
  }


}
