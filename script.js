axios.defaults.headers.common['Authorization'] = 'QvrjsZKGJ1H8evjKA56QR65s';

let nome = '';
let nomo = {};

pegarNome();

function pegarNome(){
    nome = prompt("Qual o seu nome?");
    nomo = {name: nome};
    console.log(nome);
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomo);
    promise.then(iniciar);
    promise.catch(pegarNome);
}

function iniciar(){
    setInterval(conexao,5000);
    setInterval(carregarMensagem, 3000);
    carregarMensagem();
}

function conexao(){
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nomo);
    console.log('oi');
}

function enviarMensagem(){
    const texto = document.querySelector("#mensagem").value;
    const mensagem = {
        from:nome,
        to:"Todos",
        text:texto,
        type:"message"
    }
    console.log(mensagem);
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',mensagem);
    //mensagem.reset();
    promise.then(carregarMensagem);
    promise.catch(recarregarPagina);
}

function carregarMensagem(){
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(renderizarChat);
}

function renderizarChat(resposta){
    console.log(resposta);
    resposta = resposta.data;
    let mensagens = document.querySelector('.mensagens');
    mensagens.innerHTML = "";
    for (let i = 0; i < resposta.length; i++) {
        if (resposta[i].type === "status"){
            mensagens.innerHTML += `<div class="mensagem cinza" data-test="message"><strong class="horario">${resposta[i].time}</strong> <strong class="nome">${resposta[i].from}</strong> ${resposta[i].text}</div>`;
        }
        if (resposta[i].type === "message"){
            mensagens.innerHTML += `<div class="mensagem" data-test="message"><strong class="horario">${resposta[i].time}</strong> <strong class="nome">${resposta[i].from}</strong> para <strong class="nome">${resposta[i].to}</strong>: ${resposta[i].text}</div>`;
        }
    }
}
function recarregarPagina(){
    window.location.reload();
}