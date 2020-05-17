import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ChatParticipantsStore, ChatParticipantsState} from './chat-participants.store';
import {Observable} from "rxjs";
import {ChatParticipant} from "./chat-participant.model";
import {map, switchMap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ChatParticipantsQuery extends QueryEntity<ChatParticipantsState> {
  participantsIsLoading$: Observable<boolean>;
  participantsSearchFilter$: Observable<string>;
  participants$: Observable<Array<ChatParticipant>>;
  selectedParticipantId$: Observable<string | null>;
  hasSelectedParticipant$: Observable<boolean>;

  constructor(protected store: ChatParticipantsStore) {
    super(store);
    this.participantsIsLoading$ = this.selectLoading();
    this.participantsSearchFilter$ = this.select(state => state.ui.participantsSearchFilter);
    this.participants$ = this.getParticipants();
    this.selectedParticipantId$ = this.selectActiveId();
    this.hasSelectedParticipant$ = this.selectedParticipantId$.pipe(
      map((selectedParticipantId: string | null) => selectedParticipantId !== null)
    );
  }

  private getParticipants() {
    return this.participantsSearchFilter$.pipe(
      switchMap((filterValue: string | null) => {
        if (!filterValue) {
          return this.selectAll();
        }
        return this.selectAll({
          filterBy: (participant: ChatParticipant) => {
            return participant.userName.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
          }
        });
      })
    );
  }
}
