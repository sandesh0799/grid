import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.scss'
})
export class FormPopupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.id],
      make: [data.make],
      model: [data.model],
      price: [data.price],
      isValid:[!data.isValid]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  onClose() {
    this.dialogRef.close();
  }
}

