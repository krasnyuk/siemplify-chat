import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ChatMessagesGroup} from "../../state/chat-messages/chat-message.model";

@Component({
  selector: 'app-chat-messages-group',
  templateUrl: './chat-messages-group.component.html',
  styleUrls: ['./chat-messages-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesGroupComponent implements OnInit {
  @Input() messagesGroup: ChatMessagesGroup;
  @Input() isFirst: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
