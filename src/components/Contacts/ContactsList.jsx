
import React from 'react';
import styles from './ContactList.module.css';
import ContactItem from './ContactItem';

const ContactsList = ({ contacts, deleteHandler, editHandler, openModal, toggleSelectContact, selectedContacts }) => {
    return (
        <div className={styles.container}>
            <div className={styles.headline}>
                <h3>Contacts List</h3>
                <button className={contacts.length ? styles.Dbutton : styles.Dnone} onClick={openModal}>
                    {/* SVG Icon */}
                </button>
            </div>

            {contacts.length ? (
                <ul className={styles.contact}>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            data={contact}
                            deleteHandler={deleteHandler}
                            editHandler={editHandler}
                            toggleSelectContact={toggleSelectContact}
                            isSelected={selectedContacts.includes(contact.id)} // وضعیت انتخاب
                        />
                    ))}
                </ul>
            ) : (
                <p className={styles.message}>No contacts</p>
            )}
        </div>
    );
};

export default ContactsList;
