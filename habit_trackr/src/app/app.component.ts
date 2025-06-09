import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StreakFlowDashboardComponent } from './streakflow-dashboard.component';
import { NavbarComponent } from './navbar.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, StreakFlowDashboardComponent, NavbarComponent],
  template: `
    <sf-navbar></sf-navbar>
    <div class="streakflow-app-bg">
      <div class="streakflow-centered-container">
        <streakflow-dashboard />
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
