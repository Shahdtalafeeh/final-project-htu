import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formbuilder.group({

      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
  onloginClicked() {
    if (this.formGroup.invalid) {
      this.validatorFormGroup();
    }else{
      this._authService.login(this.email.value, this.password.value);
      this.router.navigate(['/home'])
    }

  }
  validatorFormGroup(){
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  getEmailErrorMessage(){
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'you must enter a value';
    }else{
      return 'password not valid';
    }

}

  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }
  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }

}


