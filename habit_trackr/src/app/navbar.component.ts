import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'sf-navbar',
  standalone: true,
  template: `
    <nav class="sf-navbar-container" role="navigation" aria-label="Main Navigation">
      <div class="sf-navbar-content">
        <span class="sf-navbar-app-name">📈 StreakFlow</span>
        <span class="sf-navbar-spacer"></span>
        <span class="sf-navbar-profile" aria-label="Profile">
          <!-- You can replace this emoji with an SVG icon if desired -->
          👤
        </span>
      </div>
      <div class="sf-navbar-divider"></div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent { }
