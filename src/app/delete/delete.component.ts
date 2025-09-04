import { Component } from '@angular/core';
import { Model } from '../models/model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  id!: number;
  user!: Model | undefined;

  successMessage: string = '';
  showMessage: boolean = false;


  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.dataService.getById(this.id).then(data => (this.user = data));
  }

  conformDelete() {
    if (!this.user) {
      return;
    }

    this.dataService.delete(this.id).then(() => {
      this.successMessage = 'User Delete Successfully!';
      this.showMessage = true;


      setTimeout(() => {
        this.showMessage = false;
        this.router.navigate(['/read']);
      }, 3000);
    })
  }


  closePage() {
    this.router.navigate(['/read']);
  }

}


