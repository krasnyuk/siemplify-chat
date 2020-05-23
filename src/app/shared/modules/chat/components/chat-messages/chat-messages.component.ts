import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatChanelsQuery} from "../../state/chat-channels/chat-chanels.query";
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
  hasSelectedChannel$: Observable<boolean> = this.chatChanelsQuery.hasSelectedChannel$;

  constructor(private chatChanelsQuery: ChatChanelsQuery, private chatMessagesService: ChatMessagesService) {
    super();
  }

  ngOnInit(): void {
    this.loadMessagesForSelectedChannel();
  }

  private loadMessagesForSelectedChannel() {
    const selectedChannelId$ = this.chatChanelsQuery.selectedChannelId$.pipe(
      filter((selectedChannelId: string | null) => selectedChannelId !== null)
    );
    const pollingInterval$ = timer(0, POLLING_INTERVAL);
    combineLatest(selectedChannelId$, pollingInterval$).pipe(
      switchMap(([selectedChannelId, _]) => this.chatMessagesService.getChannelMessages(selectedChannelId)),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
