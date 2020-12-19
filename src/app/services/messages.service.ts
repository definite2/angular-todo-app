import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];
  add(message: string) {
    this.messages.push(message)

  }
  clear(message: string) {
    let index = this.messages.indexOf(message);
    
    if (index === 0 && this.messages.length === 1)
      this.messages = [];
    else
      this.messages = this.messages.splice(index - 1, 1)

  }
  clearAll() {
    this.messages = []
  }
  constructor() { }
}
