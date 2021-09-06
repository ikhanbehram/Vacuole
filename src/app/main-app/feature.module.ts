import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { MainAppComponent } from './main-app.component';

@NgModule({
  declarations: [ToolbarComponent, MainAppComponent],
  imports: [CommonModule, FeatureRoutingModule, MaterialModule],
})
export class FeatureModule {}
