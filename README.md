# Batch Maker - Extensão do Chrome

Extensão do Chrome para dividir grandes pagamentos PIX em lotes compatíveis com as regulamentações dos bancos brasileiros.

## 📱 Funcionalidades

- **Interface moderna** com tema escuro profissional
- **Formatação brasileira** de números (X.XXX,XX)
- **Resumo completo** da operação antes do download
- **Popup personalizado** de confirmação
- **Animações suaves** e micro-interações
- **3 destinatários pré-configurados** (Brasil Bitcoin, Caldeira, Securitas)

## 🚀 Instalação

1. Abra o Chrome e vá para `chrome://extensions/`
2. Ative o "Modo do desenvolvedor" (toggle no canto superior direito)
3. Clique em "Carregar sem compactação"
4. Selecione a pasta `batch-maker`
5. A extensão aparecerá na barra de ferramentas do seu navegador

## 📖 Como Usar

1. **Clique no ícone** do Batch Maker na barra de ferramentas do Chrome
2. **Selecione o destinatário** no dropdown (Brasil Bitcoin, Caldeira ou Securitas)
3. **Digite o valor total** a enviar (mínimo R$ 15.000,00)
4. **A chave PIX** é preenchida automaticamente (clique em "Editar" para modificar se necessário)
5. **Clique em "Gerar CSV"** para baixar o arquivo de lote

## ⚙️ Como Funciona

### Lógica de Divisão
- Inicia com pagamentos de **R$ 14.999,00**
- Cada transação subsequente **diminui R$ 1,00** (14.998, 14.997, etc.)
- Continua até que o valor total seja alcançado
- **Nunca repete valores**, conforme exigido pelo Banco Central

### Formato do CSV
- **Razão Social**, **CNPJ**, **Chave PIX**, **Valor**
- Valores formatados com vírgula para decimais (ex: 14999,00)
- Campos entre aspas para escape adequado
- **Sem cabeçalhos** (conforme exigido pelos bancos)

### Exemplo de Saída
```csv
"BRASIL BITCOIN SERVICOS DIGITAIS LTDA","29.519.837/0001-23","66499dab-b165-4096-aaf8-18935d6167bc","14999,00"
"BRASIL BITCOIN SERVICOS DIGITAIS LTDA","29.519.837/0001-23","66499dab-b165-4096-aaf8-18935d6167bc","14998,00"
"BRASIL BITCOIN SERVICOS DIGITAIS LTDA","29.519.837/0001-23","66499dab-b165-4096-aaf8-18935d6167bc","14997,00"
```

## 🏦 Destinatários Pré-configurados

### 1. Brasil Bitcoin (Exchange)
- **Razão Social:** BRASIL BITCOIN SERVICOS DIGITAIS LTDA
- **CNPJ:** 29.519.837/0001-23
- **Chave PIX:** 66499dab-b165-4096-aaf8-18935d6167bc

### 2. Caldeira (Exchange)
- **Razão Social:** CB TECNOLOGIA E INTERMEDIACAO LTDA
- **CNPJ:** 31.432.059/0001-82
- **Chave PIX:** e12e73a0-d47b-4674-a3c9-8accec5c4f27

### 3. Securitas (Conta Bancária)
- **Razão Social:** SECURITAS DIGITAL ASSETS LTDA
- **CNPJ:** 55.200.012/0001-51
- **Chave PIX:** d9260002-6da3-47d8-959e-86a136e7a8ca

## 🎨 Interface

### Tema Escuro Moderno
- **Fundo:** #121212 (preto profundo)
- **Cartões:** #1E1E1E (carvão escuro)
- **Texto Principal:** #E0E0E0 (cinza claro)
- **Texto Secundário:** #A0A0A0 (cinza médio)
- **Acentos:** Gradientes roxo (#BB86FC) e teal (#03DAC6)

### Animações
- **Entrada suave** dos elementos
- **Efeitos de hover** nos botões
- **Transições fluidas** nos campos de entrada
- **Popup animado** de confirmação

## 📁 Estrutura de Arquivos

- `manifest.json` - Configuração da extensão
- `popup.html` - Interface do usuário
- `popup.js` - Lógica de pagamentos e geração de CSV
- `popup.css` - Estilização e animações
- `icon.svg` - Ícone da extensão

## 📋 Conformidade Regulatória

Esta extensão foi desenvolvida para atender às regulamentações do **Banco Central do Brasil**:

- **Limite máximo** de R$ 15.000,00 por transação PIX
- **Valores únicos** em cada transação (não repetição)
- **Formato CSV** compatível com sistemas bancários
- **Documentação completa** para auditoria

## 🔒 Segurança

- **Não armazena dados** pessoais ou financeiros
- **Processamento local** - nenhuma informação é enviada para servidores externos
- **Código aberto** - totalmente auditável
- **Sem permissões sensíveis** - apenas download de arquivos

## 📞 Suporte

Para reportar problemas ou sugerir melhorias, abra uma issue no [repositório do GitHub](https://github.com/felipeldfonseca/batch-maker).

---

**Desenvolvido para instituições financeiras brasileiras** 🇧🇷

*Esta ferramenta facilita a conformidade com as regulamentações do Banco Central do Brasil para pagamentos PIX em lote.*