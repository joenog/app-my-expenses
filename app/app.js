//CLASS EXPENSES
class Despesa {
    constructor(year, month, day, type, description, value) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
        this.value = value;
    };
    //VALIDAR DADOS
    validateData() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            };
        };
        return true;
    };
};

// REGISTRATION N PEOPLE - STORE DATA
class Bd {
    constructor() {
        // RECUPERAR INDICE CASO HAJA
        let id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', 0);
        };
    };
    //FUNCAO PARA RECUPERAR NOVO ID - caso exista
    getNextId() {
        let nextId = parseInt(localStorage.getItem('id'));
        return nextId +1;
    };
    // FUNCAO PARA A INCLUSAO DE NOVAS DESPESAS 
    gravar(expen) {
        let id = this.getNextId();
        localStorage.setItem(id, JSON.stringify(expen)); //TRANSFORM OBJECT TO JSON
        localStorage.setItem('id', id);
    };
    //FUNCAO PARA RECUPERAR REGISTROS
    showExpenses() {
        let arrayExpenses = [];
        let id = localStorage.getItem('id');
        //RECUPER TODAS AS DESPESAS EM LOCALSTORAGE
        for (let i = 1; i <= id; i++) {
            let expenses = JSON.parse(localStorage.getItem(i)); //RECOVER EXPENSES
            //INDICES PULADOS OU REMOVIDOS
            if (expenses === null) {
                continue;
            }
            arrayExpenses.push(expenses);
        };
        return arrayExpenses;
    };
};
// INSTANCE NEW EXPENSE
let bd = new Bd();

/* BOTAO DE ENVIO DOS DADOS */
const addExpense = document.getElementById('addExpense');
addExpense.addEventListener('click', ()=> {
    // SELECINAR ELEMENTOS A SEREM ENVIADOS
    const year = document.getElementById("year");
    const month = document.getElementById("month");
    const day = document.getElementById("day");
    const type = document.getElementById("type");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    // INSTANCIA NOVA DESPESA
    let expenses = new Despesa(
        year.value,
        month.value, 
        day.value, 
        type.value, 
        description.value, 
        value.value);

    // VAILIDAR DADOS
    if(expenses.validateData()) {
        bd.gravar(expenses);
        // MODIFICAR ELEMENTOS QUANDO FOR ADICIONADA DESPESA
        document.getElementById('exampleModalLabel').innerText = 'Added';
        document.getElementById('textModal').innerText = `Expense saved successfully!`;
        document.getElementById('exampleModalLabel').className = 'modal-title text-success';
        document.getElementById('btnModal').className = 'btn btn-success';
        $('#registraDespesa').modal('show');
    } else {
        document.getElementById('textModal').innerText = `Fill in the fields to add...`;
        $('#registraDespesa').modal('show');
    };
});

function listExpenses() {
    let allExpenses = []; // NEW ARRAY TO RESTORE EXPENSES
    allExpenses = bd.showExpenses();
    //ELEMENT TBODY - TABLE LIST
    const listExpen = document.getElementById('listExpenses');
    allExpenses.forEach(function(d) {
        console.log(d)
        //CREATE ROW(TR) - LET ARMAZENA LINHA CRIADA
        let line = listExpen.insertRow();
        //CREATE CELL(TD) - LINHA CRIADA ARMAZENA VARIAS CELULAS
        line.insertCell(0).innerText = `${d.day}/${d.month}/${d.year}`; // FIRST LINE DATE
        // AJUST TYPE, NAME ATRIBUT
        switch(d.type) {
            case '1': d.type = 'Food'
                break
            case '2': d.type = 'Education'
                break
            case '3': d.type = 'Leisure'
                break
            case '4': d.type = 'Health'
                break
            case '5': d.type = 'Transport'
        };
        line.insertCell(1).innerText = `${d.type}`;
        line.insertCell(2).innerText = `${d.description}`;
        line.insertCell(3).innerText = `${d.value}`;
    });
};