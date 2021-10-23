import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './primary/about/about.component';
import { LandingComponent } from './primary/landing/landing.component';

import { PrimaryComponent } from './primary/primary.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: PrimaryComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'browse',
    loadChildren: () =>
      import('../app/main-app/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
