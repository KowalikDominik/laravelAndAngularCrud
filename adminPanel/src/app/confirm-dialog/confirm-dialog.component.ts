import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Output() confirmClicked = new EventEmitter<any>();
  isPending = false;
  constructor(private dRef: MatDialogRef<ConfirmDialogComponent>) {}

  confirmDialog() {
    this.isPending = true;
    this.confirmClicked.emit();
  }
  closeDialog() {
    this.dRef.close();
  }
}
