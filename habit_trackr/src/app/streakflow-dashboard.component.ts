import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Habit {
  id: number;
  name: string;
  streak: number;
  longestStreak: number;
  calendar: boolean[];
}

// PUBLIC_INTERFACE
@Component({
  selector: 'streakflow-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sf-dashboard-root">
      <header>
        <h1>StreakFlow</h1>
        <p class="subtitle">Build lasting habits with a clean, effortless dashboard</p>
      </header>
      <section class="sf-add-habit-card pastel-pink">
        <form (submit)="addHabit($event)">
          <input
            type="text"
            [(ngModel)]="habitInput"
            name="habitInput"
            maxlength="30"
            placeholder="Add a new habit..."
            autocomplete="off"
            required
          />
          <button type="submit" [disabled]="!habitInput.trim()">Add</button>
        </form>
      </section>
      <section>
        <div *ngIf="habits.length === 0" class="sf-empty-state">No habits yet. Try adding one above!</div>
        <div class="sf-habits-grid">
          <ng-container *ngFor="let habit of habits; trackBy: trackById">
            <div class="sf-habit-card pastel-blue">
              <div class="card-header">
                <span class="habit-name">{{ habit.name }}</span>
                <button class="delete-btn" (click)="deleteHabit(habit.id)" aria-label="Remove habit">&times;</button>
              </div>
              <div class="streak-area">
                <span class="streak-count">{{ habit.streak }}</span>
                <span class="streak-label">Current Streak</span>
              </div>
              <div class="longest-streak">
                <span>&#128293; {{ habit.longestStreak }}</span>
                <span class="longest-label">Longest</span>
              </div>
              <button 
                class="mark-btn pastel-green"
                [disabled]="habit.calendar[todayIdx]"
                (click)="markToday(habit)">
                {{ habit.calendar[todayIdx] ? "Today's done!" : 'Mark Done' }}
              </button>
              <div class="sf-cal-area">
                <ng-container *ngFor="let completed of habit.calendar; let day = index">
                  <span
                    class="sf-cal-dot"
                    [ngClass]="{ 'filled': completed, 'today': day === todayIdx }"
                    [attr.aria-label]="calendarWeekday(day)">
                  </span>
                </ng-container>
                <span class="calendar-label">Week</span>
              </div>
            </div>
          </ng-container>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./streakflow-dashboard.component.css']
})
export class StreakFlowDashboardComponent {
  habits: Habit[] = [];
  habitInput = '';
  todayIdx = new Date().getDay();

  // PUBLIC_INTERFACE
  addHabit(e: Event) {
    e.preventDefault();
    const name = this.habitInput.trim();
    if (!name) return;
    this.habits.push({
      id: Date.now(),
      name,
      streak: 0,
      longestStreak: 0,
      calendar: Array(7).fill(false)
    });
    this.habitInput = '';
  }

  // PUBLIC_INTERFACE
  markToday(habit: Habit) {
    if (!habit.calendar[this.todayIdx]) {
      habit.calendar[this.todayIdx] = true;
      const streakCount = habit.calendar.reduce(
        (sum, x, idx, arr) =>
          x &&
          (idx === 0 || arr[idx - 1])
            ? sum + 1
            : 0,
        0
      );
      habit.streak = streakCount;
      if (habit.streak > habit.longestStreak) {
        habit.longestStreak = habit.streak;
      }
    }
  }

  // PUBLIC_INTERFACE
  calendarWeekday(idx: number): string {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][idx];
  }

  // PUBLIC_INTERFACE
  trackById(_: number, item: Habit) {
    return item.id;
  }

  // PUBLIC_INTERFACE
  deleteHabit(id: number) {
    this.habits = this.habits.filter(h => h.id !== id);
  }
}
