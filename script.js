axios.defaults.headers.common['Authorization'] = 'JUN0yDqM4gl6X2WCNJqGitQy';

let nome = '';

pegarNome();

function pegarNome(){
    nome = prompt("Qual o seu nome?");
    nome = {name: nome};
    console.log(nome);
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);
    promise.then(renderizarChat);
    promise.catch(pegarNome);
    setInterval(conexao,5000);
}

function conexao(){
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nome);
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
    promise.then(renderizarChat);
}

function renderizarChat(resposta){
    console.log(resposta.data);

}