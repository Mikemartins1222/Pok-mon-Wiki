var URL_API ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=60';
var URL_API_ALL_BASE ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154';
var indexImg = 0; 


addEventListener('load', function(){ //QUANDO A PÁGINA LER - EXECUTE A FUNÇÃO ABAIXO
    
    if(window.localStorage.getItem('termoBusca') != ''){
        
        getAPIallbase(URL_API_ALL_BASE, checkBase);
        
        
        
    }



});



const getAPIallbase = (url, functionCallback) => {
    fetch(url).then(//TRAZ TODOS OS DADOS CONTIDOS NA URL
        (response) => response.json(), // resolve (retorno OK)
        (error) => window.alert('ERRO AO CONECTAR') // reject (erro no retorno)
        ).then(
            dataJson => functionCallback(dataJson), // resolve (retorno OK)
            (error) => window.alert('ERRO AO CONECTAR') // reject (erro no retorno)
            ); 
}





const saveTermo = () => {


    
    
    var TermoInput = document.getElementById('busca-pokemon').value;
    let termoConvertido = TermoInput.toLowerCase();
    
   
    if(termoConvertido == ''){

        window.alert('O campo está vazio');
        window.localStorage.setItem('termoBusca','');
    
    } else {

        window.localStorage.setItem('termoBusca',termoConvertido);
       
    
    }


}



const checkBase = (data) =>{

    
    var conteiner = document.getElementById('conteiner-apresentacao');   
    
    for(var i=0; i < data.results.length; i++){
    
            console.log(data.results[i].name);
        
        
             if(window.localStorage.getItem('termoBusca') == data.results[i].name){
        
                criaListaCharacter(data.results[i].url, data.results[i].name)
                
                
                return  window.localStorage.setItem('termoBusca','');
            
        
        
        
             }
    
    
       
            
    }
    
     window.alert('Pokémon não Encontrado');
     return window.localStorage.setItem('termoBusca','');
    
    }
    



    const criaListaCharacter = (url, name) => {

  
        window.alert('Pokémon Encontrado');
        var conteiner = document.getElementById('conteiner-apresentacao'); 
        fetch(url).then(//TRAZ TODOS OS DADOS CONTIDOS NA URL
            (response) => response.json(), // resolve (retorno OK)
            (error) => console.log('ERRO AO CONECTAR') // reject (erro no retorno)
            ).then(
                dataJson => infoPKMBuscaunica(dataJson, name, conteiner), // resolve (retorno OK)
                erro => console.error('erro') // reject (erro no retorno)
                ); 
            
            
        

    }
    


    var infoPKMBuscaunica = (data, name, htmlappend) => {


    
        let html = document.createElement('div'); //AQUI UMA DIV FOI CRIADA
        html.classList.add('card', 'col-3', 'my-4', 'bg-dark', 'ms-1'); // AQUI FORAM PASSADAS VÁRIAS CLASSES PARA A MESMA DIV 
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

    
    
    





var buscaBtn = document.getElementById('botao-buscar');
buscaBtn.addEventListener('click', ()=> saveTermo());