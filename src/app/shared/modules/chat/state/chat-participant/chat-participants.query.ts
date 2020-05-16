import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ChatParticipantsStore, ChatParticipantsState} from './chat-participants.store';
import {Observable} from "rxjs";
import {ChatParticipant} from "./chat-participant.model";
import {switchMap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ChatParticipantsQuery extends QueryEntity<ChatParticipantsState> {
  participantsIsLoading$: Observable<boolean> = this.selectLoading();
  participantsSearchFilter$: Observable<string> = this.select(state => state.ui.participantsSearchFilter);
  participants$: Observable<Array<ChatParticipant>> = this.participantsSearchFilter$.pipe(
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

  constructor(protected store: ChatParticipantsStore) {
    super(store);
  }

}
