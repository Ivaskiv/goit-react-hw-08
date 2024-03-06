import css from '../ContactList/ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

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
