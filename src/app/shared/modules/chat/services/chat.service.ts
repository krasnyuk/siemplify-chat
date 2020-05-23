import {Injectable} from '@angular/core';
import {SmpDialogRef, SmpDialogService} from '@siemplify/ui';
import {ChatDialogComponent} from '../components/chat-dialog/chat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private dialogService: SmpDialogService) {
  }

  public openChat(): SmpDialogRef<ChatDialogComponent> {
    return this.dialogService.open(ChatDialogComponent, {
      closeOnBackdropClick: true
    });
  }
}
