import { EAutomataActions } from "./state.enum";

export interface CleanerStrategy {
  clean: () => EAutomataActions
}

export class CleanStrategy implements CleanStrategy {
  constructor() {

  }
  public clean() {
    return EAutomataActions.CLEAN;
  }
}

export class MoveStrategy implements CleanStrategy {
  constructor() {

  }
  public clean() {
    return EAutomataActions.MOVE;
  }
}

export class StopStrategy implements CleanStrategy {
  constructor() {

  }
  public clean() {
    return EAutomataActions.OFF;
  }
}