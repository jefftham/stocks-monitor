export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'info.Open', header: 'Open' },
        { field: 'info.High', header: 'High' },
        { field: 'info.Low', header: 'Low' },
        { field: 'info.Close', header: 'Close' },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'data.Avg', header: 'Avg', 'editable': true },
    ];

    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'data.PurchasePrice', header: 'Purchase', 'editable': true },

    ];

    static favCols: any[] = [
        ...StockTableConf.commCols,
        // { field: 'data.other', header: 'other' },

    ];
}
