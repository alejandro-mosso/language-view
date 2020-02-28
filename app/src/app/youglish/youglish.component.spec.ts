import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouglishComponent } from './youglish.component';

describe('YouglishComponent', () => {
  let component: YouglishComponent;
  let fixture: ComponentFixture<YouglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
