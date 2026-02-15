# Brainstorm de Design - Moto Tracker PWA

## Ideia 1: Minimalismo Técnico com Foco em Dados
**Movimento de Design:** Brutalism Digital + Data Visualization
**Probabilidade:** 0.08

### Princípios Fundamentais
- Clareza absoluta: cada elemento serve um propósito de informação
- Hierarquia tipográfica agressiva: títulos em sans-serif bold, dados em monospace
- Rejeição de ornamentação: apenas o essencial para comunicar
- Estrutura em grid rígido com alinhamento preciso

### Filosofia de Cores
Paleta monocromática com acentos de cor funcional. Fundo cinza neutro (não branco), texto em preto profundo. Vermelho para alertas (troca de óleo próxima), verde para status positivo (tanque cheio), âmbar para avisos. Sem gradientes, apenas cores sólidas.

### Paradigma de Layout
Cards empilhados verticalmente com bordas visíveis. Cada card representa uma métrica ou ação. Sidebar esquerda com navegação fixa. Dashboard principal com tabelas de dados e gráficos de linha simples. Nenhuma animação desnecessária.

### Elementos Assinatura
1. Indicadores circulares com percentual (combustível, óleo)
2. Timeline vertical de eventos (abastecimentos e trocas de óleo)
3. Badges de status com ícones geométricos

### Filosofia de Interação
Cliques diretos, sem hover states elaborados. Formulários inline com validação imediata. Confirmações explícitas para ações críticas.

### Animação
Transições lineares de 200ms. Nenhuma animação de entrada. Indicadores de carregamento simples (spinner).

### Sistema Tipográfico
- Display: IBM Plex Sans Bold (títulos de seção)
- Body: IBM Plex Sans Regular (conteúdo)
- Data: IBM Plex Mono (valores numéricos e métricas)

---

## Ideia 2: Design Automotivo Moderno
**Movimento de Design:** Automotive UI + Skeuomorphism Contemporâneo
**Probabilidade:** 0.07

### Princípios Fundamentais
- Inspiração em dashboards de carros modernos
- Formas arredondadas que evocam velocidade e movimento
- Uso de gradientes sutis para profundidade
- Elementos visuais que remetem a instrumentos de painel

### Filosofia de Cores
Paleta escura (fundo cinza escuro quase preto) com acentos laranja/vermelho (cor de alerta de carros). Branco para texto principal. Gradientes suaves de laranja para indicadores. Efeito de vidro fosco em cards.

### Paradigma de Layout
Cards circulares e arredondados flutuando em espaço escuro. Indicadores de combustível e óleo como "medidores" estilo painel. Gráficos com estilo de LED. Layout assimétrico com elementos em diferentes tamanhos.

### Elementos Assinatura
1. Medidores circulares estilo painel de carro (agulha animada)
2. Cards com bordas arredondadas e sombra profunda
3. Ícones de moto estilizados

### Filosofia de Interação
Hover states com brilho/glow. Cliques revelam detalhes em modal. Swipe para navegação em mobile.

### Animação
Transições suaves de 300ms. Agulhas de medidores animadas ao carregar dados. Entrada de cards com fade-in + slide.

### Sistema Tipográfico
- Display: Poppins Bold (títulos)
- Body: Poppins Regular (conteúdo)
- Data: Courier Prime (valores)

---

## Ideia 3: Modernismo Limpo com Acento Dinâmico
**Movimento de Design:** Swiss Style + Glassmorphism
**Probabilidade:** 0.09

### Princípios Fundamentais
- Tipografia como elemento visual principal
- Espaçamento generoso e intencional
- Fundo com padrão sutil (grid ou textura)
- Transparência e camadas para criar profundidade

### Filosofia de Cores
Fundo branco com padrão de grid muito sutil. Cores primárias: azul profundo para ações, teal para sucesso, âmbar para avisos. Cards com fundo semi-transparente (vidro fosco). Texto em cinza escuro.

### Paradigma de Layout
Grid de 2-3 colunas em desktop. Cards com bordas translúcidas. Espaçamento vertical generoso entre seções. Tipografia grande e respeitosa. Nenhum elemento centralizado - layout assimétrico com alinhamento à esquerda.

### Elementos Assinatura
1. Cards com efeito glassmorphism (backdrop-filter blur)
2. Números grandes e tipografia bold para métricas
3. Ícones minimalistas em linha única

### Filosofia de Interação
Hover states com mudança de backdrop blur. Cliques suaves com feedback visual. Transições entre estados são fluidas.

### Animação
Transições de 250ms com easing suave. Entrada de elementos com fade + scale leve. Pulso sutil em números que mudam.

### Sistema Tipográfico
- Display: Playfair Display Bold (títulos principais)
- Body: Lato Regular (conteúdo)
- Data: JetBrains Mono (valores numéricos)

---

## Decisão Final
**Escolhido: Ideia 3 - Modernismo Limpo com Acento Dinâmico**

Esta abordagem oferece:
- ✅ Elegância profissional sem parecer corporativo
- ✅ Foco nos dados com design respirável
- ✅ Responsividade natural em mobile
- ✅ Diferenciação visual clara (não é "mais um dashboard")
- ✅ Glassmorphism é tendência moderna e funcional
- ✅ Tipografia Playfair Display traz sofisticação
- ✅ Fácil de estender com novos recursos
