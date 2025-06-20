import { Component } from '@angular/core';
import { Password } from '../../Core/Models/Password.model';
import { PasswordService } from '../../Core/Services/password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent {
  listOfData: Password[] = [];

  isModalVisible = false;
  PasswordForm!: FormGroup;

  currentEditId: number | null = null;

  constructor(
    private passwordService: PasswordService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getAllPasswords();
    this.PasswordForm = this.fb.group({
      category: ['', Validators.required],
      app: ['', Validators.required],
      userName: ['', Validators.required],
      encryptedPassword: ['', Validators.required],
    });
  }

  getAllPasswords(): void {
    this.passwordService.getAll().subscribe({
      next: (data) => {
        this.listOfData = data;
        console.log(this.listOfData);
      },
      error: (err) => {
        console.error('error while fetching passwrds: ', err);
      },
    });
  }

  openAddModal(): void {
    this.isModalVisible = true;
    this.PasswordForm.reset();
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  submitForm(): void {
    if (this.PasswordForm.invalid) return;

    const formData = this.PasswordForm.value;

    if (this.currentEditId) {
      // EDIT
      this.passwordService.update(this.currentEditId, formData).subscribe({
        next: () => {
          this.closeModal();
          this.getAllPasswords();
          this.notification.info(
            'Password Updated',
            'Password details have been updated.'
          );
        },
        error: (err) => {
          console.error('Update failed:', err);
        },
      });
    } else {
      // ADD
      this.passwordService.add(formData).subscribe({
        next: () => {
          this.closeModal();
          this.getAllPasswords();
          this.notification.success(
            'Password Created',
            'A new password has been added successfully.'
          );
        },
        error: (err) => {
          console.error('Add failed:', err);
        },
      });
    }
  }

  openEditModal(data: Password): void {
    this.isModalVisible = true;
    this.currentEditId = data.id;
    this.PasswordForm.patchValue(data);
  }

  deletePassword(id: number): void {
    if (confirm('Are you sure you want to delete this password?')) {
      this.passwordService.delete(id).subscribe({
        next: () => {
          this.getAllPasswords();
          this.notification.warning(
            'Password Deleted',
            'The password has been deleted.'
          );
        },
        error: (err) => {
          console.error('Delete failed:', err);
        },
      });
    }
  }
}
