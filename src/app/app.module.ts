import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { Wildcard404Component } from './primary/wildcard404/wildcard404.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AboutComponent,
    LandingToolbarComponent,
    PrimaryComponent,
    Wildcard404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FeatureModule,
    AuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
