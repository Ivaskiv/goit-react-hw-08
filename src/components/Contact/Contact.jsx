import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsRedux/operations';
import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';

import css from './Contact.module.css';

export const Contact = ({ id, name, number }) => {
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
          <FaPhoneAlt className={css.icon} />
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
