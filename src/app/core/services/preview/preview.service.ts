import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  setClickedArticle(id:string){
    localStorage.setItem('/startups/', id)
 }

 getClickedAritcleId(){
    return localStorage.getItem('/startups/');
 }
 getById(id: string) {
  return this.angularFireDatabase.object('/startups/' + id).valueChanges();
}

}
