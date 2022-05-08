import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MicrobeCard } from 'src/app/models/microbeCard.model';
import { links } from 'src/app/models/microbesResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-organisms-cards',
  templateUrl: './organisms-cards.component.html',
  styleUrls: ['./organisms-cards.component.scss'],
})
export class OrganismsCardsComponent implements OnInit {
  loading: boolean = false;
  title = '';
  cards!: MicrobeCard[];
  nextPageUrl!: string;
  previousPageUrl!: string;
  links!: links[];
  routeId: string = '';
  parentNode!: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snakeBar: MatSnackBar
  ) {}

  renderCardView() {
    this.apiService.fetchMicrobes.subscribe((responseData) => {
      this.cards = responseData.data;
      this.links = responseData.links.slice(1, -1);
      this.nextPageUrl = responseData.next_page_url;
      this.previousPageUrl = responseData.prev_page_url;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.renderCardView();
    /// extracting queryParams for the identificaton of parent Nodes
    this.route.queryParams.subscribe((queryParam) => {
      this.parentNode = queryParam.parent;
    });
    /// extracting route params to populate view with the required route
    this.route.params.subscribe((params: Params) => {
      this.routeId = params.id;
      /////condition for getting All microbes
      if (this.routeId == 'all' || !this.routeId) {
        this.loading = true;
        this.apiService.getAllMicrobes().subscribe(() => {
          this.loading = false;
        });
      } else {
        //// condition fo categorywise getting microbes
        this.loading = true;
        this.apiService
          .getMicrobesByCategories(this.parentNode, +this.routeId)
          .subscribe((resData) => {
            this.loading = false;
          });
      }
    });
  }

  onPaginate(pageNo: number) {
    if (this.routeId == 'all' || !this.routeId) {
      this.loading = true;
      this.apiService.getAllMicrobes(pageNo).subscribe((resData) => {
        this.loading = false;
      });
    } else {
      //// condition fo categorywise getting microbes
      this.loading = true;
      this.apiService
        .getMicrobesByCategories(this.parentNode, +this.routeId, pageNo)
        .subscribe((resData) => {
          this.loading = false;
        });
    }
  }
  onNextAndPrevious(pageUrl: string) {
    //Here we are extracting the label as pageNo from links array of dataSource Response Data
    const currentPageLink = this.links
      .filter((link) => {
        return link.active == true;
      })
      .map((link) => {
        return link.label;
      });
    //Here we are assigning currentPageNumber Variable to the extracted label from links array
    const currentPageNumber = +currentPageLink[0];
    if (pageUrl == this.nextPageUrl) {
      //Here we Are checking IF next button is pressed Or previous and
      //adding or subracting one depending upon whick key is press next or previous
      //then we Call the same Paginate method with argument of page number that we derived
      //from current Page number + 1 if next is press and vice versa
      let nextPageNumber = currentPageNumber + 1;
      this.onPaginate(nextPageNumber);
    } else if (pageUrl == this.previousPageUrl) {
      let previousPageNumber = currentPageNumber - 1;
      this.onPaginate(previousPageNumber);
    }
  }

  onDetails(id: number) {
    this.loading = true;
    this.router.navigate(['/browse', 'id', id]);
  }
  //for collecting and decollecting microbes
  onMicrobeCollect(
    collected: boolean,
    id: number,
    message: string,
    action: string
  ) {
    this.apiService.collectDecollectMicrobe(collected, id).subscribe(
      () => {
        this.snakeBar.open(collected ? 'Decollected' : 'Collected!', '', {
          duration: 1000,
        });
      },
      (err) => {
        if (err) {
          const snackBarRef = this.snakeBar.open(message, action, {
            duration: 1000,
          });
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/auth', 'login']);
          });
        }
      }
    );
  }
}
