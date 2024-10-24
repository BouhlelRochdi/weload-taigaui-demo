import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';
import { PasswordInputComponent } from '../../../generics/password-input/password-input.component';
import { TuiCheckbox } from '@taiga-ui/kit/components/checkbox';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { SelectInputComponent } from '../../../generics/select-input/select-input.component';

@Component({
  selector: 'app-step1-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiCheckbox,
    TuiButton,
    TuiLink,
    PasswordInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './step1-form.component.html',
  styleUrl: './step1-form.component.scss',
})
export class Step1FormComponent {
  myForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  styles = { backgroundColor: 'blue', 'font-size': '16px' };
  roles: string[] = ['Admin', 'User', 'Guest'];

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(form: any) {
    console.log('form ====> ', form.value);
  }

  onReset() {
    this.myForm.reset();
  }

  onPasswordChange(newPassword: any) {
    this.myForm.controls['password'].setValue(newPassword);
  }
  onConfirmPasswordChange(newPassword: any) {
    this.myForm.controls['confirmPassword'].setValue(newPassword);
  }

  onSelectValueChange(selectValue: any) {
    this.myForm.controls['role'].setValue(selectValue);
  }
}
