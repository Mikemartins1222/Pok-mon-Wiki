//var URL_API ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=60';
var URL_API = window.localStorage.getItem('currentLink');
var URL_API_ALL_BASE ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154';
var indexImg = 0; 


// TENTAR CONCLUIR A PAGINAÇÃO E TRABALHAR MAIS O CSS

addEventListener('load', function(){ //QUANDO A PÁGINA LER - EXECUTE A FUNÇÃO ABAIXO
    
    getPagination();
    getAPI(URL_API, criaListaCharacter); 
    window.localStorage.setItem('currentLink', 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=60')
    

});



const getPagination = () => {

    let pagBtn = [];
    
    for(var i=2; i <= 20; i++){

    pagBtn[i] = document.getElementById(`nav-${i}`);
    console.log('clicou na página'+i);
    

    }

    pagBtn[2].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=60&limit=120'));
    pagBtn[3].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=120&limit=180'));
    pagBtn[4].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=180&limit=240'));
    pagBtn[5].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=240&limit=300'));
    pagBtn[6].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=300&limit=360'));
    pagBtn[7].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=360&limit=420'));
    pagBtn[8].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=420&limit=480'));
    pagBtn[9].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=480&limit=540'));
    pagBtn[10].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=540&limit=600'));
    pagBtn[11].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=600&limit=660'));
    pagBtn[12].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=660&limit=720'));
    pagBtn[13].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=720&limit=780'));
    pagBtn[14].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=780&limit=840'));
    pagBtn[15].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=840&limit=900'));
    pagBtn[16].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=900&limit=960'));
    pagBtn[17].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=960&limit=1020'));
    pagBtn[18].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=1020&limit=1080'));
    pagBtn[19].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=1080&limit=1140'));
    pagBtn[20].addEventListener('click', ()=>  changePage('https://pokeapi.co/api/v2/pokemon?offset=1140&limit=1154'));
   
    
}

    


const changePage = (url) =>{

    console.log("QUAL A URL?"+url);
    window.localStorage.setItem('currentLink',url);
    location.reload();



}



const getAPI = (url, functionCallback) => {
    fetch(url).then(//TRAZ TODOS OS DADOS CONTIDOS NA URL
        (response) => response.json(), // resolve (retorno OK)
        (error) => console.log('ERRO AO CONECTAR') // reject (erro no retorno)
        ).then(
            dataJson => functionCallback(dataJson), // resolve (retorno OK)
            erro => console.error('erro') // reject (erro no retorno)
            ); 
}

var infoPKM = (data, name, htmlappend) => {


    
    let html = document.createElement('div'); //AQUI UMA DIV FOI CRIADA
    html.classList.add('card', 'col-2', 'my-5', 'bg-dark', 'ms-1'); // AQUI FORAM PASSADAS VÁRIAS CLASSES PARA A MESMA DIV 
    html.addEventListener('click', ()=> mostraDetalhesCharacter(name, data));
         
    let htmlBody = `
        <div class="card-header">
        <img class="card-img-top" src="${data.sprites.front_default}" alt="${name}">
        </div>
        <div class="card-body bg-white">
        <h2 class="text-primary text-center">${name}</h2>
        </div>`;

        html.innerHTML = htmlBody; //AQUI ESTÁ SENDO PASSADO PARA O CÓDIGO O "CÓDIGO HTML"
        htmlappend.appendChild(html);
      


}







const criaListaCharacter = (data) => {

  
  
    var conteiner = document.getElementById('conteiner-apresentacao');   
    
    
    data.results.forEach(pokemon => {
        

        
        
        fetch(pokemon.url).then(//TRAZ TODOS OS DADOS CONTIDOS NA URL
        (response) => response.json(), // resolve (retorno OK)
        (error) => console.log('ERRO AO CONECTAR') // reject (erro no retorno)
        ).then(
            dataJson => infoPKM(dataJson, pokemon.name, conteiner) , // resolve (retorno OK)
            erro => console.error('erro') // reject (erro no retorno)
            ); 
        
        
    
    });

}





   //ABAIXO RODA O MODAL//

const mostraDetalhesCharacter = (name, data) =>{

    console.log(`Clicou no Pokémon${name}`);
    changeImage = data.sprites.front_default; 
    
    
    let div = document.createElement('div');
    document.getElementById('modal-body').innerHTML = "";
    div.classList.add('card', 'col-12', 'my-4', 'bg-dark');

  
  
    
    let cardBody = `
            <div class="card-header">
                <img id="trocar-imagem" class="card-img-top" src="${changeImage}" alt="${name}">
                <button type="button" id="botao-img" class="btn btn-warning">Trocar Imagem</button>
            </div>
            <div class="card-body bg-white">
                <h1 class="text-primary text-center">${name}</h1>
                <article>
                    <ul class="list-group">
                        <li id="hab" class="list-group-item"></li>
                        <li id="tip" class="list-group-item"></li>
                        <li id="mov" class="list-group-item"></li>
                    </ul>
                </article>
            </div>
        `;
       
        div.innerHTML = cardBody;
        document.getElementById('modal-body').appendChild(div);
        document.getElementById('hab').innerHTML = "<h4>Habilidades:</h4>";
        
        
        for(var i=0; i < data.abilities.length; i++){

            let p = document.createElement('p');
            let pBody = `<p class="atributos-pkm">${data.abilities[i].ability.name}</p>`;
            p.innerHTML = pBody; 
            document.getElementById('hab').appendChild(p);
        
        
        }
        
        
        document.getElementById('tip').innerHTML = "<h4>Tipos:</h4>";

        for(var i=0; i < data.types.length; i++){

            let p = document.createElement('p');
            let pBody = `<p class="atributos-pkm">${data.types[i].type.name}</p>`;
            p.innerHTML = pBody; 
            document.getElementById('tip').appendChild(p);
        
        
        }



        document.getElementById('mov').innerHTML = "<h4>Movimentos:</h4>";

        for(var i=0; i < data.moves.length; i++){

            let p = document.createElement('p');
            let pBody = `<p class="atributos-pkm">${data.moves[i].move.name}</p>`;
            p.innerHTML = pBody; 
            document.getElementById('mov').appendChild(p);

        
        
        }
  
  

        
        
        changeImage = document.getElementById('botao-img');
        changeImage.addEventListener('click', ()=> changeImageCarrousel(data));
        
        
        
        
        $('#charModal').modal('show');
    
    
}



const changeImageCarrousel = (data) =>{

   
    let NextImg ='';
    indexImg ++; 
    
    if(indexImg == 1){

        NextImg = data.sprites.back_default;

    } else if(indexImg == 2){


        NextImg = data.sprites.front_default;
        indexImg = 0;
    }
    
    console.log(NextImg);
    
    var image = document.getElementById("trocar-imagem");
    image.src = NextImg;
    
  



}









    

