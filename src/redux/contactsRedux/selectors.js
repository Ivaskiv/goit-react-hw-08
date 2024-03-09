import { createSelector } from 'reselect';
export const selectContacts = state => state.contacts;

export const selectFilter = state => state.filters.name;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contactsState, filter) => {
    const contacts = contactsState.items || [];

    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  }
);

// selectContacts: Вибирає весь об'єкт стану контактів.
// selectFilter: Вибирає поле фільтрації імені з об'єкта стану фільтрів.
// selectIsLoading: Вибирає стан завантаження контактів.
// selectError: Вибирає стан помилок контактів.
// selectVisibleContacts: Використовує createSelector для комбінації selectContacts і selectFilter. Він фільтрує контакти на основі значення фільтра і повертає відфільтрований масив.
