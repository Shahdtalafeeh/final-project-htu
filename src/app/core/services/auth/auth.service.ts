import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserCredential } from '@firebase/auth-types';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  get isloggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }
  dbPath = '/users';
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.authStateSubscribe()
  }
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.router.navigate(['/auth/login'])
        window.alert(error.message);
      })
    )
  }

  authStateSubscribe(){

    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        if(!this.isloggedIn){
          this.router.navigate(['/home']);

        }
        localStorage.setItem('token',JSON.stringify(user))
        this.isLoggedIn$.next(true)
      } else {

        localStorage.removeItem('token')
        this.isLoggedIn$.next(false)
        this.router.navigate(['/auth/login']);
      }
    });
  }
  signup(email: string, password: string): Observable<UserCredential> {
    return from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    );
  }

  createUser(
    uId: string,
    email: string,
    name: string,
    age: number,
    gender: number
  ): Observable<any> {
    const userObjFDB = this.angularFireDatabase.object(this.dbPath);
    return from(
      userObjFDB.set({
        uId: uId,
        email: email,
        name: name,
        age: age,
        gender: gender,
      })
    );
  }

 logout() {
  return this.angularFireAuth.signOut().then(()=>{
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    this.isLoggedIn$.next(false);
  });

  }
}
