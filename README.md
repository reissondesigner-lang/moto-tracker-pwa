# 🏍 Moto Tracker PWA

Um aplicativo PWA moderno para rastreamento completo da sua moto. Controle abastecimentos, trocas de óleo, consumo de combustível e estatísticas de uso.

## ✨ Funcionalidades

### 📊 Dashboard Principal
- **KM Atual**: Atualize o quilômetro atual da moto
- **Combustível Estimado**: Calcula automaticamente o nível de combustível baseado nos abastecimentos
- **Consumo Médio**: Calcula L/100km baseado em abastecimentos com tanque cheio
- **Próxima Troca de Óleo**: Mostra quantos km faltam para a próxima manutenção
- **KM/Mês**: Calcula a média de quilômetros rodados por mês

### ⛽ Rastreamento de Abastecimento
- Registre cada abastecimento com:
  - KM atual
  - Quantidade de litros
  - Valor gasto
  - Indicador de tanque cheio (para cálculo de consumo)
- Histórico completo de abastecimentos
- Cálculo automático de consumo médio

### 🔧 Rastreamento de Troca de Óleo
- Registre trocas de óleo com KM
- Configure intervalo de troca (padrão: 5000 km)
- Acompanhe quantos km faltam para a próxima troca
- Histórico de todas as trocas realizadas

### 📈 Estatísticas Detalhadas
- Total de abastecimentos
- Total de litros consumidos
- Total gasto em combustível
- Número de trocas de óleo
- Média de consumo (L/100km)
- Quilômetros por mês

### 📱 PWA (Progressive Web App)
- Funciona offline após primeira visita
- Instalável como aplicativo no celular/tablet
- Sincronização de dados em tempo real
- Interface responsiva para todos os dispositivos

### 💾 Armazenamento Local
- Todos os dados salvos no localStorage
- Sem necessidade de servidor ou conexão com internet
- Dados persistem entre sessões

## 🚀 Como Usar

### Instalação Local

```bash
# Clonar ou extrair o projeto
cd moto-tracker-pwa

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

### Instalação como PWA

#### No Celular/Tablet
1. Abra o aplicativo no navegador
2. Toque no menu (⋮) ou procure por "Instalar"
3. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"
4. O aplicativo será instalado como um app nativo

#### No Desktop
1. Abra o aplicativo no navegador
2. Clique no ícone de instalação na barra de endereço
3. Confirme a instalação

### Usando o Aplicativo

#### 1. Configurar KM Inicial
- Insira o quilômetro atual da sua moto na seção "KM Atual"
- Clique em "Atualizar"

#### 2. Registrar Abastecimentos
- Clique em "Registrar Abastecimento"
- Preencha:
  - **KM**: Quilômetro do abastecimento
  - **Litros**: Quantidade abastecida
  - **Valor**: Quanto gastou
  - **Tanque Cheio**: Marque se abasteceu com tanque cheio (importante para cálculo de consumo)
- Clique em "Registrar"

#### 3. Registrar Troca de Óleo
- Clique em "Registrar Troca de Óleo"
- Preencha:
  - **KM da Troca**: Quilômetro em que fez a troca
  - **Intervalo de Troca**: Quantos km até a próxima (padrão 5000)
- Clique em "Registrar"

#### 4. Acompanhar Estatísticas
- O dashboard atualiza automaticamente com:
  - Nível de combustível estimado
  - Consumo médio
  - KM até próxima troca de óleo
  - Média de km por mês

## 📋 Requisitos

- Node.js 18+
- pnpm 8+ (ou npm/yarn)
- Navegador moderno com suporte a PWA

## 🛠️ Tecnologias

- **React 19**: Framework UI
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Estilização
- **shadcn/ui**: Componentes UI
- **Wouter**: Roteamento
- **Vite**: Build tool
- **Service Worker**: Funcionalidade offline

## 📦 Build

```bash
# Compilar para produção
pnpm build

# Visualizar build localmente
pnpm preview
```

Os arquivos compilados estarão em `dist/public/`.

## 🌐 Deploy no GitHub Pages

Veja [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) para instruções detalhadas.

Resumo rápido:
1. Crie um repositório no GitHub
2. Configure o `vite.config.ts` com o `base` correto
3. Execute `pnpm build`
4. Faça push para GitHub
5. Ative GitHub Pages nas configurações do repositório

## 💡 Dicas de Uso

### Cálculo de Consumo
O consumo é calculado apenas entre abastecimentos com tanque cheio. Por isso:
- Sempre marque "Tanque Cheio" quando abastecer com tanque vazio
- Isso garante cálculos precisos de consumo

### Manutenção de Dados
- Os dados são salvos automaticamente
- Faça backup periodicamente (copie os dados do localStorage)
- Não limpe dados do navegador para não perder histórico

### Offline
- Após primeira visita, o app funciona completamente offline
- Dados são sincronizados quando conectar novamente

## 🐛 Troubleshooting

### Dados não aparecem
- Verifique se o localStorage está habilitado no navegador
- Tente limpar cache e recarregar a página

### PWA não instala
- Certifique-se de estar em HTTPS (GitHub Pages fornece)
- Tente em outro navegador (Chrome/Edge funcionam melhor)

### Consumo não calcula
- Verifique se marcou "Tanque Cheio" em algum abastecimento
- O consumo precisa de pelo menos 2 abastecimentos com tanque cheio

## 📄 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a seção Troubleshooting
2. Consulte a documentação do GitHub Pages
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para motociclistas**

Mantenha sua moto em perfeito estado com Moto Tracker PWA! 🏍
