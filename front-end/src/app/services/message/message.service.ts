import { Injectable } from "@angular/core";
import { Message } from "../../models/message";
import { DataService } from "../data/data.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messages: Message[] = [];

  private eventSubject = new Subject<void>();

  event$ = this.eventSubject.asObservable();

  constructor(private dataService: DataService) {}

  getAllMessages(options?: any): Observable<any> {
    return this.dataService.postData("messages", options);
  }

  emitEvent() {
    this.eventSubject.next();
  }
}
