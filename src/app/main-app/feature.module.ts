import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { MainAppComponent } from './main-app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatTreeComponent } from './mat-tree/mat-tree.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    MainAppComponent,
    SidenavComponent,
    MatTreeComponent,
  ],
  imports: [CommonModule, FeatureRoutingModule, MaterialModule],
})
export class FeatureModule {}
