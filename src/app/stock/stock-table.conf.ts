export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'info.open', header: 'Open' },
        { field: 'info.high', header: 'High' },
        { field: 'info.low', header: 'Low' },
        { field: 'info.close', header: 'Close' },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'data.avg', header: 'Avg', 'editable': true },
    ];

    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'data.purchasePrice', header: 'Purchase', 'editable': true },

    ];

    static favCols: any[] = [
        ...StockTableConf.commCols,
        // { field: 'data.other', header: 'other' },

    ];
}
