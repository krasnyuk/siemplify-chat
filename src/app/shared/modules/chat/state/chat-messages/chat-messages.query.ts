import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ChatMessagesState, ChatMessagesStore} from './chat-messages.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';

@Injectable({providedIn: 'root'})
export class ChatMessagesQuery extends QueryEntity<ChatMessagesState> {
  messages$: Observable<Array<ChatChannelMessageDM>>;
  messagesGroups$: Observable<Array<ChatMessagesGroupVM>>;

  constructor(protected store: ChatMessagesStore) {
    super(store);
    this.messages$ = this.selectAll();
    this.messagesGroups$ = this.messages$.pipe(
      map((messages: Array<ChatChannelMessageDM>) => {
        const messagesByDate: { [key: string]: Array<ChatChannelMessageDM> } = this.getMessagesByDate(messages);
        return this.toArrayFormat(messagesByDate);
      })
    );
  }

  private toArrayFormat(messagesByDate: { [p: string]: Array<ChatChannelMessageDM> }): Array<ChatMessagesGroupVM> {
    return Object.keys(messagesByDate)
      .map((date: string) => {
        return {
          date: new Date(date),
          messages: messagesByDate[date]
        };
      })
      .sort((prev: ChatMessagesGroupVM, next: ChatMessagesGroupVM) => prev.date.getTime() - next.date.getTime());
  }

  private getMessagesByDate(messages: Array<ChatChannelMessageDM>): { [key: string]: Array<ChatChannelMessageDM> } {
    return messages.reduce((groups: { [key: string]: Array<ChatChannelMessageDM> }, message: ChatChannelMessageDM) => {
      const messageDate: Date = new Date(message.sentTime);
      const dateStr: string = this.timeToDateString(messageDate); // date without time (yyyy-mm-dd)
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
      return groups;
    }, {});
  }

  private timeToDateString(dateTime: Date): string {
    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const year = dateTime.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
