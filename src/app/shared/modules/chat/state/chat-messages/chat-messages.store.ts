import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ChatMessage} from './chat-message.model';

export interface ChatMessagesState extends EntityState<ChatMessage, string> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'chat-messages'})
export class ChatMessagesStore extends EntityStore<ChatMessagesState> {

  constructor() {
    super();
  }

}
