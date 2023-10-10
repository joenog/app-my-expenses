//CLASS DESPESAS
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
};
/* CADASTRO E PESSOAS - ARMAZENAR DADOS */
class Bd {
    constructor() {
        // RECUPERAÇÃO DO INDICE CASO HAJA
        let id = localStorage.getItem('id');
        // CASO N HAJA INDICE ELE SERÁ CRIADO INICIANDO EM 0
        if (id === null) {
            localStorage.setItem('id', 0);
        }; // CASO JA TENHA ID ELE SERÁ RECUPERADO NO INICIO
    };
    //FUNCAO PARA RECUPERAR NOVO ID - caso exista
    getProximoId() {
        let proximoId = parseInt(localStorage.getItem('id'));
        return proximoId +1;
    };
    // FUNCAO PARFA A INCLUSAO DE NOVAS DESPESAS 
    gravar(desp) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(desp)); //TRANSFORMO OBJETO EM JSON PARA GUARDALO
        localStorage.setItem('id', id);
    };
};
// instancia da nova despesa
let bd = new Bd();
// FIM DO CADASTRO DE PESSOAS

/* BOTAO DE ENVIO DOS DADOS */
const addDespesa = document.getElementById('addDespesa');
addDespesa.addEventListener('click', ()=> {
    // SELECINAR ELEMENTOS A SEREM ENVIADOS
    const ano = document.getElementById("ano");
    const mes = document.getElementById("mes");
    const dia = document.getElementById("dia");
    const tipo = document.getElementById("tipo");
    const descricao = document.getElementById("descricao");
    const valor = document.getElementById("valor");
    // INSTANCIA NOVA DESPESA
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    // CHAMADA DA FUNCAO DO OBJETO
    bd.gravar(despesa);
});
