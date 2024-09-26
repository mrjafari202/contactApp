// src/component/ContactItem.js
import React from 'react';
import styles from './ContactItem.module.css';

const ContactItem = ({ data: { id, name, lastName, email, phone }, deleteHandler, editHandler, toggleSelectContact, isSelected }) => {
    return (
        <li className={styles.item}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectContact(id)}
            />
            <p>{name} {lastName}</p>
            <p>
                <span>📧</span>
                {email}
            </p>
            <p>
                <span>📞</span>
                {phone}
            </p>
            <button onClick={() => deleteHandler(id)}>
                🗑️
            </button>
            <button onClick={() => editHandler(id)}>
                ✏️
            </button>
        </li>
    );
};

export default ContactItem;
