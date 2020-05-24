import {Injectable} from '@angular/core';
import {delay, map, switchMap} from 'rxjs/operators';
import {ChatChannelsStore} from './chat-channels.store';
import {Observable, timer} from 'rxjs';
import {withTransaction} from '@datorama/akita';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';
import {ChatDataService} from '../../models/chat-data-service.model';

@Injectable({providedIn: 'root'})
export class ChatChannelsService {

  constructor(private chatDataService: ChatDataService, private chatChannelsStore: ChatChannelsStore) {
  }

  public getChannelsWithInterval(interval: number = 5000): Observable<Array<ChatChannelCardDM>> {
    return timer(0, interval).pipe(
      switchMap(() => this.getChatChannels())
    );
  }

  private getChatChannels(): Observable<Array<ChatChannelCardDM>> {
    this.chatChannelsStore.setLoading(true);
    return this.chatDataService.getChatChannels('mocked').pipe(
      // TODO: delete emulated response time
      delay(100),
      // TODO: delete - emulates hasNewMessages changes for polling demo
      map((chatChannels: Array<ChatChannelCardDM>) => chatChannels.map((item: ChatChannelCardDM) => ({
        ...item,
        hasNewMessages: Math.random() >= 0.5 // TODO: delete. Generates random boolean for demo purpose
      }))),
      withTransaction((chatChannels: Array<ChatChannelCardDM>) => {
        this.chatChannelsStore.set(chatChannels);
        this.chatChannelsStore.setLoading(false);
      })
    );
  }

  public updateChannelsSearchFilter(filter: string): void {
    this.chatChannelsStore.updateChannelsSearchFilter(filter);
  }

  public setSelectedChannel(channelId: string): void {
    this.chatChannelsStore.setSelectedChannel(channelId);
  }
}
