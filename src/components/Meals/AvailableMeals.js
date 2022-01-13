import {  useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealsItem/MealItem';


  const AvailableMeals = () => {
    const[meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchMealsHandler = async () => {
     try {
       setIsLoading(true)
       setError(null)
      const response = await fetch('https://react-87d88-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      if(!response.ok){
        throw new Error ('Something went wrong!')
      }
      const data = await response.json()
      // console.log(data)

      const loadedMeals = []

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals)
     } catch (error) {
       setError(error.message)
     }
     setIsLoading(false)
    }

    useEffect(() => {
      fetchMealsHandler()
    },[])
    let content = <p>Meals not found</p>

    let mealsList = meals.map((meal) => 
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    )

    if(meals.length > 0 ){
      content = mealsList
    }

    if(error){
      content = <p>{error}</p>
    }
    if(isLoading){
     
      content = <p style={{color:'black'}}>Loading ...</p>
    }
   
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {content}
                </ul>
            </Card>
        </section>
    )

  }

  export default AvailableMeals