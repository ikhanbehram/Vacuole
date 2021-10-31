import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app.component';
import { OrganismsCardsComponent } from './organisms-cards/organisms-cards.component';
import { DetailsComponent } from './details/details.component';
import { CollectionComponent } from './collection/collection.component';
import { IntroductionComponent } from './introduction/introduction.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'intro',
        component: IntroductionComponent,
      },
      {
        path: 'type',
        component: OrganismsCardsComponent,
      },
      {
        path: 'type/:id',
        component: OrganismsCardsComponent,
      },
      { path: 'id/:id', component: DetailsComponent },
      { path: '', redirectTo: 'intro', pathMatch: 'full' },
      {
        path: 'collection',
        component: CollectionComponent,
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
