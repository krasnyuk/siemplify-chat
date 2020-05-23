import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {ChatChannelsService} from '../../state/chat-channels/chat-channels.service';
import {takeUntil} from 'rxjs/operators';
import {BaseUnsubscribe} from '../../../../../core/base/base-unsubscribe';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Component({
  selector: 'app-chat-channels',
  templateUrl: './chat-channels.component.html',
  styleUrls: ['./chat-channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatChannelsComponent extends BaseUnsubscribe implements OnInit {
  channels$: Observable<Array<ChatChannelCardDM>> = this.chatChanelsQuery.channels$;

  constructor(private chatChanelsQuery: ChatChannelsQuery,
              private chatChannelsService: ChatChannelsService) {
    super();
  }

  ngOnInit(): void {
    this.loadChannels();
  }

  public trackById(index: number, item: ChatChannelCardDM) {
    return item.channelIdentifier;
  }

  private loadChannels() {
    this.chatChannelsService.getChannelsWithInterval().pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
