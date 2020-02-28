import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProgressControllerComponent } from './history-progress-controller.component';

describe('HistoryProgressControllerComponent', () => {
  let component: HistoryProgressControllerComponent;
  let fixture: ComponentFixture<HistoryProgressControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryProgressControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryProgressControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
