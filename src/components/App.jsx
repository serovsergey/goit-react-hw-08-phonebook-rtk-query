import { Component } from "react"
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
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
    name: '',
    number: ''
  }

  render() {
    const { contacts } = this.state;
    return (
      <main>
        <Section>
          <h1>Phonebook</h1>
        </Section>
        <Section>
          <ContactForm />
        </Section>
        <Section title="Contacts">
          <ContactList contacts={contacts} />
        </Section>
      </main>
    );
  }
};
