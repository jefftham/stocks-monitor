import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from 'app/shared/dropdown.directive';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { AppRoutingModule } from './app-routing.module';
import { SuggestStocksComponent } from './stock/suggest-stocks/suggest-stocks.component';
import { StockService } from './stock/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    StockListComponent,
    StockItemComponent,
    SuggestStocksComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
