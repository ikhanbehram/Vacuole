import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { MainAppComponent } from './main-app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatTreeComponent } from './mat-tree/mat-tree.component';
import { OrganismsCardsComponent } from './organisms-cards/organisms-cards.component';
import { DetailsComponent } from './details/details.component';
import { CollectionComponent } from './collection/collection.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../customPipes/safe-html.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    MainAppComponent,
    SidenavComponent,
    MatTreeComponent,
    OrganismsCardsComponent,
    DetailsComponent,
    CollectionComponent,
    IntroductionComponent,
    SafeHtmlPipe,
  ],
  imports: [CommonModule, FeatureRoutingModule, MaterialModule, FormsModule],
})
export class FeatureModule {}
