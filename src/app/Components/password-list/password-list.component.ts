import { Component } from '@angular/core';
import { Password } from '../../Core/Models/Password.model';
import { PasswordService } from '../../Core/Services/password.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
listOfData: Password[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.getAllPasswords();
  }

  getAllPasswords(): void {
    this.passwordService.getAll().subscribe({
      next: (data) => {
        this.listOfData = data;
        console.log(this.listOfData)
      },
      error: (err) => {
        console.error('error while fetching passwrds: ',err);
      },
    });
  }
}
