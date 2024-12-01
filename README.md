# React Native - Consumo de API com Hardware (Geolocalização)

Este é um projeto desenvolvido em React Native com Expo, que consome uma API desenvolvida com Express ePrisma. O aplicativo utiliza recursos de hardware como geolocalização para capturar dados de localização do usuário em tempo real e exibir informações na tela.

## Funcionalidades

- **Cadastro de usuário**: O app permite que os usuários se cadastrem com nome, e-mail e endereço.
- **Geolocalização**: O aplicativo captura a localização atual do usuário, incluindo o país e o estado.
- **Consumo de API**: O app consome uma API que armazena e recupera os dados dos usuários em um banco de dados MongoDB usando Prisma.

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **Express.js** para a API
- **Prisma** como ORM para MongoDB
- **Axios** para comunicação com a API
- **Geolocalização** para obter a localização do usuário

## Como Rodar o Projeto

# 1. Clonar o repositório
git clone https://github.com/FlaviaPaloma/React-Native-Hardware-Consumo-de-API.git

# 2. Navegar até o diretório da API
cd localizador

# 3. Instalar as dependências da API
npm install

# 4. Rodar a API
npm start

# 5. Abrir outro terminal e navegar até o diretório do app React Native
cd caminho/para/o/seu/projeto

# 6. Instalar as dependências do app
npm install

# 7. Instalar o Expo CLI globalmente (caso ainda não tenha)
npm install -g expo-cli

# 8. Rodar o app com Expo
npx expo start

