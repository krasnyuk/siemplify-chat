import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInOutAnimation = (timing: number = 200) => trigger('fadeInOut', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({opacity: 1})),

  // fade in when created. this could also be written as transition('void => *')
  transition(':enter', [
    style({opacity: 0}),
    animate(timing)
  ]),

  // fade out when destroyed. this could also be written as transition('void => *')
  transition(':leave',
    animate(timing, style({opacity: 0})))
])
