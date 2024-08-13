import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'eef-nav',
  standalone: true,
  imports: [ThemeSwitcherComponent,RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isRole = false;
  isLogin = false;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isRole = localStorage.getItem('role') !== 'admin'
    this.isLogin = !this.authService.isLoggedIn();
    // alert(this.isRole)
 
  }
  logout() {
    this.authService.logout();
  }

}
