import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-input-area',
  templateUrl: './chat-input-area.component.html',
  styleUrls: ['./chat-input-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
