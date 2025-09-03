import { Component } from '@angular/core';
import { Model } from '../models/model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  user: Model = { id: 0, name: '', email: '' };
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  createUser() {
    this.dataService.create(this.user).then(() => {
      this.successMessage = 'User Create Successfully!';
      this.showMessage = true;


      setTimeout(() => {
        this.showMessage = false;
        this.router.navigate(['/read']);
      }, 3000);
    });
  }
}
