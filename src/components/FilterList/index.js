import './index.css'

const FilterList = props => {
  const {eachItem, getEmployeeTypeFilter} = props
  const {label, employmentTypeId} = eachItem

  const onClickEmployeeTypeFilter = () => {
    getEmployeeTypeFilter(employmentTypeId)
  }
  return (
    <li>
      <input
        type="checkBox"
        id={`check-box-employee-filter-${employmentTypeId}`}
        onClick={onClickEmployeeTypeFilter}
      />
      <label
        className="filter-label"
        htmlFor={`check-box-employee-filter-${employmentTypeId}`}
      >
        {label}
      </label>
    </li>
  )
}

export default FilterList
