import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./main/layout/layout.component";
import { HeaderComponent } from "./main/layout/header/header.component";
import { FooterComponent } from "./main/layout/footer/footer.component";
import { CardComponent } from "./shared/card/card.component";

import { AuthService } from './core/services/auth.service';
import { NavComponent } from "./main/layout/nav/nav.component";

@Component({
  selector: 'eef-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, HeaderComponent, FooterComponent, CardComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eefaceram-todo-app';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
 
  }
  logout() {
    this.authService.logout();this.router.navigate(['/login']);

  }
}
