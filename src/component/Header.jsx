import React from 'react'
import styles from './Header.module.css'
const Header = () => {
  return (
    <div className={styles.container}>
        <h1>Header</h1>
        <p>
            <a href="https://doc.webzi.ir/site-management/469-add-a-contact-to-the-contact-list.html">Contact App</a> | react.js
        </p>
    </div>
  )
}

export default Header