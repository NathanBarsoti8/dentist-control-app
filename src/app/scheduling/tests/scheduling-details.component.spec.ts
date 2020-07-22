import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDetailsComponent } from '../scheduling-details/scheduling-details.component';

describe('SchedulingDetailsComponent', () => {
  let component: SchedulingDetailsComponent;
  let fixture: ComponentFixture<SchedulingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
