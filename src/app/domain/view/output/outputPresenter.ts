import {OutputState} from './outputState';
import {Subject} from 'rxjs';
import {OutputEvent} from './outputEvent';
import {OutputInitViewEvent} from './outputInitViewEvent';

export class OutputPresenter {
  private readonly _state: Subject<OutputState>;


  constructor() {
    this._state = new Subject();
  }


  get state(): Subject<OutputState> {
    return this._state;
  }

  publishEvent(event: OutputEvent): void {
    let nextState: OutputState;

    if (event instanceof OutputInitViewEvent) {
      nextState = new OutputState([]);
      this._state.next(nextState);
    }
  }
}
