import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoggedIn$!: Observable<boolean>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'sectors',
    'designColor',
    'parentCategoryName',
    'action',
  ];
  dataSource = new MatTableDataSource<Sectors>([]);
  selection = new SelectionModel<any>(true, []);
  value: any;
  sub!: Subscription;
  loading = true;
  filterData = {
    sectors: '',
  };
  constructor(
    private router: Router,
    private _sectorservice: SectorsService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAllsectors();
    this.isLoggedIn$ = this._usersService.isLoggedIn$;
  }
  getAllsectors() {
    this.sub = this._sectorservice.getAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.customFilterPredicate();

      this.dataSource._updateChangeSubscription();
      this.loading = false;
    });
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: any) => {
      const searchString = JSON.parse(filter);
      let sectorFilter = null;
      let finalDataFilter = true;
      if (searchString.sectors !== null) {
        sectorFilter = data.sectors
          .toString()
          .trim()
          .toLowerCase()
          .includes(searchString.sectors.toLowerCase());
        finalDataFilter = finalDataFilter && sectorFilter;
      }

      return finalDataFilter;
    };
    return myFilterPredicate;
  }

  onDeleteRowClicked(id: string) {
    this._sectorservice.delete(id);
  }
  onEditRowClicked(id: string) {
    this.router.navigate(['/sectors/edit-sector'], {
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
    this.router.navigate(['/sectors/add-sector']);
  }
  onRowClicked(id: string) {
    this.router.navigate(['/sectors/preview-sector'], {
      queryParams: {
        id: id,
      },
    });
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
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
