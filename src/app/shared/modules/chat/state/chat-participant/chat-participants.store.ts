import {Injectable} from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ChatParticipant} from './chat-participant.model';

export interface ChatParticipantsState extends EntityState<ChatParticipant, string>, ActiveState<string> {
  ui: {
    participantsSearchFilter: string | null;
  };
}

const initialState: Partial<ChatParticipantsState> = {
  ui: {participantsSearchFilter: null},
  active: null
};

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'chat-participants'})
export class ChatParticipantsStore extends EntityStore<ChatParticipantsState> {

  constructor() {
    super(initialState);
  }

  updateParticipantsSearchFilter(participantsSearchFilter: string) {
    this.update({ui: {participantsSearchFilter}});
  }

  setSelectedParticipantId(participantId: string): void {
    this.setActive(participantId);
  }
}
