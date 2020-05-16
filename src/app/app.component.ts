import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChatService} from "./shared/modules/chat/services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private chatService: ChatService) {}

  public openChat(): void {
    this.chatService.openChat();
  }
}
