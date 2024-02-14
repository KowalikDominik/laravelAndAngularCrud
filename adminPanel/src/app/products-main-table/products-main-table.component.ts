import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';

export interface ProductData {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  price: number;
  updated_at: string;
}

@Component({
  selector: 'app-products-main-table',
  templateUrl: './products-main-table.component.html',
  styleUrls: ['./products-main-table.component.scss'],
})
export class ProductsMainTableComponent implements OnInit {
  dialogRef: any;
  tableColumns: {
    name: string;
    title?: string;
    date?: boolean;
    action?: boolean;
    width?: string;
  }[] = [
    { name: 'id' },
    { name: 'name', width: '40%' },
    { name: 'image' },
    { name: 'price' },
    { name: 'updated_at' },
    { name: 'action', action: true, width: '1%' },
  ];
  tableColumnNames: string[] = this.tableColumns.map((col) => col.name);
  dataSource!: MatTableDataSource<ProductData>;
  isLoading: boolean;
  errors: {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pService: ProductService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.isLoading = false;
    this.errors = {};
  }
  getProductsList() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = true;

    this.pService.getProductsList().subscribe({
      next: ({ data }: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: ({ error }: any) => {
        this.isLoading = false;
        this.errors = error.errors;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getProductsList();
    this.pService.reloadProductsListEvent.subscribe(() => {
      this.getProductsList();
    });
  }
  capitalizeFirstLetter(word: string) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }
  removeProduct(id: number) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.dialogRef.componentInstance.confirmClicked.subscribe(() => {
      this.pService.removeProduct(id).subscribe({
        next: () => {
          this.dialogRef.close();
          this.getProductsList();
          // TODO Add toast notification
          alert('item has been removed');
        },
        error: (err) => {
          console.error('Remove item error', err);
        },
      });
    });
  }
  editProduct(data: ProductData) {
    this.dialogRef = this.dialog.open(ProductAddEditComponent, { data: data });
  }
}
