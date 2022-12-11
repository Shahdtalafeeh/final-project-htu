import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private router: Router,
    private _usersService: UsersService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formbuilder.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      gender: null,
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
  onsignupClicked() {
    if (this.formGroup.invalid) {
      this.validatorFormGroup();
    } else {
      this._usersService
        .signup(this.email.value, this.password.value)
        .pipe(
          switchMap((user: any) => {
            console.log(user);
            return this._usersService.createUser(
              user.user.uid,
              this.email.value,
              this.name.value,
              this.age.value,
              'endUser',
              this.gender.value
            );
          })
        )
        .subscribe((result) => {
          this.router.navigate(['/home']);
        });
    }
  }
  validatorFormGroup() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  get name() {
    return this.formGroup.controls['name'] as FormControl;
  }
  get age() {
    return this.formGroup.controls['age'] as FormControl;
  }
  get gender() {
    return this.formGroup.controls['gender'] as FormControl;
  }
  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }
  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }
}
