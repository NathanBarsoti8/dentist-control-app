import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCreateComponent } from '../scheduling-create/scheduling-create.component';

describe('SchedulingCreateComponent', () => {
  let component: SchedulingCreateComponent;
  let fixture: ComponentFixture<SchedulingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
