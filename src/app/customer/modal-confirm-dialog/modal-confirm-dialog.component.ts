import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ConfirmDialogData } from '../models/confirm-dialog.model';

@Component({
  selector: 'app-modal-confirm-dialog',
  templateUrl: './modal-confirm-dialog.component.html',
  styleUrls: ['./modal-confirm-dialog.component.css']
})
export class ModalConfirmDialogComponent {

  constructor(public matDialogRef: MatDialogRef<ModalConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: ConfirmDialogData) { }

  sendResponse(response: boolean) {
    this._data.isConfirmed = response;
    this.matDialogRef.close(this._data);
  }

}

