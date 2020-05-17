import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInOutAnimation = (timing: number = 200) => trigger('fadeInOut', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({opacity: 1})),
  transition(':enter', [
    style({opacity: 0}),
    animate(timing)
  ]),
  transition(':leave',
    animate(timing, style({opacity: 0})))
]);
