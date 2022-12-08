import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { observeInsideAngular } from '@angular/fire';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Products } from 'src/app/core/interfaces/products.interface';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'select',
    'productName',
    'description',
    'category',
    'quantity',
    'action',
  ];
  dataSource = new MatTableDataSource<Products>([]);
  selection = new SelectionModel<any>(true, []);
  constructor(
    private router: Router,
    injector: Injector,
    private _productService: ProductService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._productService.getAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource._updateChangeSubscription();
    });
  }
  onDeleteRowClicked(id:string){
    this._productService.delete(id)

  }
  onEditRowClicked(id:string){
this.router.navigate(['/products/edit-product'],{
  queryParams:{
    id:id,
  }
})
}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  onAddClicked() {
    this.router.navigate(['/products/create-products']);
  }
  onRowClicked() {
    this.router.navigate(['/products/preview-products']);
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
}
