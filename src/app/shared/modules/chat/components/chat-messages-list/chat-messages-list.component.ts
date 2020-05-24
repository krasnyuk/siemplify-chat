import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ChatMessagesQuery} from '../../state/chat-messages/chat-messages.query';
import {Observable, Subject} from 'rxjs';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';
import {ChatMessagesGroupComponent} from '../chat-messages-group/chat-messages-group.component';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChildren(ChatMessagesGroupComponent) private messagesGroups: QueryList<ChatMessagesGroupComponent>;

  messagesGroups$: Observable<Array<ChatMessagesGroupVM>> = this.chatMessagesQuery.messagesGroups$;
  private componentDestroyed = new Subject();

  constructor(private chatMessagesQuery: ChatMessagesQuery) {
  }

  ngAfterViewInit(): void {
    this.scrollToBottomOnMessagesChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  public trackByDate(index, group: ChatMessagesGroupVM) {
    return group.date.getTime();
  }

  private scrollToBottomOnMessagesChanges() {
    this.messagesGroups.changes.pipe(
      tap(() => this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight),
      takeUntil(this.componentDestroyed)
    ).subscribe();
  }

}
