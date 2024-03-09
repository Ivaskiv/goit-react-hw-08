// ContactsPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contactsRedux/operations';
import ContactForm from '../components/ContactForm/ContactForm';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList'; // Доданий імпорт
import { selectVisibleContacts } from '../redux/contactsRedux/selectors';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <h1>Phone Book</h1>
      <p>Find contacts by name</p>
      {isLoading && 'Request in progress...'}
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
