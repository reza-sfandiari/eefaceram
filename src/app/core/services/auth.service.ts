import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

 
  public signIn(userData: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    if(userData.username === 'admin' && userData.password === 'admin'){
      localStorage.setItem('ROLE', 'admin');
    }
    else{
      localStorage.setItem('ROLE', 'user');
    }
    console.log(userData);
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['/auth']);

  }
}
