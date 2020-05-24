import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {ChatChannelsService} from '../../state/chat-channels/chat-channels.service';
import {takeUntil} from 'rxjs/operators';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Component({
  selector: 'app-chat-channels',
  templateUrl: './chat-channels.component.html',
  styleUrls: ['./chat-channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatChannelsComponent implements OnInit, OnDestroy {
  channels$: Observable<Array<ChatChannelCardDM>> = this.chatChanelsQuery.channels$;

  private componentDestroyed = new Subject();

  constructor(private chatChanelsQuery: ChatChannelsQuery,
              private chatChannelsService: ChatChannelsService) {
  }

  ngOnInit(): void {
    this.loadChannels();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  trackById(index: number, item: ChatChannelCardDM) {
    return item.channelIdentifier;
  }

  private loadChannels() {
    this.chatChannelsService.getChannelsWithInterval().pipe(
      takeUntil(this.componentDestroyed)
    ).subscribe();
  }
}
