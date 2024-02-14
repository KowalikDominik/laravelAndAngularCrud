import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { inject } from '@angular/core/testing';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return control && control.invalid;
  }
}
type TProductErrors = {
  name: string;
  image: string;
  qty: string;
  price: string;
  description: string;
};
const CProductErrors = {
  name: '',
  image: '',
  qty: '',
  price: '',
  description: '',
};
type TProduct = {
  id?: number;
  name: string;
  image: string;
  qty: number;
  price: number;
  description: string;
};
const CProduct: TProduct = {
  name: '',
  image: '',
  qty: 0,
  price: 0.0,
  description: '',
};
@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  form: FormGroup;
  errors: TProductErrors;
  savingIsPending: boolean;
  matcher = new MyErrorStateMatcher();
  edit = false;
  constructor(
    private fBuilder: FormBuilder,
    private pService: ProductService,
    private dRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.form = this.fBuilder.group(CProduct);
    this.matcher = new MyErrorStateMatcher();
    this.errors = CProductErrors;
    this.savingIsPending = false;
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
    if (this.data) {
      this.edit = true;
    }
  }

  closeDialog() {
    this.dRef.close();
  }
  onImageSelect({ target }: any) {
    // TODO Implement adding image to request payload
    const filename = target.files[0].name;
    this.form.controls['image'].setValue(filename);
  }
  onFormSubmit() {
    if (this.form.valid) {
      this.savingIsPending = true;
      if (this.edit) {
        this.pService.editProduct(this.data.id, this.form.value).subscribe({
          next: (val: any) => {
            this.savingIsPending = false;
            // TODO Add toast notification
            alert('Item has been updated');
            this.pService.reloadProductsList();
            this.closeDialog();
          },
          error: ({ error }: any) => {
            this.savingIsPending = false;
            this.errors = error.errors;
            const errorsFields = Object.keys(this.errors);
            errorsFields.map((field) => {
              this.form.controls[field].setErrors({
                apiError: error.errors[field],
              });
            });
          },
        });
      } else {
        this.pService.addProduct(this.form.value).subscribe({
          next: (val: any) => {
            this.savingIsPending = false;
            // TODO Add toast notification
            alert('Item has been added');
            this.pService.reloadProductsList();
            this.closeDialog();
          },
          error: ({ error }: any) => {
            this.savingIsPending = false;
            this.errors = error.errors;
            const errorsFields = Object.keys(this.errors);
            errorsFields.map((field) => {
              this.form.controls[field].setErrors({
                apiError: error.errors[field],
              });
            });
          },
        });
      }
    }
  }
}
