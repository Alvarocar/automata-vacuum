interface Props {
  trash: boolean
  className?: string
}

const Section: React.FC<Props> = ({
  trash,
  className,
}) => {
  return (
    <section
      className={`simulation__section ${className}`}
    >
      {trash && <div className="simulation__section--trash" ></div>}
    </section>
  )
}

export default Section
