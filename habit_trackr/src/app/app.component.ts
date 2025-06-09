import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StreakFlowDashboardComponent } from './streakflow-dashboard.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, StreakFlowDashboardComponent],
  template: `
    <div class="streakflow-app-bg">
      <div class="streakflow-centered-container">
        <streakflow-dashboard />
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
