import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private api: ApiService) {}

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
}
