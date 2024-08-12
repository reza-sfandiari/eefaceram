import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";

@Component({
  selector: 'eef-nav',
  standalone: true,
  imports: [ThemeSwitcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
