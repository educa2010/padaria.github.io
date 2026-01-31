const produtos = [
  { id: 1, nome: "Pão Francês", preco: 0.5 },
  { id: 2, nome: "Croissant", preco: 4 },
  { id: 3, nome: "Pão de Queijo", preco: 1.5 },
  { id: 4, nome: "Bolo", preco: 15 }
];

const lista = document.getElementById("lista");

produtos.forEach(p => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <p>R$ ${p.preco.toFixed(2)}</p>
    <button onclick="add(${p.id})">Adicionar</button>
  `;
  lista.appendChild(div);
});

function show(id) {
  document.querySelectorAll("section").forEach(s =>
    s.classList.remove("ativa")
  );
  document.getElementById(id).classList.add("ativa");
}

function add(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (item) item.qtd++;
  else {
    const p = produtos.find(p => p.id === id);
    cart.push({ ...p, qtd: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produto adicionado!");
}

function copiarPix() {
  navigator.clipboard.writeText("16993699410");
  alert("PIX copiado!");
}

function finalizar() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.length) return alert("Carrinho vazio");

  let pedido = {
    cliente: {
      nome: nome.value,
      telefone: telefone.value,
      endereco: endereco.value,
      obs: obs.value
    },
    itens: cart,
    data: new Date().toLocaleString()
  };

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem("cart");

  let msg = "🛒 *NOVO PEDIDO*%0A";
  msg += `Nome: ${pedido.cliente.nome}%0A`;
  msg += `Telefone: ${pedido.cliente.telefone}%0A`;
  msg += `Endereço: ${pedido.cliente.endereco}%0A%0A`;

  let total = 0;
  pedido.itens.forEach(i => {
    msg += `${i.nome} x${i.qtd}%0A`;
    total += i.preco * i.qtd;
  });

  msg += `%0ATotal: R$ ${total.toFixed(2)}%0APagamento: PIX`;

  window.open(`https://wa.me/5516993699410?text=${msg}`, "_blank");
  alert("Pedido enviado!");
  show("home");
}

function login() {
  if (user.value === "admin" && pass.value === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
    carregarPedidos();
  } else {
    alert("Login inválido");
  }
}

function carregarPedidos() {
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const div = document.getElementById("pedidos");
  div.innerHTML = "";

  pedidos.forEach(p => {
    const card = document.createElement("div");
    card.innerHTML = `
      <b>${p.cliente.nome}</b><br>
      ${p.cliente.telefone}<br>
      ${p.cliente.endereco}<br>
      ${p.data}
    `;
    div.appendChild(card);
  });
}
