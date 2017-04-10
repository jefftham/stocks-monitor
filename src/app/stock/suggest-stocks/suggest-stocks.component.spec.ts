import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestStocksComponent } from './suggest-stocks.component';

describe('SuggestStocksComponent', () => {
  let component: SuggestStocksComponent;
  let fixture: ComponentFixture<SuggestStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
