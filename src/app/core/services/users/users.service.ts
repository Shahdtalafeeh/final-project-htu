import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserCredential } from '@firebase/auth-types';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  get isloggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }
  dbPath = '/users';
  userRef!: AngularFireList<User>;
  userData$ = new BehaviorSubject<User>({
    age:0,
    email:'',
    gender:0,
    name:'',
    uId:'',
    roll:''
  }) ;
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
   this.authStateSubscribe();
    this.userRef = angularFireDatabase.list(this.dbPath);
  }
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          this.router.navigate(['/users']);
          window.alert(error.message);
        })
    );
  }

  authStateSubscribe() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
this.getUserById(user.uid)
        localStorage.setItem('token', JSON.stringify(user));
        this.isLoggedIn$.next(true);
        this.router.navigateByUrl('/')
      }else{
      localStorage.removeItem('token')
        this.isLoggedIn$.next(false);

      }
      // } else {
      //   localStorage.removeItem('token');
      //   this.isLoggedIn$.next(false);
      //   this.router.navigate(['/home']);
      // }
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
    roll: string,
    gender: number
  ): Observable<any> {
    const userObjFDB = this.angularFireDatabase.list(this.dbPath);

    return from(
      userObjFDB.update(uId, {
        uId: uId,
        email: email,
        name: name,
        roll: roll,
        age: age,
        gender: gender,
      })
    );
  }
  getUserById(uId: string) {
    this.angularFireDatabase
      .object<User>(this.dbPath + '/' + uId)
      .valueChanges()
      .subscribe((user: User|null) => {
        if(user)
       { this.userData$.next(user);}

      });
  }
  logout() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('token');
       this.router.navigate(['/home']);
      this.isLoggedIn$.next(false);
    });
  }
}
