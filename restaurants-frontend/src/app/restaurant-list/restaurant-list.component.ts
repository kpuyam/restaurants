import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { AddRestaurantModalComponent } from '../add-restaurant-modal/add-restaurant-modal.component';
import { EditRestaurantModalComponent } from '../edit-restaurant-modal/edit-restaurant-modal.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  @ViewChild('addRestaurantModal') addRestaurantModal!: AddRestaurantModalComponent;
  @ViewChild('editRestaurantModal') editRestaurantModal!: EditRestaurantModalComponent;

  showDeleteConfirmationModal: boolean = false;
  restaurantToDelete: number | null = null;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  openAddRestaurantModal() {
    this.addRestaurantModal.openModal();
  }

  openEditRestaurantModal(id: number) {
    this.editRestaurantModal.openModal(id);
  }

  openDeleteConfirmationModal(id: number) {
    this.restaurantToDelete = id;
    this.showDeleteConfirmationModal = true;
  }

  closeDeleteConfirmationModal() {
    this.showDeleteConfirmationModal = false;
    this.restaurantToDelete = null;
  }

  handleConfirmDelete(restaurantId: number) {
    if (restaurantId !== null) {
      this.restaurantService.deleteRestaurant(restaurantId).subscribe(
        () => {
          this.closeDeleteConfirmationModal();
          // this.loadRestaurants();
          window.location.reload();
        },
        error => {
          console.error('Error deleting restaurant:', error);
          this.closeDeleteConfirmationModal();
        }
      );
    }
  }
}
