import { useDispatch } from "react-redux"
import { changeFilter } from "reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault()
    dispatch(changeFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter