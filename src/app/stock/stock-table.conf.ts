export class StockTableConf {
    static commCols: any[] = [
        { field: 'symbol', header: 'Symbol', sortable: true },
        // { field: 'info.open', header: 'Open', sortable: false },
        // { field: 'info.high', header: 'High', sortable: false },
        // { field: 'info.low', header: 'Low', sortable: false },
        // { field: 'info.close', header: 'Close', sortable: false },
        // { field: 'info.status', header: 'Inc/Dec', sortable: true },
        { field: 'open', header: 'Open', sortable: false },
        { field: 'high', header: 'High', sortable: false },
        { field: 'low', header: 'Low', sortable: false },
        { field: 'close', header: 'Close', sortable: false },
        { field: 'status', header: 'Inc/Dec %', sortable: true },
        // { field: 'info.Volume', header: 'Volume' }
        { field: 'sma', header: 'SMA', sortable: true },
        { field: 'sSignal', header: 'S Signal %', sortable: true, },
        { field: 'ema', header: 'EMA', sortable: true },
        { field: 'eSignal', header: 'E Signal %', sortable: true, },

        // { field: 'avg', header: 'Avg', sortable: true, 'editable': true, styleClass: 'editable-field' },
        // { field: 'signal', header: 'Signal %', sortable: true, 'editable': false },
    ];

    //  purCols is not used in current version
    static purCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'purchasedPrice', header: 'Purchased', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'purchasedUnit', header: 'Unit', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'profit', header: 'Gain/Loss', sortable: true, 'editable': false },
        { field: 'percentage', header: 'Gain/Loss %', sortable: true, 'editable': false },
        { field: 'minPrice', header: 'Min', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'maxPrice', header: 'Max', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'alert', header: 'Alert', },
    ];

    //  favCols is not used in current version
    static favCols: any[] = [
        ...StockTableConf.commCols,
        { field: 'minPrice', header: 'Min', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'maxPrice', header: 'Max', sortable: true, 'editable': true, styleClass: 'editable-field' },
        { field: 'alert', header: 'Alert', },
        // { field: 'data.other', header: 'other' },

    ];

    static customStyle: any[] = ['signal'];
}
