import { useState } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from '../hooks/useLocalStorage';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Section from "./Section";

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const onAddRecord = ({ name, number }) => {
    const searchingName = name.toLowerCase();
    if (contacts.some(record => record.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(8), name, number }]);
  }

  const onDeleteRecord = id => {
    setContacts(prevState => prevState.filter(record => id !== record.id));
  }

  const onFilterChange = evt => {
    setFilter(evt.currentTarget.value)
  }

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(record => record.name.toLowerCase().includes(normalizedFilter));

  return (
    <main>
      <Section>
        <h1>Phonebook</h1>
      </Section>
      <Section>
        <ContactForm onAddRecord={onAddRecord} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={onFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteRecord={onDeleteRecord} />
      </Section>
    </main>
  );

};
