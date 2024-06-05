import { Component } from "@angular/core";
import { ChatComponent } from "./chat/chat.component";
import { CreateMessageComponent } from "./create-message/create-message.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-chat-page",
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.css",
})
export class ChatPageComponent {
  title = "Chat";
  userData: any;

  constructor(private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("userData") || "");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
