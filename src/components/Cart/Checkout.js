import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  })
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isFiveChars(enteredPostal)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

    if(!formIsValid) {
      return
    }

    // submit data 
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity
    })
  };

  const nameControllClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const streetControllClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const postalControllClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`
  const cityControllClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControllClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p className={classes.invalid}>Please input a valid name.</p>}
      </div>
      <div className={streetControllClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p className={classes.invalid}>Please input a valid street.</p>}
      </div>
      <div className={postalControllClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputValidity.postalCode && <p className={classes.invalid}>Please input a valid postal code (min 5 character).</p>}
      </div>
      <div className={cityControllClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p className={classes.invalid}>Please input a city name.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;