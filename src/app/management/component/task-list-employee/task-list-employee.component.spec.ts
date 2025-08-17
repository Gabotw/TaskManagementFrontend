import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListEmployeeComponent } from './task-list-employee.component';

describe('TaskListEmployeeComponent', () => {
  let component: TaskListEmployeeComponent;
  let fixture: ComponentFixture<TaskListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
