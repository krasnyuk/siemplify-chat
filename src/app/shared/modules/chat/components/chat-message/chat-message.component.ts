import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {ChatChannelMessageDM} from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatMessageComponent {
  @HostBinding('class.chat-message-container')
  baseClass = true;

  @Input() message: ChatChannelMessageDM;
  @Input() isFirst: boolean;
  @Input() senderSameAsPrevious: boolean;
  @Input() senderSameAsNext: boolean;
  @Input() isFirstUnread: boolean;
  @Input() unreadMessagesCount: boolean;

  get isMine(): boolean {
    return this.message?.isCurrentUser;
  }
}
