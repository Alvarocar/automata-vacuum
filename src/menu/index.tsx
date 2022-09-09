import { useCallback } from "react"
import { useForm } from "react-hook-form"
import "./_menu.scss"

export interface FormData {
  cycles: number,
}

interface Props {
  onSubmit: (data: FormData) => void
}

const MenuComponent: React.FC<Props> = ({
  onSubmit
}) => {
  const { register, handleSubmit } = useForm<FormData>()

  const sendForm = useCallback((data: FormData) => {
    onSubmit(data)
  }, [onSubmit])

  return (
    <main className="menu">
      <h2>Aspiradora Aut&oacute;mata</h2>
      <form onSubmit={handleSubmit(sendForm)} className="menu__form">
        <div className="menu__form--section">
          <label className="menu__form--cycles-label" htmlFor="cycles">Numero de ciclos</label>
          <input
            className="menu__form--cycles-input"
            id="cycles"
            type="number"
            min="1"
            max="100"
            {...register("cycles")} />
        </div>
        <button className="menu__form--submit" type="submit">Comenzar</button>
      </form>
    </main >)
}

export default MenuComponent