import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    // should not be used for complex initialization work, only basic class initialization
    // inputs are still not initialized
    console.log('CONSTRUCTOR');
  }

  ngOnInit() {
    // executed when Angular is done initializing the component's inputs
    // should be used for component initialization work
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    // executed whenever some of the component's inputs changes
    // could be used for state updates after a change of the inputs
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngDoCheck() {
    // related to Angular's change detection mechanism
    // executed whenever according to Angular an UI update might be needed 
    // (whenever an event or anything anywhere in the entire application is detected that could lead to data changes)
    // devs are discouraged to use it unless needed since it gets invoked a lot!!!
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    // content is any content that might be projected into a view using <ng-content />
    // it is essentially some other (partial) view data structure projected into the component's view
    // executed once any projected content has been initialized
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    // executed whenever the projected content has been checked by Angular's change detection mechanism
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    // the view is the component's template
    // technically, it is an internally managed data structure that holds reference to the DOM elements rendered by a component
    // executed once the component's view has been initialised (once it has been rendered to the real DOM)
    // this includes the projected content and all other elements which are part of the component's templated
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    // executed whenever Angular performed change detection for the component's view
    // (whenever Angular checked if some UI updates are needed due to some possible data changes)
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    // executed right before the component instance is about to be destroyed,
    // e. g. conditional rendering of the component and the condition is no longer met
    // a good option to do some cleanup work
    console.log('ngOnDestroy');
  }
}
