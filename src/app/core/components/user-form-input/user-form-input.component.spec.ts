import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormInputComponent } from './user-form-input.component';

describe('UserFormInputComponent', () => {
  let component: UserFormInputComponent;
  let fixture: ComponentFixture<UserFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
