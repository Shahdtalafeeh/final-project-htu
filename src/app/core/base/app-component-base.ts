import { Location } from "@angular/common";
import { Injector } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";




export abstract class AppComponentBase{
  authService: AuthService;
  location: Location
  constructor(injector: Injector){
this.authService=injector.get(AuthService)
this.location=injector.get(Location)
  }
  back(){
    this.location.back()
      }
}
