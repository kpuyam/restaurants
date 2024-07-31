import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-restaurant-modal',
  templateUrl: './add-restaurant-modal.component.html',
  styleUrls: ['./add-restaurant-modal.component.css']
})
export class AddRestaurantModalComponent implements OnInit {
  addRestaurantForm: FormGroup;
  showModal: boolean = false;
  validationError: string | null = null;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) {
    this.addRestaurantForm = this.fb.group({
      gbl_restaurant_no: [null, Validators.required],
      restaurant_name: ['', Validators.required],
      restaurant_address: ['', Validators.required],
      restaurant_owner_id: [null, Validators.required],
      restaurant_open_date: ['', Validators.required],
      restaurant_close_date: [null],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      is_active: [true]
    });
  }

  ngOnInit(): void {}

  openModal() {
    this.showModal = true;
    this.validationError = null;
  }

  closeModal() {
    this.showModal = false;
    this.addRestaurantForm.reset({
      is_active: true
    });
  }

  onSubmit() {
    if (this.addRestaurantForm.valid) {
      const formValue = this.addRestaurantForm.value;

      // Format date fields
      const formattedData = {
        ...formValue,
        restaurant_open_date: formatDate(formValue.restaurant_open_date, 'yyyy-MM-dd', 'en'),
        restaurant_close_date: formValue.restaurant_close_date ? formatDate(formValue.restaurant_close_date, 'yyyy-MM-dd', 'en') : null
      };

      // Send data to the server
      this.restaurantService.createRestaurant(formattedData).subscribe(
        () => {
          this.closeModal(); // Close modal on successful submit
          this.validationError = null;
          window.location.reload();
        },
        error => {
          this.validationError = 'Failed to add restaurant. Please check your data and try again.';
          console.error('Error creating restaurant:', error);
        }
      );
    } else {
      this.validationError = 'Please fill in all required fields.';
    }
  }
}
