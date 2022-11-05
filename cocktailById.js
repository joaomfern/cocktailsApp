const cocktail = async (id) =>{

    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    if(response.status !=200)
    throw new Error('Nao e possivel ler os dados');
    
    const data = await response.json();
    
    return data;
 };


export default cocktail;