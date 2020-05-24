import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {combineLatest, Observable, timer} from 'rxjs';
import {fadeInOutAnimation} from '../../../../../core/animations/fade-in-out.animation';
import {BaseUnsubscribe} from '../../../../../core/base/base-unsubscribe';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {ChatMessagesService} from '../../state/chat-messages/chat-messages.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()]
})
export class ChatMessagesComponent extends BaseUnsubscribe implements OnInit {
  hasSelectedChannel$: Observable<boolean> = this.chatChanelsQuery.hasSelectedChannel$;

  constructor(private chatChanelsQuery: ChatChannelsQuery, private chatMessagesService: ChatMessagesService) {
    super();
  }

  ngOnInit(): void {
    this.loadMessagesForSelectedChannel();
  }

  private loadMessagesForSelectedChannel(pollingInterval: number = 5000) {
    const selectedChannelId$ = this.chatChanelsQuery.selectedChannelId$.pipe(
      filter((selectedChannelId: string | null) => selectedChannelId !== null)
    );
    const pollingInterval$ = timer(0, pollingInterval);
    combineLatest(selectedChannelId$, pollingInterval$).pipe(
      switchMap(([selectedChannelId, _]) => this.chatMessagesService.getChannelMessages(selectedChannelId)),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
