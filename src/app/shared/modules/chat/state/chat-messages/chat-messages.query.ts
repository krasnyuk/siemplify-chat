import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ChatMessagesState, ChatMessagesStore} from './chat-messages.store';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';
import {ChatChannelsQuery} from '../chat-channels/chat-channels-query.service';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Injectable({providedIn: 'root'})
export class ChatMessagesQuery extends QueryEntity<ChatMessagesState> {
  messages$: Observable<Array<ChatChannelMessageDM>>;
  messagesGroups$: Observable<Array<ChatMessagesGroupVM>>;
  firstUnreadMessageId$: Observable<number>;
  unreadMessagesCount$: Observable<number>;

  constructor(protected store: ChatMessagesStore, private chatChannelsQuery: ChatChannelsQuery) {
    super(store);
    this.messages$ = this.selectAll();
    this.messagesGroups$ = this.getMessagesGroups();
    this.firstUnreadMessageId$ = this.getFirstUnreadMessageId();
    this.unreadMessagesCount$ = this.getUnreadMessagesCount();
  }

  private getUnreadMessagesCount(): Observable<number> {
    return this.chatChannelsQuery.selectedChannel$.pipe(
      filter(Boolean),
      switchMap((selectedChannel: ChatChannelCardDM) => {
        return this.messages$.pipe(
          map((messages: Array<ChatChannelMessageDM>) => {
            const unreadMessages: Array<ChatChannelMessageDM> = messages.filter((message: ChatChannelMessageDM) => {
              return message.sentTime > selectedChannel.lastViewTimeOfChannel;
            });
            return unreadMessages.length;
          })
        );
      }),
    );
  }

  private getMessagesGroups(): Observable<Array<ChatMessagesGroupVM>> {
    return this.messages$.pipe(
      map((messages: Array<ChatChannelMessageDM>) => {
        const messagesByDate: { [key: string]: Array<ChatChannelMessageDM> } = this.getMessagesByDate(messages);
        return this.toArrayFormat(messagesByDate);
      })
    );
  }

  private getFirstUnreadMessageId(): Observable<number> {
    return this.chatChannelsQuery.selectedChannel$.pipe(
      filter(Boolean),
      switchMap((selectedChannel: ChatChannelCardDM) => {
        return this.messages$.pipe(
          map((messages: Array<ChatChannelMessageDM>) => {
            const firstUnreadMessage: ChatChannelMessageDM | undefined = messages.find((message: ChatChannelMessageDM) => {
              return message.sentTime > selectedChannel.lastViewTimeOfChannel;
            });
            return firstUnreadMessage?.id;
          })
        );
      }),
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
