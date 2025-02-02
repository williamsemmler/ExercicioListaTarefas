function addTarefa() {
    let task = document.querySelector('.text').value.trim();
    if (task === "") return; // Se a tarefa estiver vazia, nem adiciona

    document.querySelector('.text').value = '';
    document.querySelector('.text').focus();
    
    criaTarefaNoDom(task);
    salvarTarefasStorage(task);
}

// Cria um <li> com o texto da tarefa e o botão "Apagar"
function criaElementLi(textInnerLi) {
    let li = document.createElement('li');
    li.innerText = textInnerLi + ' ';
    li.dataset.tarefa = textInnerLi; // Salva o texto no dataset pra facilitar a remoção depois

    const botaoLi = criaBotaoLi("Apagar");
    li.appendChild(botaoLi);
    return li;
}

// Adiciona a tarefa na lista do DOM
function criaTarefaNoDom(tarefa) {
    let listTaskItems = document.querySelector('.listTaskItems');
    let tarefaLi = criaElementLi(tarefa);
    listTaskItems.appendChild(tarefaLi);
}

// Cria o botão "Apagar" e adiciona a função de remover a tarefa
function criaBotaoLi(text) {
    let botao = document.createElement('button');
    botao.innerText = text;
    botao.onclick = function () {
        apagarTarefa(this);
    };
    return botao;
}

// Remove a tarefa do DOM e do localStorage
function apagarTarefa(botao) {
    let li = botao.closest('li'); // Acha o <li> mais próximo (garantindo que está dentro dele)
    let tarefaTexto = li.dataset.tarefa; // Pega o texto salvo no dataset

    li.remove(); // Remove do DOM
    removerTarefaStorage(tarefaTexto); // Remove do localStorage
}

// Recupera a lista de tarefas do localStorage (se não tiver nada, cria um array vazio)
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Salva a nova tarefa no localStorage
function salvarTarefasStorage(tarefa) {
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Remove a tarefa do localStorage
function removerTarefaStorage(tarefa) {
    tarefas = tarefas.filter(item => item !== tarefa); // Filtra e remove a tarefa do array
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o localStorage
}

// Recarrega as tarefas salvas no localStorage quando a página abrir
function recuperaTarefasStorage() {
    tarefas.forEach(tarefa => criaTarefaNoDom(tarefa));
}

// Chama a função ao carregar a página pra restaurar as tarefas salvas
recuperaTarefasStorage();