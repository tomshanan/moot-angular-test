import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserDetails } from '../models/user.model';
import { Guid } from '../shared/global-functions';
import { appState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as userAction from '../store/users.actions'
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  regForm: FormGroup;
  subs: Subscription;
  constructor(
    private fb: FormBuilder,
    private store: Store<appState>,
  ) {
    this.regForm = fb.group({
      name: fb.control('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      surname: fb.control('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      birthdate: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required, Validators.email]),
      office: fb.control('', [Validators.required]),
      job: fb.control('', [Validators.required]),
      passwords: fb.group({
        password: fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^.*[A-Z]+.*$/)]),
        confirmPassword: fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^.*[A-Z]+.*$/)]),
      }, { validator: this.confirm_passwords_validator })
    })
  }

  ngOnInit() {
    this.regForm.get
  }

  confirm_passwords_validator(group: FormGroup): { [s: string]: boolean } | null {
    const password = group.get('password').value
    const confirmPassword = group.get('confirmPassword').value
    return password === confirmPassword ? null : { dontMathc: true };
  }

  onSubmit() {
    this.regForm.disable()
    const formData = this.regForm.value
    console.log(formData)
    const userDetails: UserDetails = {
      id: Guid.newGuid(),
      name: formData.name,
      surname: formData.surname,
      birthdate: formData.birthdate,
      email: formData.email,
      office: formData.office,
      job: formData.job,
    }
    // ...REGISTER USER WITH PASSWORD... THEN
    this.store.dispatch(new userAction.AddUser({ user: userDetails }))
    this.regForm.reset()
    this.regForm.enable()
  }
}
