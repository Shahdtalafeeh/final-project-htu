import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Admin } from '../../interfaces/admin.interface';
import { Startups } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  get isloggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }
  dbPath = '/admins';
 adminRef!: AngularFireList<Admin>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
  ) {
  }
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.router.navigate(['/users/admin'])
        window.alert(error.message);
      })
    )
  }


  // authStateSubscribe(){

  //   this.angularFireAuth.authState.subscribe((user) => {
  //     if (user) {
  //       if(!this.isloggedIn){
  //         this.router.navigate(['/home']);

  //       }
  //       localStorage.setItem('token',JSON.stringify(user))
  //       this.isLoggedIn$.next(true)
  //     } else {

  //       localStorage.removeItem('token')
  //       this.isLoggedIn$.next(false)
  //       this.router.navigate(['/auth/login']);
  //     }
  //   });
  // }




 logout() {
  return this.angularFireAuth.signOut().then(()=>{
    localStorage.removeItem('token');
    this.router.navigate(['/dashboard']);
    this.isLoggedIn$.next(false);
  });

  }
}
