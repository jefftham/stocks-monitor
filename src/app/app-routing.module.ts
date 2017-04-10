import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { SuggestStocksComponent } from './stock/suggest-stocks/suggest-stocks.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/stock', pathMatch: 'full' },
    {
        path: 'stock', component: StockListComponent, children: [

            { path: ':symbol', component: StockItemComponent }
        ]

    },
    { path: 'suggest', component: SuggestStocksComponent },



];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
