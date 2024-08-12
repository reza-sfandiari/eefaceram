import { Component } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { CardComponent } from "../../shared/card/card.component";
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'eef-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent,NavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
