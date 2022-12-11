import { Location } from "@angular/common";
import { Injector } from "@angular/core";
import { UsersService } from "../services/users/users.service";




export abstract class AppComponentBase{
  usersService: UsersService;
  location: Location
  constructor(injector: Injector){
this.usersService=injector.get(UsersService)
this.location=injector.get(Location)
  }
  back(){
    this.location.back()
      }
}
