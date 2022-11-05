import random from './random.js'
import components from './components.js'
import list from './list.js'
import cocktail from './cocktailById.js'

const randomCocktail = document.querySelector('#randomCocktail')
const offcanvasBody = document.querySelector('.offcanvas-body')
const groupButtons = document.querySelector('#components')
const cocktailsList = document.querySelector('#cocktailsList')
const formSearch = document.querySelector("#formSearch")
const liveToast = document.querySelector("#toastDiv")
const offcanvasLeftLabel = document.querySelector('#offcanvasLeftLabel')

function getIndredients(data){
  var listIngredients=[];     
  for (var i=1; i<16 ; i++) {
     var x= 'strIngredient'+i
     if(data[x] != null)
     listIngredients.push(data[x]) 
  }
  return listIngredients
}

random().then(data =>{
    randomCocktail.innerHTML= 
    `<div class="card flex-row">
    <div class="card-header">
    <img src="${data.drinks[0].strDrinkThumb}" height="200px" width="200px" class="rounded me-2" alt="...">  
    </div>
    <div class="card-block px-2">
    <br>
    <h4 class="card-title">${data.drinks[0].strDrink}</h4>
    <br>
    <p><small><strong>Category: </strong>${data.drinks[0].strCategory}</small></p> 
    <p><small><strong>Glass: </strong>${data.drinks[0].strGlass}</small></p> 
    <p><small>${data.drinks[0].strAlcoholic}</small></p> 
    <p><strong>Ingredients: </strong><small> ${getIndredients(data.drinks[0])}</small></p>
    <p><strong>How to make it:</strong> ${data.drinks[0].strInstructions}</p>
    </div>
</div>
`   
} )
.catch(err => {
  console.log('Erro', err.message)
});

groupButtons.addEventListener('click', e=>{
  if(e.target.tagName == 'BUTTON'){   

    var component= e.target.id


    offcanvasLeftLabel.innerHTML= e.target.innerText
    
    offcanvasBody.innerHTML=''

   components(component).then(data =>{
    data.forEach((value) => {
      offcanvasBody.innerHTML+=`<div id=${component} class="alert alert-warning" role="alert">
      ${value}
      </div>` 
    })
    } )
    .catch(err => {
  console.log('Erro', err.message)
    });  

  }
})


offcanvasBody.addEventListener('click',e=>{
  if(e.target.tagName == 'DIV' && e.target.getAttribute('role') == 'alert'){   
    cocktailsList.innerHTML=''

    var component = e.target.id
    var value = e.target.innerText

    cocktailsList.innerHTML=`<div class="alert alert-danger" role="alert">
    Results for: ${offcanvasLeftLabel.innerText} - ${value}
    </div>`

    list(component,value,'filter').then((data)=>{
      data.forEach( nome => {
        cocktailsList.innerHTML+=`<div id="${nome[2]}"class="alert alert-warning" role="alert">
        ${nome[0]}
        </div>` 
      })
    })
  }
})

formSearch.addEventListener('submit', e=>{
  e.preventDefault();
  var texto = formSearch.querySelector('#getText').value;
  cocktailsList.innerHTML=''
  cocktailsList.innerHTML=`<div class="alert alert-danger" role="alert">
  Results for: ${texto}
  </div>`
  list('s',texto,'search').then((data)=>{
    data.forEach( nome => {
      cocktailsList.innerHTML+=`<div id="${nome[0]}"class="alert alert-warning" role="alert">
      ${nome[1]}
      </div>`  
    })
  })

})

cocktailsList.addEventListener('click', e=>{
  if(e.target.tagName == 'DIV' && e.target.getAttribute('role') == 'alert'){  
    cocktail(e.target.id).then(data=>{

      liveToast.innerHTML+=`
      <div id="liveToast${data.drinks[0].idDrink}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="float: right;"></button>
      <div class="toast-header">      
      <img src="${data.drinks[0].strDrinkThumb}" height="200px" width="100%" class="rounded me-2" alt="...">       
      </div>
      <div class="toast-body">
      <p><strong class="me-auto">${data.drinks[0].strDrink}</strong></p>
      <p><small><strong>Category: </strong>${data.drinks[0].strCategory}</small></p> 
      <p><small><strong>Glass: </strong>${data.drinks[0].strGlass}</small></p> 
      <p><small>${data.drinks[0].strAlcoholic}</small></p> 
      <p><strong>Ingredients: </strong><small> ${getIndredients(data.drinks[0])}</small></p>
      <p><strong>How to make it:</strong> ${data.drinks[0].strInstructions}</p>
      </div>
      </div>
    ` 
    const toast = new bootstrap.Toast(liveToast.querySelector(`#liveToast${data.drinks[0].idDrink}`))   
    toast.show()
    })

   
  }

})