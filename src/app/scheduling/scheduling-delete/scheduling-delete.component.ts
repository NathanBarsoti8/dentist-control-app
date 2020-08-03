import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogData } from 'app/customer/models/confirm-dialog.model';

@Component({
  selector: 'app-scheduling-delete',
  templateUrl: './scheduling-delete.component.html',
  styleUrls: ['./scheduling-delete.component.css']
})
export class SchedulingDeleteComponent {

  constructor(public matDialogRef: MatDialogRef<SchedulingDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: ConfirmDialogData) { }

  sendResponse(response: boolean) {
    this._data.isConfirmed = response;
    this.matDialogRef.close(this._data);
  }

}
