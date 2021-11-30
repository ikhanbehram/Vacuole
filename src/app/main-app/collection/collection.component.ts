import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MicrobeCard } from 'src/app/models/microbeCard.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  collectedMicrobes: MicrobeCard[] = [];
  constructor(
    private apiService: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getCollectedMicrobes().subscribe();
    this.apiService.fetchCollectedMicrobes.subscribe((resData) => {
      this.collectedMicrobes = resData;
    });
    this.auth.isAuthenticated.subscribe((bool) => {
      if (bool) {
        return;
      } else {
        this.router.navigate(['../']);
      }
    });
  }
}
