import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Startups } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root',
})
export class StartupsService {
  dbPath = '/startups';
  startupsRef!: AngularFireList<Startups>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.startupsRef = angularFireDatabase.list(this.dbPath);
  }
  getAll(): Observable<any> {
    return this.startupsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ id: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }


  getById(id: string) {
    return this.angularFireDatabase.object('/startups/' + id).valueChanges();
  }
  create(startup: Startups) {
    return this.startupsRef.push(startup);
  }
  update(key: string, startup: Startups) {
    return this.startupsRef.update(key, startup);
  }
  delete(key: string) {
    return this.startupsRef.remove(key);
  }
  deleteAll() {
    return this.startupsRef.remove();
  }
}
