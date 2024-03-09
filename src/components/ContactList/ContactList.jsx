import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsRedux/operations';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors';
import { Contact } from '../Contact/Contact';
import css from '../ContactList/ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={() => handleDeleteContact(id)}
        />
      ))}
    </ul>
  );
};
export default ContactList;
