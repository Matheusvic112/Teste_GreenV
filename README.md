<h2 align="center" style='font-family: sans-serif'>
	API(Back-end)
</h2>
<h2>Teste técnico  </h2>

# API de Gerenciamento de Veículos, Usuários e Companhias

Esta é uma API para gerenciamento de veículos, usuários e companhias. Permite criar, listar, atualizar e excluir registros dessas entidades, além de associar veículos a usuários ou companhias.

## Entidades

A API possui as seguintes entidades:

### Veículos

- Pertencem a um único usuário ou a apenas uma única companhia.
- Campos obrigatórios: placa e alias.

### Usuários

- Podem pertencer a uma ou nenhuma companhia.
- Campos obrigatórios: nome, CPF, telefone e email.

### Companhias

- Campos obrigatórios: nome, CNPJ, telefone e email.

## Testes de Integração

A API possui testes de integração para garantir a qualidade e o correto funcionamento dos endpoints. Os testes são executados usando a biblioteca de testes Jest e abrangem cenários como criação, atualização e exclusão de registros, bem como associação de veículos a usuários ou companhias.

Para executar os testes, utilize o comando `npm test`.

## CI/CD

A API está configurada com um pipeline de CI/CD usando uma ferramenta de integração contínua, como o Jenkins ou o GitLab CI/CD. O pipeline é responsável por executar os testes de integração, garantindo que todas as alterações de código estejam funcionando corretamente antes de serem implantadas em produção.

## Recursos Adicionais

Esta API serve como base para implementações adicionais, como autenticação de usuários, permissões de acesso, paginação de resultados, entre outros recursos. Sinta-se à vontade para explorar e adicionar novas funcionalidades conforme necessário.

## Configuração

Antes de executar a API, certifique-se de configurar corretamente as variáveis de ambiente, como as informações de conexão com o banco de dados e as chaves de API necessárias.


<br/>

## **( Todas as rotas precisa de autenticação)**

<br/>

<h2 align ='center'> Criando Usuario </h2>

<br/>

`POST /users  - STATUS 200`

```json
[
  {
    "name": "Matheus Silva",
    "email": "matheus@example.com",
    "phone": "(99) 9999-9999",
    "password": "@Teste123",
    "cpf": "12345678978"
  }
]
```

`POST /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "name": "Matheus Silva",
    "email": "matheus@example.com",
    "phone": "(99) 9999-9999",
    "cpf": "12345678978",
    "id": "da2cddd1-5412-4421-8586-2f1c5a34a8d7"
  }
]
```

## **( Todas os campos devem ser preenchidos corretamente)**

## <br/>

<li style='font-size: 20px'>Logando o Usuario:</li>

<br/>

`POST /login  - STATUS 200`

```json
[
  {
    "email": "matheus@example.com",
    "password": "@Teste123"
  }
]
```

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhldXNAZXhhbXBsZS5jb20iLCJpZCI6ImRhMmNkZGQxLTU0MTItNDQyMS04NTg2LTJmMWM1YTM0YThkNyIsImlhdCI6MTY4ODc1NTgyNCwiZXhwIjoxNjg4OTI4NjI0LCJzdWIiOiJkYTJjZGRkMS01NDEyLTQ0MjEtODU4Ni0yZjFjNWEzNGE4ZDcifQ.ADeQ3n-tqCZHkrCFbMuRflO2D-_QhTsTRqB5RbHULz0"
  }
]
```

<li style='font-size: 20px'>Editando o Usuario:</li>

`PATCH /users/:id - STATUS 200`

```json
[
  {
    "name": "Matheus Silva Vicente"
  }
]
```

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "da2cddd1-5412-4421-8586-2f1c5a34a8d7",
    "name": "Matheus Silva Vicente",
    "email": "matheus@example.com",
    "phone": "(99) 9999-9999",
    "cpf": "12345678978"
  }
]
```

<li style='font-size: 20px'>Deletando um Usuario:</li>

<br/>

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 204`

```json

  status 204

```

## <br/>

<li style='font-size: 20px'>Criação de um veiculo:</li>

<br/>

`POST /veiculos/:id(id do Usuario)-FORMATO DA RESPOSTA  - 201`

```json
{
{
	"brand": "Marca",
	"model": "Modelo do Veículo",
	"year": "1991",
	"plate": "br5r984",

}
}
```

`POST /veiculos/:id(id do Usuario) - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "brand": "Marca",
  "model": "Modelo do Veículo",
  "year": "1991",
  "plate": "br5r984",
  "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734",
  "id": "021e40fb-43b4-4437-9d0e-25b478cc320b"
}
```

<li style='font-size: 20px'>Atualização de um veiculo:</li>

## <br/>

<br/>

`PATCH /veiculo/:id(id do veiculo ) - FORMATO DA REQUISIÇÃO`

```json
{
  "id": "021e40fb-43b4-4437-9d0e-25b478cc320b",
  "brand": "Marca2",
  "model": "Modelo do Veículo",
  "year": "1991",
  "plate": "br5r984",
  "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
}
```

`PATCH /veiculos/:id(id do veiculo) - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "021e40fb-43b4-4437-9d0e-25b478cc320b",
    "brand": "Marca2",
    "model": "Modelo do Veículo",
    "year": "1991",
    "plate": "br5r984",
    "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
  }
]
```

`GET /veiculos/:id(id do veiculo) - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "021e40fb-43b4-4437-9d0e-25b478cc320b",
    "brand": "Marca2",
    "model": "Modelo do Veículo",
    "year": "1991",
    "plate": "br5r984",
    "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
  }
]
```

<li style='font-size: 20px'>Deletar  um veiculo :</li>

`DELETE /veiculos/:id(id do veiculo) - FORMATO DA RESPOSTA - STATUS 204`

```json

status 204

```

<li style='font-size: 20px'>Adicionando  um carro ao usuario :</li>

<br/>

`POST /users/:id(id do usuario)/veiculos/:id(id do veiculo) - FORMATO DA RESPOSTA`

```json
{
  "id": "a50b45fd-db81-4668-bc56-3165a0e94734",
  "name": "Matheus Silva",
  "email": "matheus@example.com",
  "phone": "(99) 9999-9999",
  "cpf": "12345678978",
  "veiculos": [
    {
      "id": "021e40fb-43b4-4437-9d0e-25b478cc320b",
      "brand": "Marca2",
      "model": "Modelo do Veículo",
      "year": "1991",
      "plate": "br5r984",
      "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
    }
  ]
}
```

REMOVER VEICULO EM PROGRESSO:

`DELETE /veiculos/:id(id do veiculo) - FORMATO DA RESPOSTA - STATUS 204`

```json

    status 204

```

<li style='font-size: 20px'>Criação de uma companhia:</li>

<br/>

`POST /Companies/:id(id do usuario) - FORMATO DA REQUISIÇÃO - STATUS 204`

```json
{
  "name": "Empresa 1",
  "email": "empresa@teste.com",
  "phone": "(99) 99999-9999",
  "cnpj": "12345678912345"
}
```

---

## <br/>

<br/>

`POST /Companies/:id(id do usuario) - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "name": "Empresa 1",
    "email": "empresa@teste.com",
    "phone": "(99) 99999-9999",
    "cnpj": "12345678912345",
    "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734",
    "id": "5f89c409-6d87-477e-b9c1-830e49d43114"
  }
]
```

## <br/>

<li style='font-size: 20px'>Editando a companhia:</li>

<br/>

`PATCH /companies/:id(id da companhia) - FORMATO DA REQUISIÇÃO - STATUS 200`"so deve ser preenchido o compo que sera editado"

```json
{
  "name": "Empresa 2"
}
```

`PATCH /companies/:id(id da companhia) - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "5f89c409-6d87-477e-b9c1-830e49d43114",
  "name": "Empresa 2",
  "email": "empresa@teste.com",
  "phone": "(99) 99999-9999",
  "cnpj": "12345678912345",
  "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
}
```

`DELETE /companies/:id(id da companhia) - FORMATO DA RESPOSTA - STATUS 204`

```json

status 204

```

<li style='font-size: 20px'>Adicionando um usuario a uma companhia:</li>

`POST /users/:id(id do usuario)/companies/:id(id da companhia) - FORMATO DA RESPOSTA - STATUS 204`

## <br/>

```json
{
  "id": "a50b45fd-db81-4668-bc56-3165a0e94734",
  "name": "Matheus Silva",
  "email": "matheus@example.com",
  "phone": "(99) 9999-9999",
  "cpf": "12345678978",
  "companies": {
    "id": "5f89c409-6d87-477e-b9c1-830e49d43114",
    "name": "Empresa 2",
    "email": "empresa@teste.com",
    "phone": "(99) 99999-9999",
    "cnpj": "12345678912345",
    "createdBy": "a50b45fd-db81-4668-bc56-3165a0e94734"
  }
}
```

REMOVER VEICULO EM PROGRESSO:

## <br/>

<li style='font-size: 20px'>Deletar de um companhias:</li>

<br/>

`DELETE /companies/:id(id da companhia) - FORMATO DA RESPOSTA - STATUS 204`

```json
 status 204
```
