import React, { useState, useEffect, useContext } from 'react';
import ContactsList from './ContactsList';
import styles from './Contacta.module.css';
import input from '../../canstants/input';
import ConfirmModal from '../ConfirmModal';
import axios from 'axios';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({ name: '', lastName: '', email: '', phone: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // بارگذاری داده‌ها از API
        const fetchContacts = async () => {
            const response = await axios.get('http://localhost:3001/contacts');
            setContacts(response.data);
        };

        fetchContacts();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!contact.name.trim()) newErrors.name = 'Name is required';
        if (!contact.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!contact.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!contact.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d+$/.test(contact.phone)) {
            newErrors.phone = 'Phone number must contain only digits';
        } else if (contact.phone.length < 10) {
            newErrors.phone = 'Phone number must be at least 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setContact((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const addHandler = async () => {
        if (!validate()) {
            return;
        }

        if (isEditing) {
            await axios.put(`http://localhost:3001/contacts/${editingId}`, contact);
            setIsEditing(false);
            setEditingId(null);
        } else {
            await axios.post('http://localhost:3001/contacts', contact);
        }

        setContact({ name: '', lastName: '', email: '', phone: '' });
        loadContacts(); // بارگذاری دوباره مخاطبین
    };

    const editHandler = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setContact({ name: contactToEdit.name, lastName: contactToEdit.lastName, email: contactToEdit.email, phone: contactToEdit.phone });
        setIsEditing(true);
        setEditingId(id);
    };

    const deleteHandler = async (id) => {
        setConfirmMessage('آیا از حذف این مخاطب مطمئنید؟');
        setConfirmAction(() => async () => {
            await axios.delete(`http://localhost:3001/contacts/${id}`);
            loadContacts(); // بارگذاری دوباره مخاطبین
            setIsConfirmOpen(false);
        });
        setIsConfirmOpen(true);
    };

    const deleteMultipleHandler = async () => {
        setConfirmMessage('آیا از حذف این مخاطبین مطمئنید؟');
        setConfirmAction(() => async () => {
            await Promise.all(selectedContacts.map(id => axios.delete(`http://localhost:3001/contacts/${id}`)));
            loadContacts(); // بارگذاری دوباره مخاطبین
            setSelectedContacts([]);
            setIsConfirmOpen(false);
        });
        setIsConfirmOpen(true);
    };

    const loadContacts = async () => {
        const response = await axios.get('http://localhost:3001/contacts');
        setContacts(response.data);
    };

    const toggleSelectContact = (id) => {
        setSelectedContacts(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(contactId => contactId !== id)
                : [...prevSelected, id]
        );
    };

    const filteredContacts = contacts.filter((contact) => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {input.map((input, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <input
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={contact[input.name]}
                            onChange={changeHandler}
                            className={errors[input.name] ? styles.errorInput : ''}
                        />
                        {errors[input.name] && <p className={styles.error}>{errors[input.name]}</p>}
                    </div>
                ))}
                <button onClick={addHandler}>
                    {isEditing ? 'Edit Contact' : 'Add Contact'}
                </button>
            </div>

            <div className={styles.search}>
                <input 
                    type="text" 
                    placeholder="Search by name, last name or email..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            {selectedContacts.length > 0 && (
                <button className={styles.groupDeleteButton} onClick={deleteMultipleHandler}>
                    Delete all
                </button>
            )}

            <ContactsList
                contacts={filteredContacts}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                toggleSelectContact={toggleSelectContact}
                selectedContacts={selectedContacts}
            />

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmAction}
                message={confirmMessage}
            />
        </div>
    );
};

export default Contacts;
