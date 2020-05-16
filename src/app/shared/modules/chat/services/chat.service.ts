import {Injectable} from '@angular/core';
import {SmpDialogRef, SmpDialogService} from "@siemplify/ui";
import {ChatComponent} from "../components/chat/chat.component";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private dialogService: SmpDialogService) {
  }

  public openChat(): SmpDialogRef<ChatComponent> {
    return this.dialogService.open(ChatComponent);
  }
}
