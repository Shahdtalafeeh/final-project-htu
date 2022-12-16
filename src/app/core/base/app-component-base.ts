import { Location } from "@angular/common";
import { Injector } from "@angular/core";
import { ApproveComponent } from "src/app/pages/approve/approve.component";
import { FormService } from "../services/form/form.service";
import { UsersService } from "../services/users/users.service";




export abstract class AppComponentBase{
  usersService: UsersService;
  location: Location
formService: FormService
  constructor(injector: Injector){
this.usersService=injector.get(UsersService)
this.location=injector.get(Location)
this.formService=injector.get(FormService)

  }
  back(){
    this.location.back()
      }
}
