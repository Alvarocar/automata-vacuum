import { useCallback, useEffect, useMemo, useState } from "react"
import Automata from "../automata"
import AutomataComponent from "../automata/automata.component"
import { EAutomataActions, EAutomataState } from "../automata/state.enum"
import { randomEnumValue, randomItemArray } from "../util/random"
import Section from "./children/section"
import { ESimulationState } from "./state.enum"

interface Props {
  cycles: number
  vacuumCleaner?: React.ReactElement
}

const Simulator: React.FC<Props> = ({
  cycles,
}) => {
  const [state, setState] = useState(ESimulationState.FULL)

  const [initialAutState] = useState(randomEnumValue(EAutomataState))

  const [trash1, trash2] = useMemo(() => {
    if (state === ESimulationState.EMPTY) {
      return [false, false]
    }
    if (state === ESimulationState.LEFT) {
      return [true, false]
    }
    if (state === ESimulationState.RIGHT) {
      return [false, true]
    }
    return [true, true]
  }, [state])

  const handleClean = useCallback((autState: EAutomataState, action: EAutomataActions) => {
    console.log(autState, action)
    setTimeout(() => {
      if (action !== EAutomataActions.CLEAN) {
        return
      }
      if (autState === EAutomataState.LEFT) {
        setState(EState => {
          if (EState === ESimulationState.FULL) {
            return ESimulationState.RIGHT
          }
          return ESimulationState.EMPTY
        })
      }
      if (autState === EAutomataState.RIGHT) {
        setState(EState => {
          if (EState === ESimulationState.FULL) {
            return ESimulationState.LEFT
          }
          return ESimulationState.EMPTY
        })
      }
    }, 2000)
  }, [setState])
  const handleStop = useCallback(() => {
    console.log("dentenerse")
  }, [])
  return (
    <div className="simulation">
      <Section className="simulation__section--1" trash={trash1} />
      <Section className="simulation__section--2" trash={trash2} />
      <AutomataComponent
        initialState={initialAutState}
        onClean={handleClean}
        onStop={handleStop}
        simulationState={state}
      />
    </div>
  )
}
export default Simulator
