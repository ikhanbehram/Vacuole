import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app.component';
import { OrganismsCardsComponent } from './organisms-cards/organisms-cards.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{ path: ':type', component: OrganismsCardsComponent }],
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
