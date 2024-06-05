import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatPageComponent, RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}
