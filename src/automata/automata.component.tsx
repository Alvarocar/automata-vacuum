import { useEffect, useMemo, useState } from "react"
import Automata from "."
import { ESimulationState } from "../simulation/state.enum"
import { EAutomataActions, EAutomataState } from "./state.enum"

interface Props {
  initialState: EAutomataState
  onClean: (state: EAutomataState, action: EAutomataActions) => void,
  simulationState: ESimulationState,
  onStop: () => void
}

function move(position: EAutomataState) {
  if (position === EAutomataState.LEFT) {
    return EAutomataState.RIGHT
  }
  return EAutomataState.LEFT
}


const AutomataComponent: React.FC<Props> = ({
  initialState = EAutomataState.LEFT,
  onClean,
  onStop,
  simulationState,
}) => {
  const [on, setOn] = useState(true)
  const [autState, setAutState] = useState(initialState)
  const position = useMemo(() => autState === EAutomataState.LEFT ? "simulation__vacuum--left" : "simulation__vacuum--right", [autState])
  const onClass = useMemo(() => on ? "simulation__vacuum--on" : "", [on])
  const automata = useMemo(() => new Automata(initialState), [initialState])
  useEffect(() => {
    const timeout = setTimeout(() => {
      const action = automata.executeAction(simulationState)
      switch (action) {
        case EAutomataActions.MOVE:
          setAutState(state => move(state))
          break
        case EAutomataActions.CLEAN:
          onClean(automata.currentState, action)
          break;
        case EAutomataActions.OFF:
          setOn(false)
          onStop()
          break;
        default:
          break;
      }
    }, 3000)
    return () => clearTimeout(timeout)
  }, [simulationState, autState])
  return (
    <div className={`simulation__vacuum  ${position} ${onClass}`}></div>
  )
}

export default AutomataComponent