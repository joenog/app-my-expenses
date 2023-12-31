//2 SEGUNDO------ CLASSE PARA CRIAÇAO DE NOVAS DESPESAS
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    };
    //6----- VALIDAR DESPESAS
    validarDespesa() {
        for(let i in this) {
            if( this[i] === null || this[i] === undefined || this[i] == '') {
                return false;
            };
        };
        return true
    };
};

//5 ---- CRIADO BANCO DE DADOS PARA CRIAR O ID E ARMAZENAR NELE OS DADOS INSERIDOS NO INPUT
class Bd {
    //5.1----- RIANDO O ID INICIAL 
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0)
        };
    };
    //5----- DEFININDO QUAL SERÁ O PROXIMO ID
     getProximoId() {
        let proximoId = parseInt(localStorage.getItem('id'));
        return proximoId + 1;
     };

    // 4.1----- AO GRAVAR TRANSFORMO O OBJETO LITERAL EM STRING
    gravar(d) {
        //FUNCAO CHAMA LOCALSTORAGE E PELO PARAMETR DA FUNÇÃO ENVIA A INSTANCIA DA DESPESA E A TRANSFORMA EM STRING
        let id = this.getProximoId(); //VARIAVEL QUE RECEBE O PROXIMO ID INICIAD OE ICREMENTADO ACIMA
        localStorage.setItem(id, JSON.stringify(d)); // E RECEBER A STRING DA DESPESA INSERIDA
        localStorage.setItem('id', id); // SETO PARA O LOCALSTORAGE RECEBER O VALOR DA VARIAVEL ID
    };

    //7.1----- RECUPERANDO REGISTROS PARA SER MOSTRADOS
    recuperarTodosRegistros() {
        //ARRAY DE DESPESAS
        let despesas = [];

        let id = localStorage.getItem('id');
        //ASSIM POSSO RECUPERAR TODAS AS DEPSESAS CADASTRADAS EM LOCALSTORAGE
        for(let i = 1; i <= id; i++) {
            //RECUPERANDO AS DESPEAS 
            let despesa = JSON.parse(localStorage.getItem(i));

            //VERIFICAÃO DE ITENS PULADOS OU REMOVIDO
            if (despesa === null) {
                continue;
            } else {
                //DEPESA RECEBE ID = I  -- PARA ADICIONAR COMO NOVO ATRIBUTO A CHAVE DA DESPESA
                despesa.id = i;
                despesas.push(despesa);
            };
        };
        return despesas; // ENVIA AO FIM O ARRAY DE TODAS AS DESPESAS
    };
    //8.1 ----- FUNCAO QUE PESQUISA DESPESA
    pesquisar(despesa) { 
        // COPIA DA VARIAVEL CONTEDO TODOS OS REGISTROS
        let despesasFiltradas = this.recuperarTodosRegistros() // CHAMO O METODO E RECUPERO TODOS OS REGISTROS
  
        //AGORA APLICO OS FILTROS DE ANO, MES, DIA DESCRICAO, VALOR
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        };
        //FILTRO MES
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        };
        // FILTRO DIA
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        };
        //FILTRO TIPO
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        };
        //FILTRO DESCRICAO
        if (despesa.descricao != '' ) {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        };
        // FILTRO VALOR
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        };
        // FUNCAO PESQUISA RETORNA A COMPARAÇÃO ENTRE OS DADOS INSERIDOS E A INSERCAO ATUAL DA PESQUISA
        return despesasFiltradas;
    };

    //13----- FUNCCAO DENTRO DO BANCO DE DATOS QUE REMOVE ITENS
    remover(id) {
        localStorage.removeItem(id);
    };
};

// 5.1----- NOVA INSTACIA E BANCO DE DADOS
const bd = new Bd();

// 9---- FUNCAO PARA LIMPAR INPUTS
const limparInputs = () => {
    ano.value = '';
    mes.value = '';
    dia.value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = '';
};

//1 PRIMEIRO----- FUNÇÃO CRIARÁ UMA NOVA DESPESA INSERIDA NOS IMPUTS SEMPRE QUE CLICADA
function cadastrarDespesa() {
    //SELECAO DOS ELEMENTOS DA PAGINA
    const ano = document.getElementById('ano');
    const mes = document.getElementById('mes');
    const dia = document.getElementById('dia');
    const tipo = document.getElementById('tipo');
    const descricao = document.getElementById('descricao');
    const valor = document.getElementById('valor');

    //3 TERCEIRO------  INSTACIA DEPESAq RECEBE VALORES INSERIDOS NO INPUT
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    //6.1 CONDICIONAL PARA INSERIR OBJETOS NO BANDO DE DADOS
    if (despesa.validarDespesa()) {
        //4.0 NOVA FUNCAÇÃO QUE RECEBE O OBJETO LITERAL CRIADO ACIMA
        bd.gravar(despesa);
        //DIALOG DE SUCESSO
        document.getElementById('exampleModalLabel').innerText = 'Despesa adicionada';
        document.getElementById('msgModal').innerText = 'Despesa adicionada com sucesso';
        document.getElementById('exampleModalLabel').className = 'text-success';
        document.getElementById('btnModal').className = 'btn btn-success';
        $('#modalGravacao').modal('show');
    } else {
        //DIALOG DE ERRO JQUERY
        $('#modalGravacao').modal('show');
    };
    limparInputs();
};

//7----- FUNCTION PARA LISTAR OS REGISTROS NA PAGINA DE REGISTRO
function carregaListaDespesas(despesas = [], filtro = false) {
    if (despesas.length == 0 && filtro == false) {
        // SE O PARAMETRO RETORNAR DEFAULT SEM NENHUM PREENCHIMENTO RETORNO TODAS AS DESPESAS
        despesas = bd.recuperarTodosRegistros(); // FUNCAO CRIADA E CHAMADA DENTRO DO BANCO DE DADOS
    }; // SE O PARAMETRO RETORNAR OUTROS PARAMETROS ESSE SERÃO MOSTRADOS NA VIEW

    // SELECIONANDO O ELEMENTO TBODY DA TABELA
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';
    //8----- PERCORRER O ARRAY DESPESAS LISTANDO CADA UMA DE FORMA DINAMICA
    despesas.forEach(d => {
        //CRIANDO A LINHA <TR>
        let linha = listaDespesas.insertRow();
        //CRIADO UMA LINHA E NELA ADICIONADA CELULAS QUE RECEBEM DINAMICAMENTE PELO FOREACH OS PARAMETOS DO D.
        //CRIAANDO COLUNAS <TD> // AQUI A INSERÇÃO DINAMICA DO PARAMETRO D RECUPERANDO SEUS ATRIBUTOS
        linha.insertCell(0).innerText = `${d.dia}/${d.mes}/${d.ano}`; // PRIMEIRA CELULAR DATA
        //USANDO CASE PARA MODIFICA VAOR DO TIPO, INSERIR NOME AO INVER DA CHAVE
        switch(d.tipo) {
            case '1' : d.tipo = 'Alimentação';// VALOR RECEBIDO E ENVIADO COMO STRING
                break // USANDO CASE SOBREPONHO O VALOR RETORNADO PELO TIPO INSERIDO
            case '2' : d.tipo = 'Educação';
                break
            case '3' : d.tipo = 'Lazer';
                break
            case '4' : d.tipo = 'Saude';
                break
            case '5' : d.tipo = 'Transporte';
                break
        };
        linha.insertCell(1).innerText = `${d.tipo}`;
        linha.insertCell(2).innerText = `${d.descricao}`;
        linha.insertCell(3).innerText = `${d.valor}`;

        //CRIAR BOTAO DE EXCLUSAO
        let btn = document.createElement("button");
        btn.className = 'btn btn-sm ';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;
        linha.insertCell(4).appendChild(btn);

        btn.onclick = function() {
            //FUNCTION PARA REMOVER DESPESA
            let id = btn.id.replace('id_despesa_', ''); // REMOVO STIRNG DE INFORM E RECUPERO APENAS A CHAVE
            bd.remover(id); //CHAMO FUNCION DO BANCO DE DADOS PASSO O ID/CHAVE FORMATADA
            window.location.reload(); /// RECARREGO PAGINA PARA A VIEW ARUALIZAR INO

        };
    });
};

//8---- FUNCTION PARA FILTRAR DESPESAS
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById("descricao").value;
    let valor = document.getElementById('valor').value;
    // NOVA INSTANCIA  QUE RECEBE OS VALOR QUER SERAO BUSCADOS
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    //CHAMO O BD INSIRO A INSTANCIA DESPESA ACIONANDO O METODO PESQUISAR DO BANCO DE DADOS
    let despesas = bd.pesquisar(despesa);
    // 11----- CHAMO A FUNCAO LISTAS DESPESAS E E CARREGO AS DESPESAS FILTRADAS PELO PESQUISAR
    // ESSAS DESPESAS DISPARARA ALERT FAZENDO COM Q A FUNCAO CARREGALISTADESP.. MOSTRE NA VIEW OS DADOS FILTRADOS
    carregaListaDespesas(despesas, true);
};