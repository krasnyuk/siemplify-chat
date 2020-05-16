import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-participant-card',
  templateUrl: './chat-participant-card.component.html',
  styleUrls: ['./chat-participant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
