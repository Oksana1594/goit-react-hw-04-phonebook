import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Form from './Form/Form';
import ContactList from './Contacts/ContactsList/ContactsList';
import FieldToFilter from './FieldToFilter/FieldToFilter';
import Title from './Shared/Title';
import MainTitle from './Shared/MaineTitle';
import Container from './Shared/Container';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem("my-contacts"))
    return contacts ? contacts : []
  });
  const [filter, SetFilter] = useState('');

  useEffect(() => {localStorage.setItem("my-contacts", JSON.stringify(contacts))}, [contacts])

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name} number: ${number} is alredy in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = ({ target }) => {
    SetFilter(target.value);
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const result = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
    );
    return result;
  };

  const filteredContacts = getVisibleContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <Container>
      <MainTitle mainTitle="Phonebook " />
      <Form onSubmit={addContact} />
      <Title title="Contacts" />
      <FieldToFilter value={filter} onChange={changeFilter} />
      {isContacts ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p className="massage">Your phonebook is empty. Please add contact.</p>
      )}
    </Container>
  );

};

export default App;
