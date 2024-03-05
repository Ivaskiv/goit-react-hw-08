import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact.jsx';
import css from '../ContactList/ContactList.module.css';
import { deleteContact } from '../../redux/contactsRedux/operations.js';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors.js';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };
  return (
    <ul className={css.contactList}>
      {visibleContacts.map(({ id, name, phone }) => (
        <Contact
          key={id}
          id={id + name}
          name={name}
          phone={phone}
          onDelete={() => handleDeleteContact(id)}
        />
      ))}
    </ul>
  );
};
export default ContactList;
