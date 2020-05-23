import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {Observable} from 'rxjs';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';
import {SmpComponentSizes} from '@siemplify/ui';

@Component({
  selector: 'app-chat-selected-channel-info',
  templateUrl: './chat-selected-channel-info.component.html',
  styleUrls: ['./chat-selected-channel-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatSelectedChannelInfoComponent implements OnInit {
  selectedChannel$: Observable<ChatChannelCardDM | null> = this.chatChanelsQuery.selectedChannel$;
  readonly avatarSize = SmpComponentSizes;

  constructor(private chatChanelsQuery: ChatChannelsQuery) {
  }

  ngOnInit(): void {
  }

}
