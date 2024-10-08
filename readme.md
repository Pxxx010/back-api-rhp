# Endpoints da API do Hospital

## 1. Pacientes
### Criar um novo paciente
**POST** /pacientes
Request Body:
```json
{
  "nome_paciente": "João da Silva",
  "data_nascimento": "1980-01-01",
  "nome_mae": "Maria da Silva",
  "nome_pai": "José da Silva",
  "cpf": "123.456.789-00"
}
```

### Listar todos os pacientes
**GET** /pacientes

### Buscar um paciente por prontuário
**GET** /pacientes/:cod_prontuario

### Atualizar um paciente
**PUT** /pacientes/:cod_prontuario
Request Body:
```json
{
  "nome_paciente": "Novo Nome",
  "data_nascimento": "1980-01-01",
  "nome_mae": "Novo Nome Mãe",
  "nome_pai": "Novo Nome Pai"
}
```

### Deletar um paciente
**DELETE** /pacientes/:cod_prontuario


## 2. Atendimentos
### Criar um novo atendimento
**POST** /atendimentos
Request Body:
```json
{
  "cod_prontuario": 1,
  "data_atendimento": "2024-10-08",
  "hora_atendimento": "14:30",
  "cod_convenio": 1,
  "cod_plano": 1,
  "cod_origem_atendimento": 1,
  "cod_prestador": 1,
  "tipo_atendimento": "URGENCIA",
  "cod_leito": 1,
  "cod_unidade_interna": 1
}
```

### Listar todos os atendimentos
**GET** /atendimentos

### Buscar um atendimento por código
**GET** /atendimentos/:cod_atendimento

### Atualizar um atendimento
**PUT** /atendimentos/:cod_atendimento
Request Body:
```json
{
  "data_atendimento": "2024-10-09",
  "hora_atendimento": "15:00",
  "cod_convenio": 2,
  "cod_plano": 2,
  "cod_origem_atendimento": 2,
  "cod_prestador": 2,
  "tipo_atendimento": "INTERNAÇÃO"
}
```

### Deletar um atendimento
**DELETE** /atendimentos/:cod_atendimento


## 3. Transferências
### Criar uma nova transferência
**POST** /transferencias
Request Body:
```json
{
  "cod_atendimento": 1,
  "cod_leito_atual": 1,
  "cod_unidade_atual": 1,
  "cod_leito_destino": 2,
  "cod_unidade_destino": 2,
  "data_transferencia": "2024-10-08",
  "hora_transferencia": "15:30"
}
```

### Listar todas as transferências
**GET** /transferencias

### Buscar uma transferência por ID
**GET** /transferencias/:id

### Deletar uma transferência
**DELETE** /transferencias/:id


## 4. Altas
### Criar uma nova alta
**POST** /altas
Request Body:
```json
{
  "cod_atendimento": 1,
  "data_alta": "2024-10-08",
  "hora_alta": "16:00",
  "motivo_alta": "Recuperação completa"
}
```

### Listar todas as altas
**GET** /altas

### Buscar uma alta por ID
**GET** /altas/:id

### Deletar uma alta
**DELETE** /altas/:id


## 5. Convênios
### Criar um novo convênio
**POST** /convenios
Request Body:
```json
{
  "nome_convenio": "Convênio A"
}
```

### Listar todos os convênios
**GET** /convenios

### Buscar um convênio por código
**GET** /convenios/:cod_convenio

### Atualizar um convênio
**PUT** /convenios/:cod_convenio
Request Body:
```json
{
  "nome_convenio": "Novo Convênio A"
}
```

### Deletar um convênio
**DELETE** /convenios/:cod_convenio


## 6. Planos
### Criar um novo plano
**POST** /planos
Request Body:
```json
{
  "nome_plano": "Plano A",
  "cod_convenio": 1
}
```

### Listar todos os planos
**GET** /planos

### Buscar um plano por código
**GET** /planos/:cod_plano

### Atualizar um plano
**PUT** /planos/:cod_plano
Request Body:
```json
{
  "nome_plano": "Novo Plano A"
}
```

### Deletar um plano
**DELETE** /planos/:cod_plano


## 7. Prestadores
### Criar um novo prestador
**POST** /prestadores
Request Body:
```json
{
  "nome_prestador": "Dr. João"
}
```

### Listar todos os prestadores
**GET** /prestadores

### Buscar um prestador por código
**GET** /prestadores/:cod_prestador

### Atualizar um prestador
**PUT** /prestadores/:cod_prestador
Request Body:
```json
{
  "nome_prestador": "Dr. José"
}
```

### Deletar um prestador
**DELETE** /prestadores/:cod_prestador


## 8. Leitos
### Criar um novo leito
**POST** /leitos
Request Body:
```json
{
  "numero_leito": "101",
  "cod_unidade": 1
}
```

### Listar todos os leitos
**GET** /leitos

### Buscar um leito por código
**GET** /leitos/:cod_leito

### Atualizar um leito
**PUT** /leitos/:cod_leito
Request Body:
```json
{
  "numero_leito": "102"
}
```

### Deletar um leito
**DELETE** /leitos/:cod_leito


## 9. Unidades de Internação
### Criar uma nova unidade de internação
**POST** /unidades_internacao
Request Body:
```json
{
  "nome_unidade": "Unidade A"
}
```

### Listar todas as unidades de internação
**GET** /unidades_internacao

### Buscar uma unidade de internação por código
**GET** /unidades_internacao/:cod_unidade

### Atualizar uma unidade de internação
**PUT** /unidades_internacao/:cod_unidade
Request Body:
```json
{
  "nome_unidade": "Nova Unidade A"
}
```

### Deletar uma unidade de internação
**DELETE** /unidades_internacao/:cod_unidade
