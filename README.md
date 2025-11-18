📺 Projeto de Streaming
📝 Descrição

Este projeto será um sistema de streaming desenvolvido em C#.
O objetivo é permitir a reprodução de vídeos em tempo real e, futuramente, incluir funcionalidades como autenticação e playlists.

🚀 Tecnologias

Linguagem: C#

Framework: .NET (a definir versão)

Banco de dados: Docker e Prisma para criação e manipulação

📦 Instalação (futuro)


    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
        # ESTA LINHA ABAIXO RESOLVE O ERRO:
        cache-dependency-path: BackEnd/package-lock.json

    - name: Install dependencies
      run: npm install

    - name: Run ESLint
      run: npx eslint .

▶️ Uso (futuro)

Conta de teste:
henrique
henrique@gmail.com
123

✅ Roadmap

 Configuração inicial do projeto em C#

 Estrutura do backend

 Autenticação de usuários

 Reprodução de vídeos

📄 Licença

MIT