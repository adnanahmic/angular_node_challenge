import { DatePipe, JsonPipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-message",
  standalone: true,
  imports: [NgClass, DatePipe, JsonPipe],
  templateUrl: "./message.component.html",
  styleUrl: "./message.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input({ required: true }) userMessage: any;
  @Input() no: any;
  currentUser: any;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("userData") || "");
  }

  ngOnInit(): void {}
}
