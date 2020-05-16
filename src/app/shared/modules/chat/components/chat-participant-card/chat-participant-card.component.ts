import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";
import {SmpComponentSizes} from "@siemplify/ui";

@Component({
  selector: 'app-chat-participant-card',
  templateUrl: './chat-participant-card.component.html',
  styleUrls: ['./chat-participant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantCardComponent implements OnInit {
  avatarSize = SmpComponentSizes;

  @Input() participant: ChatParticipant;

  constructor() { }

  ngOnInit(): void {
  }

}
