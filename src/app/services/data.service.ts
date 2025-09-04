import { Injectable } from '@angular/core';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public users: Model[] = [];

  constructor() { }


  //Load inital users
  async loadUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const ans = await res.json();
    this.users = ans;

    return this.users;
  }

  //Get All Users
  async getAll() {
    return this.users;
  }


  //Get User by ID
  async getById(id: number) {
    return this.users.find(index => index.id === id);
  }


  //Create User
  async create(user: Model) {
    //Assign new ID locally
    user.id = this.users.length ? Math.max(...this.users.map(index => index.id)) + 1 : 1;
    this.users.push(user);

    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })

    return user;
  }

  
  //Update User
  async update(id: number, user: Model) {
    const index = this.users.findIndex(para => para.id === id);

    if (index > -1) {
      this.users[index] = user;//Update local array
    }

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user)
    })

    return user;
  }


  //Delete User
  async delete(id:number){
    this.users=this.users.filter(para=>para.id !== id); //Update local array

    await fetch (`https://jsonplaceholder.typicode.com/users/${id}`,{
      method:'DELETE'
    })
  }

}
