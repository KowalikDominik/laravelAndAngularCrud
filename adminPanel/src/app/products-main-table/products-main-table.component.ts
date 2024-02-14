import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';

export interface UserData {
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
export class ProductsMainTableComponent implements OnInit, AfterViewInit {
  tableColumns: {
    name: string;
    title?: string;
    date?: boolean;
    action?: boolean;
    actions?: [];
  }[] = [
    { name: 'id' },
    { name: 'name' },
    { name: 'image' },
    { name: 'price' },
    { name: 'updated_at' },
    { name: 'action', action: true },
  ];
  tableColumnNames: string[] = this.tableColumns.map((col) => col.name);
  dataSource!: MatTableDataSource<UserData>;
  isLoading: boolean;
  errors: {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pService: ProductService) {
    this.dataSource = new MatTableDataSource();
    this.isLoading = false;
    this.errors = {};
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pService.getProductsList().subscribe({
      next: ({ data }: any) => {
        console.log('res', data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log('this.dataSource', this.dataSource);
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
    console.log('this.dataSource', this.dataSource.data);
  }
  capitalizeFirstLetter(word: string) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }
}
