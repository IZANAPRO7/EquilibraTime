let meninas = [];
let meninos = [];
let time1 = [];
let time2 = [];
let historico = [];
let qtdMeninas = 2;
let qtdMeninos = 2;

function adicionarJogador(genero) {
    const input = document.getElementById(genero === 'menina' ? 'nomeMenina' : 'nomeMenino');
    const nome = input.value.trim();
    if (!nome) return;

    if (genero === 'menina') meninas.push(nome);
    else meninos.push(nome);

    input.value = '';
    atualizarListas();
}

function removerJogador(genero, index) {
    if (genero === 'menina') meninas.splice(index, 1);
    else meninos.splice(index, 1);
    atualizarListas();
}

function atualizarListas() {
    document.getElementById("listaMeninas").innerHTML = meninas.map((m, i) =>
        `<li>${m} <button class="btn-remover" onclick="removerJogador('menina', ${i})">❌</button></li>`
    ).join('');

    document.getElementById("listaMeninos").innerHTML = meninos.map((m, i) =>
        `<li>${m} <button class="btn-remover" onclick="removerJogador('menino', ${i})">❌</button></li>`
    ).join('');
}

function iniciarTimes() {
    qtdMeninas = parseInt(document.getElementById("qtdMeninas").value);
    qtdMeninos = parseInt(document.getElementById("qtdMeninos").value);

    sortearTime(1);
    sortearTime(2);

    document.getElementById("tela1").classList.remove("ativa");
    document.getElementById("tela2").classList.add("ativa");
}

function voltarTela1() {
    document.getElementById("tela2").classList.remove("ativa");
    document.getElementById("tela1").classList.add("ativa");
}

function sortearTime(num) {
    let novosJogadores = [];
    let bloqueio = (num === 1 ? time2 : time1); // bloqueia o outro time

    let meninasDisponiveis = meninas.filter(m => !bloqueio.includes(m));
    let meninosDisponiveis = meninos.filter(m => !bloqueio.includes(m));

    // Preencher meninas
    for (let i = 0; i < qtdMeninas; i++) {
        if (meninasDisponiveis.length > 0) {
            let sorteada = meninasDisponiveis.splice(Math.floor(Math.random() * meninasDisponiveis.length), 1)[0];
            novosJogadores.push(sorteada);
        } else {
            // repete do próprio time se necessário
            let repetida = (num === 1 ? time1 : time2).filter(m => meninas.includes(m));
            novosJogadores.push(repetida[Math.floor(Math.random() * repetida.length)]);
        }
    }

    // Preencher meninos
    for (let i = 0; i < qtdMeninos; i++) {
        if (meninosDisponiveis.length > 0) {
            let sorteado = meninosDisponiveis.splice(Math.floor(Math.random() * meninosDisponiveis.length), 1)[0];
            novosJogadores.push(sorteado);
        } else {
            let repetido = (num === 1 ? time1 : time2).filter(m => meninos.includes(m));
            novosJogadores.push(repetido[Math.floor(Math.random() * repetido.length)]);
        }
    }

    if (num === 1) time1 = novosJogadores;
    else time2 = novosJogadores;

    mostrarTimes();
}

function mostrarTimes() {
    document.getElementById("time1").innerHTML = time1.map(j => `<div class="jogador">${j}</div>`).join('');
    document.getElementById("time2").innerHTML = time2.map(j => `<div class="jogador">${j}</div>`).join('');
}