import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filterText = useSelector(selectFilter);

  const onFilterChange = value => {
    dispatch(setNameFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <input type="text" value={filterText || ''} onChange={e => onFilterChange(e.target.value)} />
    </div>
  );
};
export default SearchBox;
