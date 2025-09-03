import { Component } from '@angular/core';
import { Model } from '../models/model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  user: Model = { id: 0, name: '', email: '' };
  id!: number;

  successMessage: string='';
  showMessage:boolean=false;

  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.id=+this.route.snapshot.params['id'];
    this.dataService.getById(this.id)
    .then(data=>{
      if (data) {
        this.user={...data};
      }
    })
  }


  updateUser(userForm:any){
    if(userForm.invalid) return;

    this.dataService.update(this.id,this.user).then(()=>{
      this.successMessage='User Update Successfully';
      this.showMessage=true;


      setTimeout(()=>{
        this.showMessage=false;
        this.router.navigate(['/read']);
      },3000)
    })
  }

}
