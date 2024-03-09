import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FanumberAlt, FaUser } from 'react-icons/fa';

export const Contact = ({ id, name, number, onDelete }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.contact}>
      <div className={css.contactTitle}>
        <p className={css.contactName}>
          <FaUser className={css.icon} />
          {name}
        </p>
        <p className={css.contactnumber}>
          <FanumberAlt className={css.icon} />
          {number}
        </p>
      </div>
      <button className={css.btnContact} type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};
export default Contact;
