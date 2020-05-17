import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ChatMessage} from "../../state/chat-messages/chat-message.model";
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {SmpComponentSizes} from "@siemplify/ui";
import {CurrentUserService} from "../../../../../core/services/current-user.service";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  public selectedParticipant$ = this.chatParticipantsQuery.selectedParticipant$;
  readonly avatarSize = SmpComponentSizes;

  @Input() message: ChatMessage;
  @Input() isFirst: boolean;
  @Input() senderSameAsPrevious: boolean;
  @Input() senderSameAsNext: boolean;

  public get isMine(): boolean {
    return this.currentUserService.userId === this.message?.senderId;
  }

  public get currentUserImage(): string {
    return this.currentUserService.userImage;
  }

  public get currentUserName(): string {
    return this.currentUserService.userName;
  }

  constructor(private chatParticipantsQuery: ChatParticipantsQuery,
              private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
  }

}
