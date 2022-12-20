import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'lodash';
import { Observable } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-startups',
  templateUrl: './startups.component.html',
  styleUrls: ['./startups.component.css'],
})
export class StartupsComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit
{
  isLoggedIn$!: Observable<boolean>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'select',
    'startupName',
    // 'logoImage',
    'city',
    'sectors',
    // 'founderName',
    'numberOfEmployees',
    'yearOfEstablishment',
    // 'websiteUrl',
    'emailAddress',
    'action',
  ];
  dataSource = new MatTableDataSource<Startups>([]);
  selection = new SelectionModel<any>(true, []);
  dropList:Startups[]=[]
  apiResponse:Startups[]=[]
  filterData = {
    sectors: ''
  };
  constructor(
    private router: Router,
    injector: Injector,
    private _startupservice: StartupsService,
    private _usersService: UsersService,
    private _sectorservice: SectorsService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllstart();
    this.isLoggedIn$ = this._usersService.isLoggedIn$;
    this.dataSource.filterPredicate = function (record, filter) {
      return record.sectors.toLocaleLowerCase() == filter.toLocaleLowerCase();
    };


    this.getAllsectors()
  }
  getAllstart() {
    this._startupservice.getAll().subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.apiResponse=result
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.dataSource._updateChangeSubscription();
    });
  }
  getAllsectors() {
    this._sectorservice.getAll().subscribe((result) => {
      this.dropList =result

    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: any) => {
      const searchString = JSON.parse(filter);
      let sectorFilter = null;
      let cityFilter = null;
      let finalDataFilter = true;
      if (searchString.sectors !== '') {
        sectorFilter = data.sectors
          .toString()
           .trim()
          .toLowerCase()
          .includes(searchString.sectors.toLowerCase());
        finalDataFilter = finalDataFilter && sectorFilter;
      }
      if (searchString.city !== '') {
        cityFilter = data.city
          .toString()
          .trim()
          .toLowerCase()
          .includes(searchString.city.toLowerCase());
        finalDataFilter = finalDataFilter || cityFilter;
      }

      return finalDataFilter;
    };
    return myFilterPredicate;
  }

  onDeleteRowClicked(id: string) {
    this._startupservice.delete(id);
  }
  onEditRowClicked(id: string) {
    this.router.navigate(['/startups/edit-startup'], {
      queryParams: {
        id: id,
      },
    });
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
  onAddClicked() {
    this.router.navigate(['/startups/add-startup']);
  }
  onRowClicked(id:string) {
    this.router.navigate(['/startups/preview-startup'],{
      queryParams:{
        id:id,
      }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue !== null && filterValue !== '') {
      this.filterData.sectors = filterValue.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.filterData);
    } else {
      this.filterData.sectors = '';
      this.dataSource.filter = JSON.stringify(this.filterData);
    }

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onOptionsSelected(event:any){

    const selectFilter=this.apiResponse.filter((item)=>{
       return item.sectors.toLowerCase() == event.value.toLowerCase()



    })
this.dataSource=new MatTableDataSource(selectFilter)

}
}
