import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { FormService } from 'src/app/core/services/form/form.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent extends AppComponentBase
implements OnInit, AfterViewInit
{
  isLoggedIn$!: Observable<boolean>;

@ViewChild(MatPaginator)
paginator!: MatPaginator;
displayedColumns: string[] = [
  'select',
  'startupName',
  'logoImage',
  'city',
  'sectors',
  'founderName',
  'numberOfEmployees',
  'yearOfEstablishment',
  'websiteUrl',
  'emailAddress',
  'action'
];
dataSource = new MatTableDataSource<Startups>([]);
selection = new SelectionModel<any>(true, []);
constructor(
  private router: Router,
  injector: Injector,
  private _startupservice: StartupsService,
  private _usersService: UsersService,
  private _formService: FormService
) {
  super(injector);
}

ngOnInit(): void {
  this.getNewData()

  this.isLoggedIn$=this._usersService.isLoggedIn$;

}
getNewData(){
  this._formService.getFormData().subscribe((result:any)=>{
    console.log(result)
    this.dataSource=new MatTableDataSource(result);
    this.dataSource._updateChangeSubscription();
  })

}

onDeleteRowClicked(id:string){
  this._startupservice.delete(id)

}


isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}

onRowClicked() {
  this.router.navigate(['/preview']);
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
}

}
