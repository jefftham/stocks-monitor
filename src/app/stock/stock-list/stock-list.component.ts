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
  favoriteStockList: Stock[];
  constructor(private stockservice: StockService) { }

  ngOnInit() {
    this.favoriteStockList = this.stockservice.getFavoriteStockList();
    this.purchasedStockList = this.stockservice.getPurchasedStockList();
  }

}
