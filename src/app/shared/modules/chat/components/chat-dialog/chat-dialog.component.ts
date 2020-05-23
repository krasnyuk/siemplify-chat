import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SmpDialogRef} from '@siemplify/ui';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDialogComponent implements OnInit {
  constructor(protected dialogRef: SmpDialogRef<ChatDialogComponent>) {
  }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
