import css from './ContactList.module.css';

export const ContactList = ({ contacts, handleDelete }) => (
  <div> 
    <ul className={css.contactList}>
      {contacts.map((contact, id) => (
        <li key={id} className={css.contactItem}>
          {contact.name}: {contact.number}
          <button
            type="button"
            className={css.contactBtn} 
            onClick={() => handleDelete(contact.id)}
          >
            Delete 
          </button>
        </li>
      ))}
    </ul>
  </div>
);  