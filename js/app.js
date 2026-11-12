var produtos = [
  {
    id: "tulipa",
    nome: "Tulipas",
    categoria: "flores",
    preco: 189.90,
    descricao: "Elegantes e delicadas, com cores vibrantes que simbolizam amor, carinho e renovação em arranjos cheios de tonalidades.",
    imagem: "../imagens/tulipas.jpeg",
    etiqueta: "Novidade"
},
{
  id: "rosa",
  nome: "Rosas",
  categoria: "flores",
  preco: 149.90,
  descricao: "Clássicas e sofisticadas, com beleza atemporal que representam amor, paixão e admiração para surpreender em momentos especiais.",
  imagem: "../imagens/rosas.jpeg",
  etiqueta: "Clássico"
},
{
  id: "lirio",
  nome: "Lírios",
  categoria: "flores",
  preco: 119.90,
  descricao: "Radiantes e perfumadas, com beleza marcante que simbolizam pureza, paz e prosperidade em buquês cheios de charme.",
  imagem: "../imagens/lirios.jpeg",
  etiqueta: "Em alta"
},
{
  id: "espada",
  nome: "Espada de São Jorge",
  categoria: "plantas",
  preco: 159.90,
  descricao: "Folhas longas e resistentes, com fácil cuidado ideais para iniciantes e por trazerem um toque de sofisticação.",
  imagem: "../imagens/espada.jpeg",
  etiqueta: "Presente especial"
},
{
  id: "costela",
  nome: "Costela de Adão",
  categoria: "plantas",
  preco: 89.90,
  descricao: "Folhas grandes e recortadas, com beleza marcante que trazem um toque tropical e moderno.",
  imagem: "../imagens/costela.jpeg",
  etiqueta: "Em alta"
},
{
  id: "suculenta",
  nome: "Trio de Suculentas",
  categoria: "plantas",
  preco: 59.90,
  descricao: "Charmosas e resistentes, perfeitas por sua praticidade e por trazerem um toque de delicadeza.",
  imagem: "../imagens/suculentas.jpeg",
  etiqueta: "Fácil cuidado"
},
{
  id: "vaso-decorativo",
  nome: "Vasos Decorativos",
  categoria: "vasos",
  preco: 79.90,
  descricao: "Feitos em cerâmica de alta qualidade, combinam formas orgânicas e estampas autorais para valorizar a beleza das suas flores.",
  imagem: "../imagens/decorativos.jpeg",
  etiqueta: "Feito para durar"
},
{
  id: "cachepot",
  nome: "Cachepot Terracota",
  categoria: "vasos",
  preco: 49.90,
  descricao: "Uma peça marcante em argila natural com grafismos esculpidos à mão, perfeita para destacar suas plantas com estilo e sofisticação.",
  imagem: "../imagens/cachepot.jpeg",
  etiqueta: "Favorito"
}
];

function moeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function imagemDoProduto(id) {
  return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=900&q=85";
}

function lerCarrinho() {
  var carrinho = localStorage.getItem("petalCart");
  if (carrinho) return JSON.parse(carrinho);
  return [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("petalCart", JSON.stringify(carrinho));
  atualizarContador();
}

function atualizarContador() {
  var carrinho = lerCarrinho();
  var quantidade = 0;
  for (var i = 0; i < carrinho.length; i++) quantidade += carrinho[i].qty;
  document.querySelectorAll("[data-cart-count]").forEach(function (item) {
    item.textContent = quantidade;
  });
}

function adicionarAoCarrinho(id) {
  var carrinho = lerCarrinho();
  var encontrado = false;
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === id) {
      carrinho[i].qty++;
      encontrado = true;
    }
  }
  if (!encontrado) carrinho.push({ id: id, qty: 1 });
  salvarCarrinho(carrinho);
  alert("Produto adicionado à sacola!");
}

function removerDoCarrinho(id) {
  var carrinho = lerCarrinho();
  var novoCarrinho = [];
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id !== id) novoCarrinho.push(carrinho[i]);
  }
  salvarCarrinho(novoCarrinho);
  mostrarCarrinho();
}

function mudarQuantidade(id, mudanca) {
  var carrinho = lerCarrinho();
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === id) carrinho[i].qty += mudanca;
  }
  var novoCarrinho = [];
  for (var j = 0; j < carrinho.length; j++) {
    if (carrinho[j].qty > 0) novoCarrinho.push(carrinho[j]);
  }
  salvarCarrinho(novoCarrinho);
  mostrarCarrinho();
}

function criarCartao(produto) {
  return '<article class="product-card">' +
    '<a class="product-image" href="detalhes.html?id=' + produto.id + '">' +
    '<img src="' + imagemDoProduto(produto.imagem) + '" alt="' + produto.nome + '">' +
    '<span class="product-tag">' + produto.etiqueta + '</span></a>' +
    '<div class="product-info"><p class="eyebrow">' + produto.categoria + '</p>' +
    '<h3>' + produto.nome + '</h3><p>' + produto.descricao + '</p>' +
    '<div class="product-buy"><strong>' + moeda(produto.preco) + '</strong>' +
    '<button class="button button-primary" type="button" onclick="adicionarAoCarrinho(\'' + produto.id + '\')">Adicionar</button>' +
    '</div></div></article>';
}

function imagemDoProduto(imagem) {
  return imagem;
}

function mostrarProdutos() {
  var listas = document.querySelectorAll("[data-product-list]");
  for (var i = 0; i < listas.length; i++) {
    var categoria = listas[i].getAttribute("data-product-list");
    var html = "";
    for (var j = 0; j < produtos.length; j++) {
      if (categoria === "all" || produtos[j].categoria === categoria) html += criarCartao(produtos[j]);
    }
    listas[i].innerHTML = html;
  }
}

function mostrarCarrinho() {
  var area = document.getElementById("cart-items");
  if (!area) return;
  var carrinho = lerCarrinho();
  var subtotal = 0;
  var html = "";
  if (carrinho.length === 0) {
    html = '<div class="empty-state"><h2>Sua sacola está vazia.</h2><p>Escolha um presente especial para continuar.</p><a class="button button-primary" href="catalogo-flores.html">Ver flores</a></div>';
  }
  for (var i = 0; i < carrinho.length; i++) {
    var produto = null;
    for (var j = 0; j < produtos.length; j++) if (produtos[j].id === carrinho[i].id) produto = produtos[j];
    if (!produto) continue;
    subtotal += produto.preco * carrinho[i].qty;
    html += '<article class="cart-row"><img src="' + imagemDoProduto(produto.imagem) + '" alt="' + produto.nome + '">' +
      '<div class="cart-product"><h3>' + produto.nome + '</h3><p>' + moeda(produto.preco) + '</p>' +
      '<button class="text-button" onclick="removerDoCarrinho(\'' + produto.id + '\')">Remover</button></div>' +
      '<div class="quantity-control"><button onclick="mudarQuantidade(\'' + produto.id + '\', -1)">-</button>' + carrinho[i].qty +
      '<button onclick="mudarQuantidade(\'' + produto.id + '\', 1)">+</button></div><strong>' + moeda(produto.preco * carrinho[i].qty) + '</strong></article>';
  }
  area.innerHTML = html;
  var subtotalArea = document.getElementById("cart-subtotal");
  var totalArea = document.getElementById("cart-total");
  if (subtotalArea) subtotalArea.textContent = moeda(subtotal);
  if (totalArea) totalArea.textContent = moeda(subtotal + (subtotal > 0 ? 12 : 0));
}

function mostrarDetalhes() {
  var area = document.getElementById("product-detail");
  if (!area) return;
  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id") || "buque-aurora";
  var produto = produtos[0];
  for (var i = 0; i < produtos.length; i++) if (produtos[i].id === id) produto = produtos[i];
  area.innerHTML = '<div class="detail-image"><img src="' + imagemDoProduto(produto.imagem) + '" alt="' + produto.nome + '"></div>' +
    '<div class="detail-copy"><p class="eyebrow">PETAL HOUSE · ' + produto.categoria + '</p><h1>' + produto.nome + '</h1>' +
    '<p class="detail-price">' + moeda(produto.preco) + '</p><p>' + produto.descricao + '</p>' +
    '<label for="detail-qty">Quantidade</label><div class="detail-actions"><input id="detail-qty" type="number" min="1" value="1">' +
    '<button class="button button-primary" id="detail-add">Adicionar à sacola</button></div></div>';
  document.getElementById("detail-add").onclick = function () {
    var qtd = Number(document.getElementById("detail-qty").value);
    if (qtd < 1) qtd = 1;
    for (var j = 0; j < qtd; j++) adicionarAoCarrinho(produto.id);
  };
}

function prepararFormularios() {
  var formularios = document.querySelectorAll("form[data-demo-form]");
  for (var i = 0; i < formularios.length; i++) {
    formularios[i].addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (this.id === "checkout-form" && lerCarrinho().length === 0) {
        alert("Adicione um produto antes de finalizar a compra.");
        return;
      }
      alert("Dados enviados com sucesso!");
      if (this.id === "checkout-form") {
        localStorage.removeItem("petalCart");
        atualizarContador();
      }
      this.reset();
    });
  }
}

function prepararMenu() {
  var botao = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".main-nav");
  if (botao && menu) botao.onclick = function () { menu.classList.toggle("is-open"); };
}

function ordenarProdutos(modo) {
  var lista = document.querySelector("[data-product-list]");
  if (!lista) return;
  var cartoes = Array.from(lista.querySelectorAll(".product-card"));
  cartoes.sort(function (a, b) {
    var nomeA = a.querySelector("h3").textContent;
    var nomeB = b.querySelector("h3").textContent;
    var precoA = Number(a.querySelector(".product-buy strong").textContent.replace("R$", "").replace(".", "").replace(",", "."));
    var precoB = Number(b.querySelector(".product-buy strong").textContent.replace("R$", "").replace(".", "").replace(",", "."));
    if (modo === "price-low") return precoA - precoB;
    if (modo === "price-high") return precoB - precoA;
    if (modo === "name") return nomeA.localeCompare(nomeB);
    return 0;
  });
  for (var i = 0; i < cartoes.length; i++) lista.appendChild(cartoes[i]);
}

window.addEventListener("DOMContentLoaded", function () {
  mostrarProdutos();
  mostrarCarrinho();
  mostrarDetalhes();
  atualizarContador();
  prepararFormularios();
  prepararMenu();
});
