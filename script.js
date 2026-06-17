function salvarDados() {
    const endereco = {
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value
    };
    localStorage.setItem('endereco', JSON.stringify(endereco));
}

document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if (!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                salvarDados();
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP: ", error));
});


document.querySelector('form').addEventListener('submit', (evento) => {
    evento.preventDefault();
    const endereco = {
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value
    };
    localStorage.setItem('endereco', JSON.stringify(endereco));
    alert('Endereço salvo!');
});


window.onload = function() {
    const dados = localStorage.getItem('endereco');
    if (dados) {
        const endereco = JSON.parse(dados);
        document.getElementById('cep').value = endereco.cep || '';
        document.getElementById('logradouro').value = endereco.logradouro || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('cidade').value = endereco.cidade || '';
        document.getElementById('estado').value = endereco.estado || '';
        document.getElementById('numero').value = endereco.numero || '';
    }
};

document.querySelectorAll('input').forEach(function(input){
    input.addEventListener('input', salvarDados);
});
