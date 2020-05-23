import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatChannelsQuery} from '../../state/chat-channels/chat-channels-query.service';
import {SmpComponentSizes} from '@siemplify/ui';
import {CurrentUserService} from '../../../../../core/services/current-user.service';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {Observable} from 'rxjs';
import {ChatChannelCardDM} from '../../models/chat-channel-card.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  public selectedChannel$: Observable<ChatChannelCardDM | null> = this.chatChanelsQuery.selectedChannel$;
  readonly avatarSize = SmpComponentSizes;

  @Input() message: ChatChannelMessageDM;
  @Input() isFirst: boolean;
  @Input() senderSameAsPrevious: boolean;
  @Input() senderSameAsNext: boolean;

  public get isMine(): boolean {
    return this.message?.isCurrentUser;
  }

  public get currentUserImage(): string {
    return this.currentUserService.userImage;
  }

  public get currentUserName(): string {
    return this.currentUserService.userName;
  }

  constructor(private chatChanelsQuery: ChatChannelsQuery,
              private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
  }

}
