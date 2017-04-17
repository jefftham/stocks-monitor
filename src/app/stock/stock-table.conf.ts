export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'info.open', header: 'Open' },
        { field: 'info.high', header: 'High' },
        { field: 'info.low', header: 'Low' },
        { field: 'info.close', header: 'Close' },
        { field: 'info.status', header: 'Inc/Dec' },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'avg', header: 'Avg', 'editable': true },
    ];

    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'purchasedPrice', header: 'Purchased', 'editable': true },
        { field: 'purchasedUnit', header: 'Unit', 'editable': true },
        { field: 'profit', header: 'Gain/Loss', 'editable': false },
        { field: 'percentage', header: 'Gain/Loss %', 'editable': false },

    ];

    static favCols: any[] = [
        ...StockTableConf.commCols,
        // { field: 'data.other', header: 'other' },

    ];
}
