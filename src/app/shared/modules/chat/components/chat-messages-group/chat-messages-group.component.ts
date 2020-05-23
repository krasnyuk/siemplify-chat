import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';
import {ChatChannelMessageDM} from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-messages-group',
  templateUrl: './chat-messages-group.component.html',
  styleUrls: ['./chat-messages-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesGroupComponent implements OnInit {
  @Input() messagesGroup: ChatMessagesGroupVM;

  constructor() {
  }

  ngOnInit(): void {
  }

  public trackById(index: number, message: ChatChannelMessageDM) {
    return message.id;
  }

}
