import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ChatHttpService} from "../../services/chat-http.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(private chatHttpService: ChatHttpService) {
  }

  ngOnInit(): void {
    this.chatHttpService.getParticipants('1').subscribe((res) => console.log(res));
  }

}
