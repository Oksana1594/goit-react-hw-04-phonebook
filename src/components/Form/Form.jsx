import { useState } from "react";
import styles from './form.module.css'
import PropTypes from 'prop-types'
import initialState from './initialState'

const Form = ({ onSubmit }) => {
  const [state, setState] = useState({...initialState})

  const handleChange = ({target}) => {
    const { name, value } = target
    setState(prevState => {
      return {...prevState, [name]: value}
    })
  }
 
 const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number })
    setState({...initialState})
  }
  
  const {name, number} = state

   return (
      <form onSubmit={handleSubmit} className={styles.form}>
      <label  className={styles.label}>
        Name
        <input className={styles.input}
            type="text"
            name="name"
            placeholder="Taras Bulba"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
             />
            </label>
            <label className={styles.label}>
        Number
        <input className={styles.input}
             type="tel"
            name="number"
            placeholder="777-77-777"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
             />
      </label>
      <button type="submit" className={styles.button}>Add contacts</button>
      </form>  
        )
    }

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}