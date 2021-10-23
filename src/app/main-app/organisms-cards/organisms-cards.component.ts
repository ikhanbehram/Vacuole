import { Component, OnInit } from '@angular/core';
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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllMicrobes().subscribe((cards) => {
      console.log(cards);
      this.cards = cards;
    });
  }
}
