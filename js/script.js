
    document.addEventListener('DOMContentLoaded', function() {
    const botao = document.querySelector('#button'); 
    const exercicio = document.querySelector('#exercise'); 
    const lista = document.querySelector(".lista"); 
    const imagem = document.querySelector(".imagem");

    botao.addEventListener('click', pesquisar); 
    
    async function pesquisar() {
        try {
            // Fazendo conexão com API de busca de imagens
            await fetch( `https://api.unsplash.com/search/photos?page=1&query=${exercicio.value}&per_page=1&client_id=KIEycx-QIVHpZR0XJPQnw6Uxh64OcC6LC_-meKQZfVs`)
            .then ((res)=> res.json())
            .then ((data) =>{
            const imagemEx = data.results[0].urls.small; // retornando a primeira imagem no tamanho pequeno
            imagem.src = imagemEx;
      
            })
         
            // Fazendo conexão com API de busca de exercícios 
            const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${exercicio.value}`;
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    'X-API-KEY': 'XR7x0Klxm+PBBkIrelOS4A==rgoztSMTvUN3CrKp'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }

            const exercicios = await response.json();
            displayExercicios(exercicios); // chamando função que mostra lista de exercícios e as calorias deles

        } catch (error) {
            console.error('Ocorreu um erro:', error);
            lista.innerHTML = `<p>Ocorreu um erro ao buscar os dados: ${error.message}</p>`;
        }
    }

    function displayExercicios(exercicios) {
        lista.innerHTML = ''; // Limpa a lista atual
        
        if (Array.isArray(exercicios) && exercicios.length > 0) {
            exercicios.forEach(element => {
                let tituloLista = document.createElement('dt');
                tituloLista.textContent = element.name;

                let caloriasExercicio = document.createElement('dd');
                caloriasExercicio.textContent = `Calorias por hora: ${element.calories_per_hour}`; 

                lista.appendChild(tituloLista); 
                lista.appendChild(caloriasExercicio);
            });
        } else {
            lista.innerHTML = '<p>Poxa! não encontramos nenhum exercício com esse nome :( Por favor, tente novamente</p>';
            imagem.src = '';
        }
    }
});
