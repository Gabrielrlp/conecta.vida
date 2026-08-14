/**
 * data.js — Camada de dados do Conecta Vida.
 *
 * Isso funciona como um "banco de dados" local: main.js lê esses objetos
 * e monta o HTML dinamicamente, em vez de tudo vir fixo no index.html.
 * Pra atualizar qualquer texto/número do site, basta editar aqui.
 *
 * Quando quiser dados vindos de verdade (não fixos no arquivo), é só trocar
 * a leitura direta de SITE_DATA por um fetch('algum-endpoint.json') —
 * a estrutura de main.js já está pronta pra isso.
 */

/**
 * Configurações do site. Troque o número do WhatsApp abaixo pelo
 * número real da Conecta Vida antes de publicar (só dígitos, com
 * código do país + DDD, ex: 55 11 99999-9999 vira '5511999999999').
 */
const SITE_CONFIG = {
  whatsappNumber: "5534988371140", // TODO: colocar o número real aqui
};

const SITE_DATA = {
  trustBar: [
    { value: "+12M", label: "adolescentes no Brasil" },
    { value: "78%", label: "reduziram o tempo de tela" },
    { value: "3", label: "turmas testadas no piloto" },
    { value: "65%", label: "mais engajamento na 2ª semana" },
  ],

  problemStats: [
    {
      value: 9,
      suffix: "+",
      unit: "h/dia",
      label: "tempo médio de tela entre adolescentes",
    },
    { value: 70, suffix: "%", label: "relatam dificuldade de concentração" },
    { value: 60, suffix: "%", label: "relatam problemas de sono" },
    { value: 45, suffix: "%", label: "praticam menos atividade física" },
  ],

  pillars: [
    {
      title: "Desafios sem Telas",
      desc: "Missões diárias e semanais que tiram o adolescente da tela: ler, praticar esporte, encontrar os amigos pessoalmente.",
    },
    {
      title: "Metas Conscientes",
      desc: "A plataforma define metas de uso do celular sob medida, acompanha o progresso e avisa antes de estourar o limite.",
    },
    {
      title: "Recompensas Reais",
      desc: "Cada meta cumprida vira pontos — e pontos viram descontos de verdade em cultura, esporte e experiências com a família.",
    },
    {
      title: "Acompanhamento Compartilhado",
      desc: "Pais e educadores acompanham o progresso em um painel simples e resumido — apoio de verdade, sem vigiar cada passo do adolescente.",
    },
  ],

  features: [
    {
      title: "Recompensas",
      desc: "Troque pontos por prêmios, descontos e experiências reais com amigos e família.",
      icon: "gift",
    },
    {
      title: "Gamificação",
      desc: "Missões diárias, rankings e conquistas tornam reduzir o tempo de tela divertido, não uma imposição.",
      icon: "controller",
    },
    {
      title: "Comunidade",
      desc: "Grupos de desafio conectam quem está no mesmo processo — compartilhando conquistas, não seguidores.",
      icon: "people",
    },
    {
      title: "Progresso",
      desc: "Relatórios semanais mostram a evolução: menos tela, mais sono, mais gente de verdade por perto.",
      icon: "chart",
    },
  ],

  resultStats: [
    { value: 78, suffix: "%", label: "reduziram o tempo de tela em 30%" },
    { value: 65, suffix: "%", label: "de aumento no engajamento (2ª semana)" },
    { value: 73, suffix: "%", label: "relataram melhora na qualidade do sono" },
    {
      value: 65,
      suffix: "%",
      label: "aumentaram a prática de atividade física",
    },
  ],

  testimonials: [
    {
      quote:
        "O Conecta Vida me ajudou a perceber quanto tempo eu perdia no celular. Os desafios são divertidos e me motivaram a sair mais de casa e me concentrar nos estudos.",
      name: "Estudante",
      role: "16 anos",
    },
    {
      quote:
        "Notei uma melhora significativa na atenção dos alunos em sala de aula depois que adotamos os desafios do Conecta Vida. A ferramenta é inovadora e muito bem recebida pela turma.",
      name: "Professora",
      role: "Ensino Médio",
    },
  ],

  comparison: {
    them: [
      "Só bloqueiam ou restringem o uso",
      "Sem comunidade ou grupo de apoio",
      "Sem desafios ou missões",
      "Sem recompensa real",
    ],
    us: [
      "Desafios gamificados no dia a dia",
      "Comunidade de adolescentes se apoiando",
      "Metas conscientes, não bloqueio forçado",
      "Recompensas reais por hábito saudável",
    ],
  },

  plans: [
    {
      name: "Escola",
      price: "R$299,90",
      period: "/mês",
      desc: "Pra turmas inteiras, com acompanhamento pedagógico.",
      features: [
        "Turmas e desafios em grupo",
        "Relatórios pedagógicos de engajamento",
        "Suporte à equipe escolar",
      ],
      cta: "Solicitar demonstração",
      highlight: false,
    },
    {
      name: "Família",
      price: "R$19,90",
      period: "/mês",
      desc: "Metas personalizadas pra cada pessoa da casa.",
      features: [
        "Metas de uso por perfil",
        "Acompanhamento dos responsáveis",
        "Recompensas em família",
      ],
      cta: "Assinar plano família",
      highlight: true,
    },
  ],
};