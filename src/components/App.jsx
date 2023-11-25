import React, { useState, useEffect, useRef} from 'react';
import { nanoid } from 'nanoid';    
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const initialContacts = [ 
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},];       

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contactList")) ?? initialContacts
  );
  
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);  
    
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]); 

  const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value); 
  };

  const handleSubmit = (e) => { 
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts]; 

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, number, id });
    }
 
    setContacts(contactsLists);
  };

  const handleDelete = (e) => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  }; 

  return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101', 
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={handleSubmit} />
        <h2> Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          contacts={getFilteredContacts()}
        handleDelete={handleDelete} 
        />
      </div>
    );
  } 