import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastServiceComponent } from './last-service.component';

describe('LastServiceComponent', () => {
  let component: LastServiceComponent;
  let fixture: ComponentFixture<LastServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
