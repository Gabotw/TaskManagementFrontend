import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEmployeeComponent } from './sign-up-employee.component';

describe('SignUpEmployeeComponent', () => {
  let component: SignUpEmployeeComponent;
  let fixture: ComponentFixture<SignUpEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
