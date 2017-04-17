export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol', sortable: true },
        { field: 'info.open', header: 'Open', sortable: false },
        { field: 'info.high', header: 'High', sortable: false },
        { field: 'info.low', header: 'Low', sortable: false },
        { field: 'info.close', header: 'Close', sortable: false },
        { field: 'info.status', header: 'Inc/Dec', sortable: true },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'avg', header: 'Avg', sortable: true, 'editable': true },
        { field: 'signal', header: 'Signal %', sortable: true, 'editable': false },
    ];

    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'purchasedPrice', header: 'Purchased', sortable: true, 'editable': true },
        { field: 'purchasedUnit', header: 'Unit', sortable: true, 'editable': true },
        { field: 'profit', header: 'Gain/Loss', sortable: true, 'editable': false },
        { field: 'percentage', header: 'Gain/Loss %', sortable: true, 'editable': false },

    ];

    static favCols: any[] = [
        ...StockTableConf.commCols,
        // { field: 'data.other', header: 'other' },

    ];
}
