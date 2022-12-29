import { useEffect, useState } from 'react';
import './App.css';
import { MyRecipeComponent } from './MyRecipesComponent';
import Select from 'react-select';
import video from './video/food.mp4';

const options = [
  { value: 'increasing', label: 'increasing calories' },
  { value: 'decreasing', label: 'decreasing calories' },
];

function App() {
  const API_ID = "7c4f4e85";
  const API_KEY = "dfeab3e069b8ba4442f1fdc1b4e02add";

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmit, setWordSubmit] = useState('avocado');
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(()=>{
    async function fetchData() {
      const result = await fetch(`https://api.edamam.com/search?q=${wordSubmit}&app_id=${API_ID}&app_key=${API_KEY}`);
      const data = await result.json();
      setMyRecipes(data.hits);
    }
    
    fetchData()
  }, [wordSubmit]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);   
  }

  const onChangeRecipes = () => {
    if (mySearch === '') {
      return alert('enter the ingredients')
    } else { getRecipes(mySearch) }
  }

  const getRecipes = (word) => {
    setWordSubmit(word)
  }

  const onChange = (newValue) => {
    setSelectedOption(newValue.value)
    if (newValue.value === 'increasing') {
      setMyRecipes( myRecipes.sort((function(a, b) {
        return a.recipe.calories - b.recipe.calories;
      })))
    } else if (newValue.value === 'decreasing') {
      setMyRecipes( myRecipes.sort((function(a, b) {
        return b.recipe.calories - a.recipe.calories;
      })))
    }
  }

  return (
    <div className="main">
      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>
      <form className='container form' onSubmit={(e)=>{e.preventDefault()}}>
        <fieldset className='form__search'>
          <input className="search" type="text" placeholder='search ...' onChange={myRecipeSearch} value={ mySearch } />
          <button type='submit' onClick={onChangeRecipes}>
            <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt='icons' className='icons' />
          </button>
        </fieldset>
        <fieldset className="form__select">
          <Select
            defaultValue={selectedOption}
            onChange={onChange}
            options={options}
            placeholder = 'sort by calories'
            classNamePrefix='select-filter'
          />
        </fieldset>        
      </form>
      <div className='wrapper'>{myRecipes.map((element, id)=>{
          const {label, image, calories, ingredientLines, totalNutrients } = element.recipe;
          return <MyRecipeComponent key={id} name = {label} image={image} calories={calories} ingredients={ingredientLines} totalDaily = {totalNutrients}/>
        })}
      </div>
    </div>
  );
}

export default App;
