import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatMessage, ChatMessagesGroup} from "../../state/chat-messages/chat-message.model";

@Component({
  selector: 'app-chat-messages-group',
  templateUrl: './chat-messages-group.component.html',
  styleUrls: ['./chat-messages-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesGroupComponent implements OnInit {
  @Input() messagesGroup: ChatMessagesGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  public trackById(index: number, message: ChatMessage) {
    return message.id;
  }

}
