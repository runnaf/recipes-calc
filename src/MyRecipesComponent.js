export function MyRecipeComponent ({name, calories, image, ingredients,totalDaily}) {
  return(
    <div className="recipe-item">
      <h2>{name}</h2>
      <img src={image} alt={name} width="300" height=" 300" />
      <p>{Math.ceil(calories)} kcal</p>
      <ul className="energetic-list">
        <li className="protein">{totalDaily.PROCNT.label + " " + Math.round(totalDaily.PROCNT.quantity) + " " + totalDaily.PROCNT.unit}</li>
        <li className="fat">{totalDaily.FAT.label + " " + Math.round(totalDaily.FAT.quantity) + " " + totalDaily.FAT.unit}</li>
        <li className="carbs">{totalDaily.CHOCDF.label + " " + Math.round(totalDaily.CHOCDF.quantity) + " " + totalDaily.CHOCDF.unit}</li>
      </ul>
      <ul className="ingredient-list">{ingredients.map((item, id) => {
        return <li key={ id }>{item}</li>
      })}</ul>      
    </div>
  )
}