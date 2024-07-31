import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantService } from './restaurant.service';
import { AddRestaurantModalComponent } from './add-restaurant-modal/add-restaurant-modal.component';
import { EditRestaurantModalComponent } from './edit-restaurant-modal/edit-restaurant-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    AddRestaurantModalComponent,
    EditRestaurantModalComponent,
    DeleteConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
