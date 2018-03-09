import {Action} from '@ngrx/store';

export class LoginStateAction implements Action {
  readonly type ;

  constructor(public payload: any) {
  }
}

