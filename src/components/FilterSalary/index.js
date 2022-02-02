import './index.css'

const FilterSalary = props => {
  const {eachItem, getSalaryFilter} = props
  const {salaryRangeId, label} = eachItem

  const onClickSalaryFilter = () => {
    getSalaryFilter(salaryRangeId)
  }

  return (
    <li>
      <input type="radio" id={label} onClick={onClickSalaryFilter} />
      <label htmlFor={label} className="filter-label">
        {label}
      </label>
    </li>
  )
}

export default FilterSalary
