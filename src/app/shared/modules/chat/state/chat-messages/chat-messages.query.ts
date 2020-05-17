import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {ChatMessagesState, ChatMessagesStore} from './chat-messages.store';
import {Observable} from "rxjs";
import {ChatMessage, ChatMessagesGroup} from "./chat-message.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ChatMessagesQuery extends QueryEntity<ChatMessagesState> {
  messages$: Observable<Array<ChatMessage>>;
  messagesGroups$: Observable<Array<ChatMessagesGroup>>;

  constructor(protected store: ChatMessagesStore) {
    super(store);
    this.messages$ = this.selectAll();
    this.messagesGroups$ = this.messages$.pipe(
      map((messages: Array<ChatMessage>) => {
        const messagesByDate: { [key: string]: Array<ChatMessage> } = this.getMessagesByDate(messages);
        return this.toArrayFormat(messagesByDate);
      })
    );
  }

  private toArrayFormat(messagesByDate: { [p: string]: Array<ChatMessage> }): Array<ChatMessagesGroup> {
    return Object.keys(messagesByDate)
      .map((date: string) => {
        return {
          date: new Date(date),
          messages: messagesByDate[date]
        };
      })
      .sort((prev: ChatMessagesGroup, next: ChatMessagesGroup) => prev.date.getTime() - next.date.getTime());
  }

  private getMessagesByDate(messages: Array<ChatMessage>): { [key: string]: Array<ChatMessage> } {
    return messages.reduce((groups: { [key: string]: Array<ChatMessage> }, message: ChatMessage) => {
      const dateStr: string = message.timeUnixTime.split('T')[0];
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
      return groups;
    }, {});
  }
}
