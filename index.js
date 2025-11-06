// 1. Importar o Express (o "Flask" do Node)
const express = require('express');
const app = express();

// 2. Configurações Essenciais
// Isso "ensina" o Express a ler JSON do corpo das requisições
app.use(express.json()); 
// Isso "ensina" o Express a mostrar arquivos da pasta 'public'
app.use(express.static('public')); 

// 3. Nosso Endpoint da API
// Escuta por requisições POST em /validar-senha
app.post('/validar-senha', (req, res) => {

    // Pega a senha de dentro do body
    // Em JS, usamos: const { senha } = req.body;
    const { senha } = req.body;

    // Se a chave "senha" não existir
    if (senha === undefined) {
        return res.status(400).json({ 
            valida: false, 
            erros: ["A chave 'senha' não foi encontrada no JSON"] 
        });
    }

    // --- Lógica de Validação (com Regex) ---
    const erros = [];

    // Regra 1: Mínimo de 8 caracteres
    if (senha.length < 8) {
        erros.push("A senha precisa ter no mínimo 8 caracteres");
    }

    // Regra 2: Pelo menos 1 letra maiúscula (Regex: /[A-Z]/)
    // .test() é o "re.search()" do JavaScript
    if (!/[A-Z]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 letra maiúscula");
    }

    // Regra 3: Pelo menos 1 número (Regex: /[0-9]/)
    if (!/[0-9]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 número");
    }

    // Regra 4: Pelo menos 1 caractere especial
    if (!/[!@#$%^&*]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 caractere especial (ex: !@#$%^&*)");
    }

    // --- Resposta ---
    if (erros.length > 0) {
        // Retorna 400 (Bad Request) com a lista de erros
        return res.status(400).json({ "valida": false, "erros": erros });
    } else {
        // Retorna 200 (OK) com sucesso
        return res.json({ "valida": true });
    }
});

// 4. Ligar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});