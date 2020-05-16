import {Subject} from "rxjs";
import {OnDestroy} from "@angular/core";

export abstract class BaseUnsubscribe implements OnDestroy {
  private componentDestroyed = new Subject();
  componentDestroyed$ = this.componentDestroyed.asObservable();

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
