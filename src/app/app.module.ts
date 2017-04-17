import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from 'app/shared/dropdown.directive';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { AppRoutingModule } from './app-routing.module';
import { SuggestStocksComponent } from './stock/suggest-stocks/suggest-stocks.component';
import { StockStartComponent } from './stock/stock-start/stock-start.component';
import { StockDataService } from './stock/stock-data.service';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, MultiSelectModule, GrowlModule } from 'primeng/primeng';
import { StockInfoService } from './stock/stock-info.service';
import { MessageService } from './shared/message.service';
import { FooterComponent } from './footer/footer.component';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    StockListComponent,
    StockItemComponent,
    SuggestStocksComponent,
    StockStartComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    NgPipesModule,

    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    GrowlModule,
  ],
  providers: [StockInfoService, StockDataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
