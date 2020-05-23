import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {delay, map, switchMap} from 'rxjs/operators';
import {ChatChannelsStore} from './chat-channels.store';
import {Observable, timer} from 'rxjs';

import {API_URL} from '../../../../../core/tokens/api-url.token';
import {withTransaction} from '@datorama/akita';
import {POLLING_INTERVAL} from '../../../../../core/constants';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Injectable({providedIn: 'root'})
export class ChatChannelsService {

  constructor(private chatChannelsStore: ChatChannelsStore,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) {
  }

  public getChannelsWithInterval(interval: number = POLLING_INTERVAL): Observable<Array<ChatChannelCardDM>> {
    return timer(0, interval).pipe(
      switchMap(() => this.getChatChannels())
    );
  }

  private getChatChannels(): Observable<Array<ChatChannelCardDM>> {
    this.chatChannelsStore.setLoading(true);
    return this.http.get<Array<ChatChannelCardDM>>(this.apiUrl + 'chat-channels.json').pipe(
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
