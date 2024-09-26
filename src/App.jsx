// src/App.js
import React from 'react';


import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';
import { ContactProvider } from './canstants/ContactContext';

function App() {
    return (
        <ContactProvider>
            <Header/>
            <Contacts />
        </ContactProvider>
    );
}

export default App;
