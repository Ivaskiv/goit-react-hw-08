import { fetchContacts } from '../redux/contactsRedux/operations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { SearchBox } from '../components/SearchBox/SearchBox';
import { ContactList } from '../components/ContactList/ContactList';
import { selectError, selectIsLoading } from '../redux/contactsRedux/selectors';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <p>Find contacts by name</p>
      <SearchBox />
      {isLoading && !error && <b>Loading</b>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
