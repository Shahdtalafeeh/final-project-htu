import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Products } from '../../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  dbPath = '/products';
  productsRef!: AngularFireList<Products>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.productsRef = angularFireDatabase.list(this.dbPath);
  }
  getAll(): Observable<any> {
    return this.productsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ id: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }
  getById(id:string){
    return this.angularFireDatabase.object('/products/'+id).valueChanges()
  }
  create(product: Products) {
    return this.productsRef.push(product);
  }
  update(key: string, product: Products) {
    return this.productsRef.update(key, product);
  }
  delete(key: string) {
    return this.productsRef.remove(key);
  }
  deleteAll() {
    return this.productsRef.remove();
  }
}
