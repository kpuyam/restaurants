import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Input() restaurantId: number | null = null;
  @Output() confirmDelete = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  confirm() {
    if (this.restaurantId !== null) {
      this.confirmDelete.emit(this.restaurantId);
    }
  }

  close() {
    this.cancel.emit();
  }
}
