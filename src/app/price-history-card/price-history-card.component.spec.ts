import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceHistoryCardComponent } from './price-history-card.component';

describe('PriceHistoryCardComponent', () => {
  let component: PriceHistoryCardComponent;
  let fixture: ComponentFixture<PriceHistoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceHistoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
