const random = async () =>{

    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    
    if(response.status !=200)
    throw new Error('Nao e possivel ler os dados');
    
    const data = await response.json();
    
    return data;
 };


export default random;