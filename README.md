# Coletor

#### Coletor é uma aplicação web que roda em um coletor do modelo Zebra MC40, com o objetivo de realizar contagem para inventários ou listagem de produto para emissão de nota fiscal para transferência entre lojas.

#### O coletor ao realizar a leitura do codigo de barras ele escreve o codigo de 12 dígitos no campo que chama a api para validar se o produto existe e mostra para o operador como um carrinho de compra 

#### Ao salvar em txt ele salva todos os produtos do carrinho em um arquivo txt seguindo no padrão que o sistema Linx (sistema que roda o nosso estoque de produtos) entende
#### Os usuários são usados para diferenciar para qual categoria e pasta vai o arquivo txt

# API 

## Responsável por:
### - Buscar produtos no banco através do id (codigo de barra)

### - Gerar o arquivo txt
