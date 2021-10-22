import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
interface res {
  data: [];
}
@Component({
  selector: 'app-organisms-cards',
  templateUrl: './organisms-cards.component.html',
  styleUrls: ['./organisms-cards.component.scss'],
})
export class OrganismsCardsComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('Hi');
  }
  ngOnInit(): void {}
}
