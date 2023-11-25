import css from './Filter.module.css';

export const Filter = ({ filter, handleChange }) => (
  <div>
    <label className={css.filterLabel}>Find contacts by Name </label>
    <input
      className={css.filterName}
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filter} 
      onChange={(e)=> handleChange(e.target.value)}
    />
  </div>
);