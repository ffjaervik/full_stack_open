import React from 'react'

const Filter = ({}) => {
  return (
    <div>
        Search for:
        <input value={filterTerm} onChange={handleFilterChange} onKeyDown={setFilterOn(prev => !prev) }/>
        {/* <button type="submit" onClick={() => setFilterOn((prev) => !prev)}>
          show {filterOn ? "filtered" : "all"}
        </button> */}
      </div>
  )
}

export default Filter