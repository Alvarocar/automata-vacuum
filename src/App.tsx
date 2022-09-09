import React, { useCallback, useMemo, useState } from 'react'
import Menu, { FormData } from './menu'
import './App.scss'
import Simulator from './simulation'

function App() {

  const [cycles, setCycles] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(0)

  const simulations = useMemo(() => {
    let array: any[] = []
    for (let x = 1; x <= cycles; x++) {
      array = [...array, React.lazy(() =>
        new Promise(resolve => setTimeout(resolve, 2000)).then(() => ({ default: Simulator }))
      )]
    }
    return array
  }, [cycles])


  const CurrentSimulation = useMemo(() => simulations[currentCycle], [simulations, currentCycle])

  const handleStart = useCallback((data: FormData) => {
    setCycles(data.cycles)
  }, [setCycles])

  const handleFinishStep = useCallback(() => {
    setTimeout(() => {
      if (currentCycle >= (cycles - 1)) {
        setCycles(0)
        return setCurrentCycle(0)
      }
      setCurrentCycle(value => value + 1)
    }, 2000)
  }, [currentCycle, cycles, setCurrentCycle])

  return (
    <>
      {simulations.length > 0 ?
        <React.Suspense fallback={<div className='menu__loading'><section>Simulacion: {currentCycle + 1}</section></div>}>
          <CurrentSimulation key={currentCycle} onFinish={handleFinishStep} />
        </React.Suspense>
        :
        <Menu onSubmit={handleStart}></Menu>
      }
    </>
  )
}

export default App
