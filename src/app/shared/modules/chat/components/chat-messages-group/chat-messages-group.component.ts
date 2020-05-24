import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {Observable} from 'rxjs';
import {ChatMessagesQuery} from '../../state/chat-messages/chat-messages.query';

@Component({
  selector: 'app-chat-messages-group',
  templateUrl: './chat-messages-group.component.html',
  styleUrls: ['./chat-messages-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatMessagesGroupComponent implements OnInit {
  @Input() messagesGroup: ChatMessagesGroupVM;

  firstUnreadMessageId$: Observable<number> = this.chatMessagesQuery.firstUnreadMessageId$;
  unreadMessagesCount$: Observable<number> = this.chatMessagesQuery.unreadMessagesCount$;

  constructor(private chatMessagesQuery: ChatMessagesQuery) {
  }

  ngOnInit(): void {
  }

  trackById(index: number, message: ChatChannelMessageDM) {
    return message.id;
  }
}
