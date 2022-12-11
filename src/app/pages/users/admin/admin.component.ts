import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/users/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private _adminService: AdminService,
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
      this._adminService.login(this.email.value, this.password.value);
      this.router.navigate(['/startups'])
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
