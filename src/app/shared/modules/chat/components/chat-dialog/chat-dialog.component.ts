import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {SmpDialogRef} from '@siemplify/ui';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatDialogComponent implements OnInit {
  @HostBinding('class.chat-dialog-container')
  baseClass = true;

  constructor(protected dialogRef: SmpDialogRef<ChatDialogComponent>) {
  }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
