import React from 'react';
import styles from './ContactList.module.css';
import ContactItem from './ContactItem';

const ContactsList = ({ contacts, deleteHandeler, openModale }) => {
    return (
        <div className={styles.cantainer}>
            <div className={styles.headline}>
                <h3>contacs List</h3>
                <button className={contacts.length ? styles.Dbutton : styles.Dnone} onClick={openModale}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                </button>
            </div>

            {contacts.length ? (
                <ul className={styles.contact}>
                    {contacts.map((contact) => (
                        <ContactItem key={contact.id} data={contact} deleteHandeler={deleteHandeler} />
                    ))}
                </ul>
            ) : (
                <p className={styles.mesaege}>no contacs</p>
            )}
        </div>
    );
};

export default ContactsList;