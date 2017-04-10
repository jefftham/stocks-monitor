import { StocksMonitorPage } from './app.po';

describe('stocks-monitor App', () => {
  let page: StocksMonitorPage;

  beforeEach(() => {
    page = new StocksMonitorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
