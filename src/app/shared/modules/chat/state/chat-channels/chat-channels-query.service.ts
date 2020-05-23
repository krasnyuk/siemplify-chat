import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ChatChannelsState, ChatChannelsStore} from './chat-channels.store';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Injectable({providedIn: 'root'})
export class ChatChannelsQuery extends QueryEntity<ChatChannelsState> {
  channelsIsLoading$: Observable<boolean>;
  channelsSearchFilter$: Observable<string>;
  channels$: Observable<Array<ChatChannelCardDM>>;
  selectedChannelId$: Observable<string | null>;
  selectedChannel$: Observable<ChatChannelCardDM | null>;
  hasSelectedChannel$: Observable<boolean>;

  constructor(protected store: ChatChannelsStore) {
    super(store);
    this.channelsIsLoading$ = this.selectLoading();
    this.channelsSearchFilter$ = this.select(state => state.ui.channelsSearchFilter);
    this.channels$ = this.getChannels();
    this.selectedChannelId$ = this.selectActiveId();
    this.selectedChannel$ = this.selectActive();
    this.hasSelectedChannel$ = this.selectedChannelId$.pipe(
      map((selectedChannelId: string | null) => selectedChannelId !== null)
    );
  }

  private getChannels(): Observable<Array<ChatChannelCardDM>> {
    return this.channelsSearchFilter$.pipe(
      switchMap((filterValue: string | null) => {
        if (!filterValue) {
          return this.selectAll();
        }
        return this.selectAll({
          filterBy: (channel: ChatChannelCardDM) => {
            return channel.title.toLowerCase().includes(filterValue.toLowerCase());
          }
        });
      })
    );
  }
}
