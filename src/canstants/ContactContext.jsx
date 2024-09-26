// src/contacts/ContactContext.js
import React, { createContext, useReducer } from 'react';
import { v4 } from 'uuid';

const ContactContext = createContext();

const initialState = {
    contacts: [],
    alert: '',
};

const contactReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, { ...action.payload, id: v4() }],
                alert: '',
            };
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
            };
        case 'SET_ALERT':
            return {
                ...state,
                alert: action.payload,
            };
        case 'CLEAR_CONTACTS':
            return {
                ...state,
                contacts: [],
            };
            case 'EDIT_CONTACT':
                return {
                    ...state,
                    contacts: state.contacts.map(contact => 
                        contact.id === action.payload.id ? action.payload : contact
                    ),
                };
                case 'DELETE_MULTIPLE_CONTACTS':
            return {
                ...state,
                contacts: state.contacts.filter(contact => !action.payload.includes(contact.id)),
            };
        default:
            return state;
    }
};

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    return (
        <ContactContext.Provider value={{ state, dispatch }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContactContext = () => React.useContext(ContactContext);
