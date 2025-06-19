import { Component } from '@angular/core';
import { Password } from '../../Core/Models/Password.model';



@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
listOfData: Password[] = [];


  
}
