import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageComponent } from "../message/message.component";
import { NgClass, NgIf } from "@angular/common";
import { Message } from "../../models/message";
import { DataService } from "../../services/data/data.service";
import { MessageService } from "../../services/message/message.service";

@Component({
  selector: "app-create-message",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  templateUrl: "./create-message.component.html",
  styleUrl: "./create-message.component.css",
})
export class CreateMessageComponent {
  message: Message = new Message("", "draft");

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.message.status = "pending";
    this.dataService
      .postData("messages/create", {
        message: this.message.message,
        toUserId: localStorage.getItem("toUserId"),
      })
      .subscribe({
        next: (response) => {
          if (response) {
            this.message.message = "";
            this.message.status = "sent";
            this.messageService.emitEvent();
          } else {
            this.message.status = "failed";
          }
        },
        error: (error) => {
          console.error(error);
          this.message.status = "failed";
        },
      });
  }
}
