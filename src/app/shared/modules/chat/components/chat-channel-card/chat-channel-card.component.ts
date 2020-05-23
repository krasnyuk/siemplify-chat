import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SmpComponentSizes} from '@siemplify/ui';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {Observable} from 'rxjs';
import {ChatChannelsService} from '../../state/chat-channels/chat-channels.service';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Component({
  selector: 'app-chat-channel-card',
  templateUrl: './chat-channel-card.component.html',
  styleUrls: ['./chat-channel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatChannelCardComponent implements OnInit {
  channelsSearchFilter$: Observable<string>;
  selectedChannelId$: Observable<string | null>;
  readonly avatarSize = SmpComponentSizes;

  @Input() chatChannel: ChatChannelCardDM;

  constructor(private chatChanelsQuery: ChatChannelsQuery,
              private chatChannelsService: ChatChannelsService) {
  }

  ngOnInit(): void {
    this.channelsSearchFilter$ = this.chatChanelsQuery.channelsSearchFilter$;
    this.selectedChannelId$ = this.chatChanelsQuery.selectedChannelId$;
  }

  setSelectedChannel(): void {
    this.chatChannelsService.setSelectedChannel(this.chatChannel.channelIdentifier);
  }

}
