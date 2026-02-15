# Configuração para GitHub Pages

Este guia explica como fazer o deploy do Moto Tracker PWA no GitHub Pages.

## Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js e pnpm instalados

## Passos para Deploy

### 1. Criar um repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nomeie como `moto-tracker-pwa`
4. Escolha "Public" para que o GitHub Pages funcione
5. Clique em "Create repository"

### 2. Configurar o projeto localmente

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/moto-tracker-pwa.git
cd moto-tracker-pwa

# Instalar dependências
pnpm install

# Compilar o projeto
pnpm build
```

### 3. Configurar o `vite.config.ts` para GitHub Pages

Se o seu repositório está em `https://github.com/seu-usuario/moto-tracker-pwa`, descomente a linha no `vite.config.ts`:

```typescript
base: '/moto-tracker-pwa/',
```

Se o repositório é uma página de usuário/organização (`seu-usuario.github.io`), use:

```typescript
base: '/',
```

### 4. Recompilar após alteração

```bash
pnpm build
```

### 5. Fazer push para GitHub

```bash
git add .
git commit -m "Initial commit: Moto Tracker PWA"
git push origin main
```

### 6. Ativar GitHub Pages

1. Vá para Settings do repositório
2. Navegue até "Pages" (esquerda)
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione `main` e `/root` (ou `/docs` se preferir)
5. Clique em "Save"

### 7. Aguardar o deploy

O GitHub Pages levará alguns minutos para fazer o deploy. Você verá uma mensagem verde quando estiver pronto.

Seu site estará disponível em:
- `https://seu-usuario.github.io/moto-tracker-pwa/` (para repositório normal)
- `https://seu-usuario.github.io/` (para página de usuário)

## Atualizações Futuras

Para fazer atualizações:

```bash
# Fazer alterações no código
# ...

# Recompilar
pnpm build

# Fazer commit e push
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O GitHub Pages fará o deploy automaticamente.

## Troubleshooting

### Página não aparece
- Aguarde alguns minutos após o push
- Verifique se a branch `main` está selecionada em Settings > Pages
- Certifique-se de que o `base` no `vite.config.ts` está correto

### Assets não carregam
- Verifique o console do navegador para erros de CORS
- Certifique-se de que o `base` está configurado corretamente

### Service Worker não funciona
- Service Workers funcionam apenas em HTTPS
- GitHub Pages fornece HTTPS automaticamente

## Estrutura do Build

O build gera:
- `dist/public/` - Arquivos estáticos prontos para deploy
- `index.html` - Página principal
- `manifest.json` - Configuração PWA
- `sw.js` - Service Worker
- Arquivos JavaScript e CSS otimizados

## Desenvolvimento Local

Para desenvolvimento:

```bash
pnpm dev
```

Acesse `http://localhost:3000`

## Notas Importantes

1. **Dados Locais**: Todos os dados são salvos no localStorage do navegador
2. **PWA Offline**: O aplicativo funciona offline após a primeira visita
3. **Sincronização**: Dados não são sincronizados entre dispositivos (salvos localmente)
4. **Backup**: Considere exportar seus dados periodicamente

## Suporte

Para problemas com GitHub Pages, consulte a [documentação oficial](https://docs.github.com/en/pages).
