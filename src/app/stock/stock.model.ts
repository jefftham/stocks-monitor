export class Stock {
    // info :  save latest live stock info, eg. Open, Close, ....
    // data  : save custome data, eg. Avg, pruchase price ....
    constructor(public symbol: string, public avg?: any, public info?: object) { }


}
