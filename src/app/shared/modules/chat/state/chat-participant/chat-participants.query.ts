import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ChatParticipantsStore, ChatParticipantsState } from './chat-participants.store';
import {Observable} from "rxjs";
import {ChatParticipant} from "./chat-participant.model";

@Injectable({ providedIn: 'root' })
export class ChatParticipantsQuery extends QueryEntity<ChatParticipantsState> {
  participants$: Observable<Array<ChatParticipant>> = this.selectAll();

  constructor(protected store: ChatParticipantsStore) {
    super(store);
  }

}
