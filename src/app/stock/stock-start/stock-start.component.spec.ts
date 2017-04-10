import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStartComponent } from './stock-start.component';

describe('StockStartComponent', () => {
  let component: StockStartComponent;
  let fixture: ComponentFixture<StockStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
