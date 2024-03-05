//ContactsPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import { selectVisibleContacts } from '../redux/contactsRedux/selectors';
import { fetchContacts } from '../redux/contactsRedux/contactsOperations';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

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
