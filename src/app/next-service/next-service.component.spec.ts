import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextServiceComponent } from './next-service.component';

describe('NextServiceComponent', () => {
  let component: NextServiceComponent;
  let fixture: ComponentFixture<NextServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
