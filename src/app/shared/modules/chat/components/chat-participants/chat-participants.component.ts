import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
