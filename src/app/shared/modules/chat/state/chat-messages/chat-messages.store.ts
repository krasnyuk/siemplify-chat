import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ChatChannelMessageDM} from '../../models/chat-message.model';

export interface ChatMessagesState extends EntityState<ChatChannelMessageDM, number> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'chat-messages'})
export class ChatMessagesStore extends EntityStore<ChatMessagesState> {

  constructor() {
    super();
  }

}
