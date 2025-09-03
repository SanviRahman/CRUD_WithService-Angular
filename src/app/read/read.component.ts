import { Component, OnInit } from '@angular/core';
import { Model } from '../models/model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  users: Model[] = [];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    if (this.dataService.users.length === 0) {
      await this.dataService.loadUsers(); 
    }
    this.users = await this.dataService.getAll();
  }

  async loadUsers() {
    this.users = await this.dataService.getAll();
  }

}
