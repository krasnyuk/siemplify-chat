import {Injectable} from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ChatChannelCardDM} from "../../models/chat-channel-card.model";

export interface ChatChannelsState extends EntityState<ChatChannelCardDM, string>, ActiveState<string> {
  ui: {
    channelsSearchFilter: string | null;
  };
}

const initialState: Partial<ChatChannelsState> = {
  ui: {
    channelsSearchFilter: null
  },
  active: null
};

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'chat-channels',
  idKey: 'channelIdentifier'
})
export class ChatChannelsStore extends EntityStore<ChatChannelsState> {

  constructor() {
    super(initialState);
  }

  updateChannelsSearchFilter(channelsSearchFilter: string) {
    this.update({ui: {channelsSearchFilter}});
  }

  setSelectedChannel(channelId: string): void {
    this.setActive(channelId);
  }
}
