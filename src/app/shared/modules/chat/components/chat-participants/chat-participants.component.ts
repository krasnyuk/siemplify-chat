import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {ChatParticipantsService} from "../../state/chat-participant/chat-participants.service";
import {takeUntil} from "rxjs/operators";
import {BaseUnsubscribe} from "../../../../../core/base/base-unsubscribe";

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantsComponent extends BaseUnsubscribe implements OnInit {
  participants$: Observable<Array<ChatParticipant>> = this.chatParticipantsQuery.participants$;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery,
              private chatParticipantsService: ChatParticipantsService) {
    super();
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  public trackById(index: number, item: ChatParticipant) {
    return item.id;
  }

  private loadParticipants() {
    this.chatParticipantsService.getParticipantsWithInterval().pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
