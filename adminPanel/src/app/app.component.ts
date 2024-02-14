import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'adminPanel';
  constructor(private dialog: MatDialog) {}

  openAddEditProductDialog() {
    this.dialog.open(ProductAddEditComponent);
  }
}
