import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading = false;
  collectedMicrobes: MicrobeCard[] = [];
  message!: string;
  constructor(
    private apiService: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiService.getCollectedMicrobes().subscribe();
    this.apiService.fetchCollectedMicrobes.subscribe(
      (resData) => {
        this.collectedMicrobes = resData;
        if (this.collectedMicrobes.length < 1) {
          this.message = 'No items collected yet';
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.auth.isAuthenticated.subscribe((bool) => {
      if (bool) {
        return;
      } else {
        this.router.navigate(['../']);
      }
    });
  }

  onDecollect(id: number) {
    this.apiService.deCollectMicrobe(id).subscribe((res) => {
      this.snackbar.open('Decollected', '', { duration: 1000 });
      this.apiService.getCollectedMicrobes().subscribe();
      console.log(res);
    });
  }
  onDetails(id: number) {
    this.loading = true;
    this.router.navigate(['/browse', 'id', id]);
  }
}
