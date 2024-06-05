import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MessageService } from "../../services/message/message.service";
import { NgForOf } from "@angular/common";
import { MessageComponent } from "../message/message.component";
import { Message } from "../../models/message";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [NgForOf, MessageComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css",
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild("chatListContainer") private chatListContainer!: ElementRef;
  messages: Message[] = [];
  showLoader: boolean = true;

  paginationOptions: any = {
    options: {
      pagination: false,
      populate: [
        {
          path: "fromUserId",
          select: ["name", "email", "imagePath"],
        },
        {
          path: "toUserId",
          select: ["name", "email", "imagePath"],
        },
      ],
    },
  };

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    setInterval(() => {
      this.getAllMessages();
    }, 5000);

    this.messageService.event$.subscribe(() => {
      this.getAllMessages();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  getAllMessages() {
    this.messageService.getAllMessages(this.paginationOptions).subscribe({
      next: (response) => {
        if (response?.data?.list) {
          this.messages = response.data.list;
          this.setToUser(response.data.list);
          this.showLoader = false;
        } else {
          this.showLoader = false;
        }
      },
      error: (error) => {
        console.error(error);
        this.showLoader = false;
      },
    });
  }

  trackById(index: number, messageObj: any): number {
    return messageObj._id;
  }

  setToUser(data: any[]) {
    if (!localStorage.getItem("toUserId")) {
      localStorage.setItem(
        "toUserId",
        JSON.parse(localStorage.getItem("userData") || "")?.id !=
          data[0]?.toUserId?._id
          ? data[0]?.toUserId?._id
          : data[0]?.fromUserId?._id
      );
    }
  }

  scrollToBottom(): void {
    try {
      this.chatListContainer.nativeElement.scrollTop =
        this.chatListContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Error scrolling to bottom:", err);
    }
  }
}
