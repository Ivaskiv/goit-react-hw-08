// ContactsPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from '../redux/contactsRedux/selectors';
import { fetchContacts } from '../redux/contactsRedux/operations';
import { selectVisibleContacts } from '../redux/contactsRedux/selectors'; // Виправлення імпорту
import ContactForm from '../components/ContactForm/ContactForm';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList'; // Доданий імпорт

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <p className="searchText">Find contacts by name</p>
      {isLoading && 'Request in progress...'}
      <SearchBox />
      <ContactList contacts={visibleContacts} />
    </div>
  );
};

export default ContactsPage;
