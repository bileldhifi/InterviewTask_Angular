import { Component } from '@angular/core';
import { Password } from '../../Core/Models/Password.model';
import { PasswordService } from '../../Core/Services/password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent {
  listOfData: Password[] = [];

  isAddModalVisible = false;
  isAdding = false;
  addPasswordForm!: FormGroup;

  constructor(
    private passwordService: PasswordService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllPasswords();
    this.addPasswordForm = this.fb.group({
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
    this.isAddModalVisible = true;
    this.addPasswordForm.reset();
  }

  closeAddModal(): void {
    this.isAddModalVisible = false;
  }

  submitAddForm(): void {
    if (this.addPasswordForm.invalid) return;

    this.isAdding = true;

    this.passwordService.add(this.addPasswordForm.value).subscribe({
      next: () => {
        this.isAddModalVisible = false;
        this.isAdding = false;
        this.getAllPasswords();
      },
      error: (err: any) => {
        console.error('Add failed:', err);
        this.isAdding = false;
      },
    });
  }
}
