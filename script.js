function enviarPedido() {
  var hamburguerQuantidade = document.querySelectorAll('.menu-item input')[0].value;
  var batataQuantidade = document.querySelectorAll('.menu-item input')[1].value;
  
  var mensagem = "Olá, gostaria de fazer um pedido:\n";
  if (hamburguerQuantidade > 0) {
    mensagem += hamburguerQuantidade + "x Hamburguer Tradicional\n";
  }
  if (batataQuantidade > 0) {
    mensagem += batataQuantidade + "x Batatas Fritas\n";
  }
  
  var linkWhatsApp = "https://wa.me/+5586995289292/?text=" + encodeURIComponent(mensagem);
  window.open(linkWhatsApp, '_blank');
}