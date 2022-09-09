import { nanoid } from "nanoid";
import { Component } from "react"
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Section from "./Section";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  onAddRecord = ({ name, number }) => {
    const searhingName = name.toLowerCase();
    if (this.state.contacts.some(record => record.name.toLowerCase() === searhingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => (
      { contacts: [...prevState.contacts, { id: nanoid(8), name, number }] }
    ))
  }

  onDeleteRecord = id => {
    this.setState(prevState => (
      { contacts: prevState.contacts.filter(record => id !== record.id) }
    ))
  }

  onFilterChange = evt => {
    this.setState({
      filter: evt.currentTarget.value
    })
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(record => record.name.toLowerCase().includes(normalizedFilter));
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    try {
      const parsedContacts = JSON.parse(contacts);
      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
    }
    catch (e) {
      console.error(e.message);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <main>
        <Section>
          <h1>Phonebook</h1>
        </Section>
        <Section>
          <ContactForm onAddRecord={this.onAddRecord} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.onFilterChange} />
          <ContactList contacts={filteredContacts} onDeleteRecord={this.onDeleteRecord} />
        </Section>
      </main>
    );
  }
};
