import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'eef-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {

  theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-mode'
      : 'light-mode'
  );

  constructor() {
    effect(() => {
      if (this.theme() === 'light-mode') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
        //  for bootstrap theme switcher
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');

      
      }

      if (this.theme() === 'dark-mode') {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        //  for bootstrap theme switcher
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }

      localStorage.setItem('theme', this.theme());

      
      
      

    });
  }

  toggleTheme() {
    this.theme.update((theme) =>
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    );
  }
}

type Theme = 'light-mode' | 'dark-mode';
