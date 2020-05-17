import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {combineLatest, Observable, timer} from "rxjs";
import {fadeInOutAnimation} from "../../../../../core/animations/fade-in-out.animation";
import {BaseUnsubscribe} from "../../../../../core/base/base-unsubscribe";
import {filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {POLLING_INTERVAL} from "../../../../../core/constants";
import {ChatMessagesService} from "../../state/chat-messages/chat-messages.service";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()]
})
export class ChatMessagesComponent extends BaseUnsubscribe implements OnInit {
  hasSelectedParticipant$: Observable<boolean> = this.chatParticipantsQuery.hasSelectedParticipant$;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery, private chatMessagesService: ChatMessagesService) {
    super();
  }

  ngOnInit(): void {
    this.loadMessagesForSelectedParticipant();
  }

  private loadMessagesForSelectedParticipant() {
    const selectedParticipantId$ = this.chatParticipantsQuery.selectedParticipantId$.pipe(
      filter((selectedParticipantId: string | null) => selectedParticipantId !== null)
    );
    const pollingInterval$ = timer(0, POLLING_INTERVAL);
    combineLatest(selectedParticipantId$, pollingInterval$).pipe(
      switchMap(([selectedParticipantId, _]) => this.chatMessagesService.getChatMessages(selectedParticipantId)),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
