import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Startups } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
formRef:[]=[]
  constructor( ) {

   }

   public formData = new BehaviorSubject<Startups>({
    startupName:'',
    logoImage:'',
    city:'',
    sectors:'',
    founderName:'',
    numberOfEmployees:0,
    yearOfEstablishment:0,
    websiteUrl:'',
    emailAddress:'',
});


  setFormData(data: Startups) {
     this.formData.next(data);
  }
  getFormData() {
     return this.formData.asObservable();
  }

}
