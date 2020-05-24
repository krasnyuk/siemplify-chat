import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {combineLatest, Observable, Subject, timer} from 'rxjs';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {ChatMessagesService} from '../../state/chat-messages/chat-messages.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),
      transition(':leave',
        animate(200, style({opacity: 0})))
    ])
  ]
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  hasSelectedChannel$: Observable<boolean> = this.chatChanelsQuery.hasSelectedChannel$;
  private componentDestroyed = new Subject();

  constructor(private chatChanelsQuery: ChatChannelsQuery, private chatMessagesService: ChatMessagesService) {
  }

  ngOnInit(): void {
    this.loadMessagesForSelectedChannel();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  private loadMessagesForSelectedChannel(pollingInterval: number = 5000) {
    const selectedChannelId$ = this.chatChanelsQuery.selectedChannelId$.pipe(
      filter((selectedChannelId: string | null) => selectedChannelId !== null)
    );
    const pollingInterval$ = timer(0, pollingInterval);
    combineLatest(selectedChannelId$, pollingInterval$).pipe(
      switchMap(([selectedChannelId, _]) => this.chatMessagesService.getChannelMessages(selectedChannelId)),
      takeUntil(this.componentDestroyed)
    ).subscribe();
  }
}
