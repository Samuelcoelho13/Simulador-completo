var produtos = [
    { nome: 'Computador Desktop Intel Core i5', valor: 3199.00, estoque: 5 },
    { nome: 'Laptop Ultrabook Intel Core i7', valor: 4799.00, estoque: 5 },
    { nome: 'Monitor LED 24 polegadas Full HD', valor: 799.90, estoque: 5 },
    { nome: 'Teclado Mecânico Gamer RGB', valor: 299.00, estoque: 5 },
    { nome: 'Mouse Óptico Sem Fio', valor: 79.90, estoque: 5 }
];

var vendas = [];
var vendaAtual = [];

function visualizarProdutos() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('product-list').style.display = 'block';
    
    var tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';
    produtos.forEach(function(produto, index) {
        var row = `<tr>
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>${produto.estoque}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function mostrarFormularioVenda() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('sale-form').style.display = 'block';
    
    var select = document.getElementById('product-index');
    select.innerHTML = '';
    produtos.forEach(function(produto, index) {
        var option = `<option value="${index}">${produto.nome}</option>`;
        select.innerHTML += option;
    });
    document.getElementById('venda-atual').innerHTML = '';
    vendaAtual = [];
}

function adicionarProdutoVenda() {
    var index = document.getElementById('product-index').value;
    var quantidade = parseInt(document.getElementById('product-quantity').value);
    
    var produto = produtos[index];
    if (quantidade > 0 && quantidade <= produto.estoque) {
        produto.estoque -= quantidade;
        vendaAtual.push({
            produto: produto.nome,
            quantidade: quantidade,
            precoUnitario: produto.valor,
            precoTotal: produto.valor * quantidade
        });

        var vendaItem = document.createElement('li');
        vendaItem.innerText = `${quantidade}x ${produto.nome} - R$ ${(produto.valor * quantidade).toFixed(2)}`;
        document.getElementById('venda-atual').appendChild(vendaItem);
    } else {
        alert('Quantidade inválida ou fora de estoque!');
    }
}

function finalizarVenda() {
    if (vendaAtual.length > 0) {
        vendas.push(...vendaAtual);
        alert('Venda finalizada com sucesso!');
        voltarMenu();
    } else {
        alert('Nenhum produto adicionado à venda.');
    }
}

function imprimirNotaFiscal() {
    if (vendas.length > 0) {
        var notaFiscal = 'NOTA FISCAL\nCidade: São Paulo, SP\n\n';
        var total = 0;
        vendas.forEach(function(venda) {
            notaFiscal += `${venda.quantidade}x ${venda.produto} - R$ ${venda.precoTotal.toFixed(2)}\n`;
            total += venda.precoTotal;
        });
        notaFiscal += `\nTOTAL: R$ ${total.toFixed(2)}`;

        document.getElementById('menu').style.display = 'none';
        document.getElementById('invoice').style.display = 'block';
        document.getElementById('invoice-content').innerText = notaFiscal;
    } else {
        alert('Não há vendas para imprimir nota fiscal.');
    }
}

function iniciarNovaVenda() {
    vendas = [];
    alert('Nova venda iniciada!');
    voltarMenu();
}

function voltarMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('sale-form').style.display = 'none';
    document.getElementById('invoice').style.display = 'none';
}

function sair() {
    alert('Saindo...');
    window.close();
}

// Iniciar o menu ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    voltarMenu();
});
