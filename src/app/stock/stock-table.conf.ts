export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'info.open', header: 'Open' },
        { field: 'info.high', header: 'High' },
        { field: 'info.low', header: 'Low' },
        { field: 'info.close', header: 'Close' },
        { field: 'info.status', header: 'Status' },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'avg', header: 'Avg', 'editable': true },
    ];

    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'purchasedPrice', header: 'Purchased', 'editable': true },

    ];

    static favCols: any[] = [
        ...StockTableConf.commCols,
        // { field: 'data.other', header: 'other' },

    ];
}
