import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-toolbar',
  templateUrl: './landing-toolbar.component.html',
  styleUrls: ['./landing-toolbar.component.scss'],
})
export class LandingToolbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
