import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AuthState } from '../reducers';
import { User } from '../model/user.model';
import { login } from '../actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store:Store<AuthState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    console.log('this.form.value',this.form.value)
    const val = this.form.value
    this.auth.login(val.email,val.password).pipe(
      tap((u:User)=>{
              console.log('u',u)

              // this.store.dispatch({
              //                       type:'[Login] login',
              //                       payload: {
              //                                   user: u
              //                       }
              //                   })
              //is equivalent to the next line
              this.store.dispatch(login({user:u}))
              this.router.navigateByUrl('/courses')
            })
    ).subscribe(
      noop,
      ()=>console.log('Login failed'))
  }

}

