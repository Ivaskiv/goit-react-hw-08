import { useDispatch, useSelector } from 'react-redux';
import { setContactsFilter } from '../../redux/contactsRedux/filterSlice';
import { selectFilter } from '../../redux/contactsRedux/selectors';
import css from './SearchBox.module.css';

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filterText = useSelector(selectFilter);

  const onFilterChange = value => {
    dispatch(setContactsFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        value={filterText || ''}
        onChange={e => onFilterChange(e.target.value)}
        name="filterText"
      />
    </div>
  );
};
export default SearchBox;
