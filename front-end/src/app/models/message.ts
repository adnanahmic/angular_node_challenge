export class Message {
  message;
  status: string;
  constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }

  empty() {
    return this.message === '';
  }
}
