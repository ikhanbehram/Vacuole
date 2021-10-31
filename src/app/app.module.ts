import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FeatureModule } from './main-app/feature.module';
import { AuthModule } from './auth/auth.module';
import { LandingComponent } from './primary/landing/landing.component';
import { AboutComponent } from './primary/about/about.component';
import { LandingToolbarComponent } from './primary/landing-toolbar/landing-toolbar.component';
import { PrimaryComponent } from './primary/primary.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AboutComponent,
    LandingToolbarComponent,
    PrimaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FeatureModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [{ provide: 'BASE_API_URL', useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
