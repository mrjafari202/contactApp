import React, { useState } from 'react';  
import ContactsList from './ContactsList';  
import styles from './Contacta.module.css';  
import input from '../canstants/input';  
import { v4 } from 'uuid';  
import ModaleDleate from './ModaleDleate'; // اطمینان از وارد کردن کامپوننت مودال  

const Contacts = () => {  
    const [contacts, setContacts] = useState([]);  
    const [alert, setAlert] = useState('');  
    const [contant, setContact] = useState({  
        id: '',  
        name: '',  
        lastName: '',  
        email: '',  
        phone: ''  
    });  
    const [isModalOpen, setIsModalOpen] = useState(false); // مدیریت وضعیت مودال  

    const changeHandler = (event) => {  
        const name = event.target.name;  
        const value = event.target.value;  
        setContact((contant) => ({ ...contant, [name]: value }));  
    };  

    const addHandeler = () => {  
        if (!contant.name || !contant.lastName || !contant.email || !contant.phone) {  
            setAlert('please fill all fields');  
            return;  
        }  
        setAlert('');  
        const NewContact = { ...contant, id: v4() };  
        setContacts((contacts) => [...contacts, NewContact]);  
        setContact({  
            name: '',  
            lastName: '',  
            email: '',  
            phone: ''  
        });  
    };  

    const deleteHandeler = (id) => {  
        const newContact = contacts.filter((contant) => contant.id !== id);  
        setContacts(newContact);  
    };  

    const dleateAll = () => {  
        setContacts([]); // فقط وضعیت مخاطبین را پاک می‌کند  
        setIsModalOpen(false); // بستن مودال بعد از حذف  
    };  

    return (  
        <div className={styles.container}>  
            <div className={styles.form}>  
                {input.map((input, index) => (  
                    <input key={index} type={input.type} placeholder={input.placeholder} name={input.name} value={contant[input.name]} onChange={changeHandler} />  
                ))}  
                <button onClick={addHandeler}>Add Contact</button>  
            </div>  
            <div className={styles.alert}>{alert && <p>{alert}</p>}</div>  
            <ContactsList contacts={contacts} deleteHandeler={deleteHandeler} openModale={() => setIsModalOpen(true)} />  
            {isModalOpen && <ModaleDleate dleateAll={dleateAll} closeModal={() => setIsModalOpen(false)} />}  
        </div>  
    );  
};  

export default Contacts;