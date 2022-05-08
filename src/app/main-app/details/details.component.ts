import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/models/details.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  details!: Details;
  microbeId!: number;
  loading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.microbeId = param.id;
    });

    this.route.data.subscribe((detailsData) => {
      this.details = detailsData.details;
    });
  }

  selectRating(rating: number) {
    this.api.rateMicrobe(this.microbeId, rating).subscribe();
  }

  onSubmitComment(comment: HTMLTextAreaElement) {
    if (!comment.value.length) {
      this.snackbar.open('Please Write Something In the Comment');
      return;
    }
    this.loading = true;
    this.api.postMicrobeComment(this.microbeId, comment.value).subscribe(
      () => {
        this.loading = false;
        this.snackbar.open('Done!', '', {
          duration: 2000,
        });
        comment.value = '';
      },
      () => {
        this.loading = false;
        this.snackbar.open("Couldn't Post Your Comment Right Now", '', {
          duration: 2000,
        });
      }
    );
  }
}
