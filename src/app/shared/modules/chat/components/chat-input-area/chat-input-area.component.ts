import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChatMessagesService} from '../../state/chat-messages/chat-messages.service';
import {takeUntil} from 'rxjs/operators';
import {BaseUnsubscribe} from '../../../../../core/base/base-unsubscribe';

@Component({
  selector: 'app-chat-input-area',
  templateUrl: './chat-input-area.component.html',
  styleUrls: ['./chat-input-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputAreaComponent extends BaseUnsubscribe implements OnInit {
  inputControl = new FormControl(null, [Validators.required]);

  constructor(private chatMessagesService: ChatMessagesService) {
    super();
  }

  ngOnInit(): void {
  }

  public sendMessage(): void {
    if (this.inputControl.valid) {
      const messageContent: string = this.inputControl.value;
      this.inputControl.reset();
      this.chatMessagesService.sendMessage(messageContent).pipe(
        takeUntil(this.componentDestroyed$)
      ).subscribe();
    }
  }

}
