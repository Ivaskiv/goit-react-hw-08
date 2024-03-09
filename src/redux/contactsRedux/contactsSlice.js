import {
  fetchContacts,
  addContact,
  deleteContact,
  toggleCompleted,
} from '../contactsRedux/operations';
import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../authRedux/operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// Створення slice для управління контактами
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [], // Початковий стан масиву контактів
    isLoading: false, // Прапорець, що вказує на те, чи триває завантаження
    error: null, // Об'єкт помилки, який вказує на можливу помилку в процесі завантаження
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false; // прапорець, завантаження розпочалося
        state.error = null; // скидання об'єкта помилки
        state.items = action.payload;
      })
      // Додавання нового контакту до масиву
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false; // прапорець, завантаження завершено
        state.error = null;
        state.items.push(action.payload); // Заповнення масиву контактів отриманими даними
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        state.items.splice(index, 1);
      })
      // Додавання нового контакту до масиву
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.items = state.items.map(contact => {
          if (contact.id === action.payload.id) {
            // Оновлення стану контакту залежно від отриманих даних
            return action.payload;
          }
          return contact;
        });
        state.isLoading = false;
        state.error = null;
      });
  },
});

// Експорт редуктора для використання в Redux store
export const contactsReducer = contactsSlice.reducer;
