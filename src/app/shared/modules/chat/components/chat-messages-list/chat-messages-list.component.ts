import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
