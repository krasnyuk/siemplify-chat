import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChatMessagesService} from '../../state/chat-messages/chat-messages.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chat-input-area',
  templateUrl: './chat-input-area.component.html',
  styleUrls: ['./chat-input-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatInputAreaComponent implements OnDestroy {
  inputControl = new FormControl(null, [Validators.required]);
  private componentDestroyed = new Subject();

  constructor(private chatMessagesService: ChatMessagesService) {
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  public sendMessage(): void {
    if (this.inputControl.valid) {
      const messageContent: string = this.inputControl.value;
      this.inputControl.reset();
      this.chatMessagesService.sendMessage(messageContent).pipe(
        takeUntil(this.componentDestroyed)
      ).subscribe();
    }
  }

}
