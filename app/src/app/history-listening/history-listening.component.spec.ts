import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListeningComponent } from './history-listening.component';

describe('HistoryListeningComponent', () => {
  let component: HistoryListeningComponent;
  let fixture: ComponentFixture<HistoryListeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryListeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
