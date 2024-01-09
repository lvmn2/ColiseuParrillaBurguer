  var cardapio = {
  sanduiches: [
    {
      nome: "Liseira",
      preco: 50.00,
      imagem: "Cardapio/Promocoes/ComboLiseira.png",
      descricao: "Pão, Molho Artesanal, Smash 60g, Alface e Tomate + Pão, Molho Artesanal, Smash 60g, Ovo, Alface e Tomate + Batata G + Guaraná 1l."
    },
    {
      nome: "Combo Ceasar",
      preco: 31.90,
      imagem: "Cardapio/Promocoes/comboCesar4.png",
      descricao: "Pão de parmesão, Molho Artesanal, Blend 120g, Coalho, Bacon + Batata + Refri."
    },
    {
      nome: "Cesarino",
      preco: 15.00,
      imagem: "Cardapio/1cesarino.jpg",
      descricao: "Pão, Molho Artesanal, Smash 60, Alface e Tomate."
    },
    {
      nome: "Roman Egg",
      preco: 17.00,
      imagem: "Cardapio/2romanEgg.jpg",
      descricao: "Pão, Molho Artesanal, Smash 60g, Ovo, Alface e Tomate."
    },
    {
      nome: "Duplo Smash",
      preco: 18.00,
      imagem: "Cardapio/doubleSmash.jpg",
      descricao: "Pão de Parmesão, Molho Artesanal, 2xSmash de 60g e 2xCheddar."
    },
    {
      nome: "Pão do Império",
      preco: 18.00,
      imagem: "Cardapio/3paoImperio.jpg",
      descricao: "Pão de Parmesão, Molho Artesanal, Blend 120g, Coalho e Cebola Caramelizada."
    },
    {
      nome: "Ceasar Bacon",
      preco: 20.00,
      imagem: "Cardapio/4Ceasar.jpg",
      descricao: "Pão de Parmesão, Molho artesanal, Blend 120g, Coalho e Bacon."
    },
    {
      nome: "Maximus Cheddar",
      preco: 23.00,
      imagem: "Cardapio/5max.jpg",
      descricao: "Pão de Parmesão, Molho artesanal, Blend 120g, Fondue de Cheddar, Cebola Crispy, Farofa de Bacon."
    },
    {
      nome: "Coliseu Burguer",
      preco: 30.00,
      imagem: "Cardapio/6Coliseu.jpg",
      descricao: "Pão de Parmesão, Molho artesanal, Blend 180g, Coalho, Farofa de Bacon, Ovo, Cebola Caramelizada e Cream Cheese."
    },
    {
      nome: "Churras",
      preco: 33.00,
      imagem: "Cardapio/7churras.jpg",
      descricao: "Pão de Parmesão, Pasta de Alho, Maminha, Queijo Cremoso, Vinagrete, Bacon Crocante"
    }
  ]
};

var modal = document.getElementById('modal');
var sacolaModal = document.getElementById('sacola-modal');
var carrinhoLista = document.getElementById('carrinho-lista');
var pedidos = [];

function abrirModal(imgSrc, nomeSanduiche) {
  var modalImg = document.getElementById('modal-img');
  var nomeSanduicheElement = document.getElementById('nomeSanduiche');

  modalImg.src = imgSrc;
  modalImg.classList.add('modal-image');
  nomeSanduicheElement.textContent = nomeSanduiche;
  modal.style.display = 'block';
}

function fecharModal() {
  modal.style.display = 'none';
}

function exibirSacola() {
  if (pedidos.length > 0) {
    sacolaModal.style.display = 'block';
    atualizarCarrinhoLista();
  } else {
    alert("Sua sacola está vazia :(");
  }
}

function fecharSacola() {
  sacolaModal.style.display = 'none';
}

function adicionarAoPedido() {
  var pontoCarneSelecionado = document.querySelector('input[name="pontoCarne"]:checked');
  var quantidadeSalSelecionada = document.querySelector('input[name="quantidadeSal"]:checked');
  var observacoes = document.getElementById('observacoes').value;

  if (pontoCarneSelecionado && quantidadeSalSelecionada) {
    var nomeSanduiche = document.getElementById('nomeSanduiche').textContent;

    if (!observacoes.trim()) {
      observacoes = "Sem observação";
    }

    var pedido = {
      nomeSanduiche: nomeSanduiche,
      pontoCarne: pontoCarneSelecionado.value,
      quantidadeSal: quantidadeSalSelecionada.value,
      observacoes: observacoes
    };

    var infoPedido = obterInformacoesPedido(nomeSanduiche);

    pedido.imagem = infoPedido.imagem;
    pedido.preco = infoPedido.preco;

    pedidos.push(pedido);

    
    atualizarCarrinhoLista();

   
    fecharModal();
  } else {
    alert("Por favor, selecione o ponto da carne e a quantidade de sal.");
  }
}

function atualizarCarrinhoLista() {
  
  carrinhoLista.innerHTML = '';

  
  pedidos.forEach(function (pedido, index) {
  var listItem = document.createElement('li');
  listItem.classList.add('carrinho-item');

  var imagemPedido = document.createElement('img');
  imagemPedido.src = pedido.imagem;
  imagemPedido.alt = 'Imagem do Pedido';
  imagemPedido.width = 80;
  imagemPedido.height = 80;
  listItem.appendChild(imagemPedido);

  
  var infoContainer = document.createElement('div');
  infoContainer.classList.add('info');

  var nomeSanduicheElement = document.createElement('h3');
  nomeSanduicheElement.textContent = pedido.nomeSanduiche;

  var pontoCarneElement = document.createElement('p');
  pontoCarneElement.textContent = `Ponto da Carne: ${pedido.pontoCarne}`;

  var quantidadeSalElement = document.createElement('p');
  quantidadeSalElement.textContent = `Quantidade de Sal: ${pedido.quantidadeSal}`;

  var observacoesElement = document.createElement('p');
  observacoesElement.textContent = `Observações: ${pedido.observacoes}`;

  
  infoContainer.appendChild(nomeSanduicheElement);
  infoContainer.appendChild(pontoCarneElement);
  infoContainer.appendChild(quantidadeSalElement);
  infoContainer.appendChild(observacoesElement);

  
  listItem.appendChild(infoContainer);

  
  var precoItem = document.createElement('span');
  precoItem.textContent = `Preço: R$ ${pedido.preco.toFixed(2)}`;
  listItem.appendChild(precoItem);

  var excluirBotao = document.createElement('button');
  excluirBotao.textContent = 'Excluir';
  excluirBotao.onclick = function () {
    excluirPedido(index);
  };
  listItem.appendChild(excluirBotao);

  carrinhoLista.appendChild(listItem);
});


  
  var precoFinal = document.createElement('p');
  precoFinal.textContent = `Preço Final: R$ ${calcularPrecoFinal().toFixed(2)}`;
  carrinhoLista.appendChild(precoFinal);
}

function calcularPrecoFinal() {
  var total = 0;
  pedidos.forEach(function (pedido) {
    total += pedido.preco;
  });
  return total;
}

function excluirPedido(index) {
  pedidos.splice(index, 1);
  atualizarCarrinhoLista();
}

function enviarPedido() {
  if (pedidos.length === 0) {
    alert("Você não possui nenhum pedido na sacola ainda.");
    return;
  }

  
  var mensagemPedido = `Olá, gostaria de fazer o seguinte pedido para entrega:\n\n`;

 
  pedidos.forEach(function (pedido, index) {
    mensagemPedido += `Item ${index + 1}:\n`;
    mensagemPedido += `- Nome: ${pedido.nomeSanduiche}\n`;
    mensagemPedido += `- Ponto da Carne: ${pedido.pontoCarne}\n`;
    mensagemPedido += `- Quantidade de Sal: ${pedido.quantidadeSal}\n`;
    mensagemPedido += `- Observações: ${pedido.observacoes}\n`;
    mensagemPedido += `- Preço Unitário: R$ ${pedido.preco.toFixed(2)}\n`;
  });

  
  mensagemPedido += `Informações do Cliente:\n`;
  mensagemPedido += `- Nome: ${document.getElementById("nome").value}\n`;
  mensagemPedido += `- Número de Celular: ${document.getElementById("telefone").value}\n`;
  mensagemPedido += `- Localização: ${document.getElementById("localizacao").value}\n\n`;

  
  mensagemPedido += `Total do Pedido: R$ ${calcularPrecoFinal().toFixed(2)}\n`;

  
  var numeroWhatsApp = "+558197199216";

  
  window.open(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagemPedido)}`, '_blank');
}


document.addEventListener('DOMContentLoaded', function () {
  var menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var imgSrc = item.querySelector('img').src;
      var nomeSanduiche = item.getAttribute('data-nome');
      abrirModal(imgSrc, nomeSanduiche);
    });
  });
});

// Função para obter informações do pedido do cardápio
function obterInformacoesPedido(nomeSanduiche) {
  var sanduiche = cardapio.sanduiches.find(function (item) {
    return item.nome === nomeSanduiche;
  });

  if (sanduiche) {
    return {
      imagem: sanduiche.imagem,
      preco: sanduiche.preco
    };
  }

  return {
    imagem: null,
    preco: null
  };
}
