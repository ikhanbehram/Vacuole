import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app.component';
import { OrganismsCardsComponent } from './organisms-cards/organisms-cards.component';
import { DetailsComponent } from './details/details.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'type/:type',
        component: OrganismsCardsComponent,
      },
      { path: 'id/:id', component: DetailsComponent },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      { path: '', redirectTo: 'type/all', pathMatch: 'full' },
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
