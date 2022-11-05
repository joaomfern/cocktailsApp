const list= async (component,value,filter) =>{

    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}.php?${component}=${value}`);
    
    if(response.status !=200)
    throw new Error('Nao e possivel ler os dados');
    
    const data = await response.json();

    var listCocktails = []
 
    data.drinks.forEach(element => {
        var component = Object.values(element)
        listCocktails.push(component)
      
    });
 
    
    return listCocktails;
 };


export default list; 