import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorRestComponent } from './error-rest.component';

@Injectable()
export class ErrorRestService {

  constructor(public dialog: MatDialog) { }
  openDialog(data): void {
    const dialogRef = this.dialog.open(ErrorRestComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}