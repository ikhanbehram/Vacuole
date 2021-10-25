import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MicrobeCard } from 'src/app/models/microbeCard.model';
import { ApiService } from '../services/api.service';
interface res {
  data: [];
}
@Component({
  selector: 'app-organisms-cards',
  templateUrl: './organisms-cards.component.html',
  styleUrls: ['./organisms-cards.component.scss'],
})
export class OrganismsCardsComponent implements OnInit {
  title = '';
  cards: MicrobeCard[] = [];
  routeId: string = '';
  parentNode!: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    /// extracting queryParams for the identificaton of parent Nodes
    this.route.queryParams.subscribe((queryParam) => {
      this.parentNode = queryParam.parent;
    });
    /// extracting route params to populate view with the required route
    this.route.params.subscribe((params: Params) => {
      this.routeId = params.id;
      /////consdition for getting All microbes
      if (this.routeId == 'all' || !this.routeId) {
        this.apiService.getAllMicrobes().subscribe((resCards) => {
          this.cards = resCards;
        });
      } else {
        //// consition fo categorywise getting microbes
        this.apiService
          .getMicrobesByCategories(this.parentNode, +this.routeId)
          .subscribe((resData) => {
            this.cards = resData;
          });
      }
    });
  }
}
