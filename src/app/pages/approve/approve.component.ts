import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { FormService } from 'src/app/core/services/form/form.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
})
export class ApproveComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit, OnDestroy
{
  isLoggedIn$!: Observable<boolean>;
  sub!: Subscription;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'approve',
    'startupName',
    'city',
    'sectors',
    'founderName',
    'emailAddress',
    'action',
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
    this.getNewData();

    this.isLoggedIn$ = this._usersService.isLoggedIn$;
  }
  getNewData() {
    this.sub = this._formService.getAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(Object.values(result));
      this.dataSource._updateChangeSubscription();
    });
  }

  onDeleteRowClicked(id: string) {
   this._formService.delete(id);
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
    this.dataSource.paginator = this.paginator;
  }

  approveIt(row: Startups) {
 this._startupservice.create({
      startupName: row.startupName,
      logoImage: row.logoImage,
      city: row.city,
      sectors: row.sectors,
      founderName: row.founderName,
      numberOfEmployees: row.numberOfEmployees,
      yearOfEstablishment: row.yearOfEstablishment,
      websiteUrl: row.websiteUrl,
      emailAddress: row.emailAddress,
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe()

  }
}
