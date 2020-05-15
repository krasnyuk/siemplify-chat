import {Injectable} from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ChatParticipant} from './chat-participant.model';

export interface ChatParticipantsState extends EntityState<ChatParticipant, string>, ActiveState<string> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'chat-participants'})
export class ChatParticipantsStore extends EntityStore<ChatParticipantsState> {

  constructor() {
    super();
  }

}
