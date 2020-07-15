import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditProfileComponent } from 'src/app/edit-profile/edit-profile.component';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {
  public title: string;
  public text: string;
  public buttonNo: string;
  public buttonYes: string;
  // public teste: string;

  constructor(
    // private editProfileComponent:EditProfileComponent,
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.text = this.data.text;
    this.title = this.data.title;
    this.buttonYes = this.data.buttonYes;
    this.buttonNo = this.data.buttonNo;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
