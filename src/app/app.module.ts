import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GeoDataService } from './geo-entities/directive/service/geo-data.service';
import { GeoEntitiesComponent } from './geo-entities/geo-entities.component';
import { GeoDataDirective } from './geo-entities/directive/geo-data.directive';

@NgModule({
  declarations: [
    AppComponent,
    GeoEntitiesComponent,
    GeoDataDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GeoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
