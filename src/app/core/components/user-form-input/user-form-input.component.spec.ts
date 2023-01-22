import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserFormInputComponent } from './user-form-input.component';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

describe('UserFormInputComponent', () => {
  let component: UserFormInputComponent;
  let fixture: ComponentFixture<UserFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ UserFormInputComponent ],
      providers: [
        FormBuilder,
        FormGroup,
        Validators
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should', () => {

    expect(component.validInputs).toBeFalse();
  });
});
