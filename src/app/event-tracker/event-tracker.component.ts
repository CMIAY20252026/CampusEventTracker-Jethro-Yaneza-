import { Component, OnInit } from '@angular/core';
import { EventItem } from '../models/event-item.interface';

@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {
  events: EventItem[] = [];
  newTitle: string = '';
  newDate: string = '';
  nextId: number = 1;

  ngOnInit(): void {
    this.loadEventsFromStorage();
  }

  addEvent(): void {
    if (this.newTitle.trim() === '' || this.newDate === '') {
      alert('Please fill in both title and date fields.');
      return;
    }

    const newEvent: EventItem = {
      id: this.nextId,
      title: this.newTitle.trim(),
      date: this.newDate
    };

    this.events.push(newEvent);
    this.nextId++;
    this.saveEventsToStorage();
    this.newTitle = '';
    this.newDate = '';
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
    this.saveEventsToStorage();
  }

  private saveEventsToStorage(): void {
    localStorage.setItem('campusEvents', JSON.stringify(this.events));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  private loadEventsFromStorage(): void {
    const storedEvents = localStorage.getItem('campusEvents');
    const storedNextId = localStorage.getItem('nextId');

    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
    if (storedNextId) {
      this.nextId = parseInt(storedNextId, 10);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}