const components= async (component) =>{

    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${component}=list`);
    
    if(response.status !=200)
    throw new Error('Nao e possivel ler os dados');
    
    const data = await response.json();

    var listComponents = []
    
    data.drinks.forEach(element => {
        var component = Object.values(element)
        listComponents.push(component)
      
    });
 
  
    return listComponents;
 };


export default components; 