import { ESimulationState } from "../simulation/state.enum";
import { EAutomataState } from "./state.enum";
import { CleanerStrategy, CleanStrategy, MoveStrategy, StopStrategy } from "./strategy";

export default class Automata {
  
  private strategy: CleanerStrategy
  private _currentState: EAutomataState 

  constructor(state: EAutomataState) {
    this.strategy = new CleanStrategy()
    this._currentState = state
  }

  private setStrategy(strategy: CleanerStrategy) {
    this.strategy = strategy
  }

  private set currentState(state: EAutomataState) {
    this._currentState = state
  } 

  public get currentState() {
    return this._currentState
  }

  public executeAction(envState: ESimulationState) {
    switch(envState) {
      case ESimulationState.EMPTY:
        this.setStrategy(new StopStrategy())
        break
      case ESimulationState.FULL:
        this.setStrategy(new CleanStrategy())
        break
      case ESimulationState.LEFT:
        if (this.currentState == EAutomataState.RIGHT) {
          this.setStrategy(new MoveStrategy())
          this.currentState = EAutomataState.LEFT
          break
        }
        this.setStrategy(new CleanStrategy())
        break
      case ESimulationState.RIGHT:
        if (this.currentState == EAutomataState.LEFT) {
          this.setStrategy(new MoveStrategy())
          this.currentState = EAutomataState.RIGHT
          break
        }
        this.setStrategy(new CleanStrategy())
        break
      default: 
        break
    }

    return this.strategy.clean()
  }
}