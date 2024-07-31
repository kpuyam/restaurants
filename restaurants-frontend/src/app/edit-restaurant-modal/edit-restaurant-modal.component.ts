import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant-modal',
  templateUrl: './edit-restaurant-modal.component.html',
  styleUrls: ['./edit-restaurant-modal.component.css']
})
export class EditRestaurantModalComponent implements OnInit {
  editRestaurantForm: FormGroup;
  restaurantId: number | null = null;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) {
    this.editRestaurantForm = this.fb.group({
      gbl_restaurant_no: [null, Validators.required],
      restaurant_name: ['', Validators.required],
      restaurant_address: ['', Validators.required],
      restaurant_owner_id: [null, Validators.required],
      restaurant_open_date: ['', Validators.required],
      restaurant_close_date: [''],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      is_active: [true, Validators.required]
    });
  }

  ngOnInit(): void {}

  openModal(restaurantId: number) {
    this.restaurantId = restaurantId;
    this.restaurantService.getRestaurantById(restaurantId).subscribe(restaurant => {
      this.editRestaurantForm.patchValue({
        gbl_restaurant_no: restaurant.gbl_restaurant_no,
        restaurant_name: restaurant.restaurant_name,
        restaurant_address: restaurant.restaurant_address,
        restaurant_owner_id: restaurant.restaurant_owner_id,
        restaurant_open_date: restaurant.restaurant_open_date,
        restaurant_close_date: restaurant.restaurant_close_date,
        longitude: restaurant.longitude,
        latitude: restaurant.latitude,
        is_active: restaurant.is_active
      });
      document.getElementById('editRestaurantModal')!.style.display = 'block';
    });
  }

  closeModal() {
    document.getElementById('editRestaurantModal')!.style.display = 'none';
  }

  onSubmit() {
    if (this.editRestaurantForm.valid) {
      const formattedData = {
        ...this.editRestaurantForm.value,
        restaurant_open_date: new Date(this.editRestaurantForm.value.restaurant_open_date).toISOString().split('T')[0],
        restaurant_close_date: this.editRestaurantForm.value.restaurant_close_date ? new Date(this.editRestaurantForm.value.restaurant_close_date).toISOString().split('T')[0] : null
      };

      this.restaurantService.updateRestaurant(this.restaurantId!, formattedData).subscribe(
        () => {
          this.closeModal();
          window.location.reload();
        },
        error => console.error('Error updating restaurant:', error)
      );
    }
  }
}
