import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDeleteComponent } from '../scheduling-delete/scheduling-delete.component';

describe('SchedulingDeleteComponent', () => {
  let component: SchedulingDeleteComponent;
  let fixture: ComponentFixture<SchedulingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
