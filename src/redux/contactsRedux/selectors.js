import { createSelector } from 'reselect';
export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filters.name;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }
);
