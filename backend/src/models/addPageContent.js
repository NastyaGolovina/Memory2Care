// // seed-homepage.js
// const API_URL = "http://localhost:3000/api/page/create";
//
// const content = [
//     // ── EN ──────────────────────────────────────────────────
//     {
//         element_id: "homepage_title",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_subtitle",
//         text: "Prospective Memory Rehabilitation for Cancer Survivors",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_checklist_title",
//         text: "Do you remember to...",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_check_1",
//         text: "take your medication on time?",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_check_2",
//         text: "attend your follow-up appointments?",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_check_3",
//         text: "complete important daily tasks?",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_description",
//         text: "Memory2Care is an innovative project aiming to develop and provide a digital intervention to support breast cancer survivors experiencing prospective memory difficulties. Through cognitive training, compensatory strategies, psychoeducation, and augmented reality, the application will help users remember, plan, and carry out important everyday tasks. By doing so, it aims to promote better treatment adherence, greater independence, well-being, and quality of life.",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_btn_participate",
//         text: "I Want to Participate",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "homepage_btn_learn",
//         text: "Learn More About the Project",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     // Footer
//     {
//         element_id: "footer_project_title",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_project_description",
//         text: "Memory2Care is a research project aimed at developing an innovative digital intervention to address prospective memory difficulties in the context of cancer.",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_contact_title",
//         text: "Contact Information",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_contact_university",
//         text: "Portucalense University",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_contact_address",
//         text: "Rua Dr. António Bernardino de Almeida, 541",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_contact_city",
//         text: "4200-072 Porto, Portugal",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_contact_email",
//         text: "memory2care@upt.pt",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_links_title",
//         text: "Useful Links",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_funding_label",
//         text: "Project funded by:",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_funding_name",
//         text: "Gilead GÉNESE Programme – 11th Edition",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_promoter_title",
//         text: "Promoter",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_funding_title",
//         text: "Funding",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//     {
//         element_id: "footer_copyright",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "EN"
//     },
//
//     // ── PT ──────────────────────────────────────────────────
//     {
//         element_id: "homepage_title",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_subtitle",
//         text: "Reabilitação da Memória Prospetiva para Sobreviventes de Cancro",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_checklist_title",
//         text: "Você se lembra de...",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_check_1",
//         text: "tomar a sua medicação a tempo?",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_check_2",
//         text: "comparecer às consultas de acompanhamento?",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_check_3",
//         text: "completar tarefas diárias importantes?",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_description",
//         text: "O Memory2Care é um projeto inovador que visa desenvolver e disponibilizar uma intervenção digital para apoiar sobreviventes de cancro da mama com dificuldades de memória prospetiva. Através de treino cognitivo, estratégias compensatórias, psicoeducação e realidade aumentada, a aplicação ajudará os utilizadores a recordar, planear e executar tarefas quotidianas importantes. Com isto, pretende promover uma melhor adesão ao tratamento, maior independência, bem-estar e qualidade de vida.",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_btn_participate",
//         text: "Quero Participar",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "homepage_btn_learn",
//         text: "Saiba Mais Sobre o Projeto",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     // Footer PT
//     {
//         element_id: "footer_project_title",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_project_description",
//         text: "O Memory2Care é um projeto de investigação que visa desenvolver uma intervenção digital inovadora para abordar as dificuldades de memória prospetiva no contexto do cancro.",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_contact_title",
//         text: "Informações de Contacto",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_contact_university",
//         text: "Universidade Portucalense",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_contact_address",
//         text: "Rua Dr. António Bernardino de Almeida, 541",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_contact_city",
//         text: "4200-072 Porto, Portugal",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_contact_email",
//         text: "memory2care@upt.pt",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_links_title",
//         text: "Links Úteis",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_funding_label",
//         text: "Projeto financiado por:",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_funding_name",
//         text: "Programa Gilead GÉNESE – 11.ª Edição",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_promoter_title",
//         text: "Promotor",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_funding_title",
//         text: "Financiamento",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
//     {
//         element_id: "footer_copyright",
//         text: "Memory2Care",
//         page_type: "MAIN_PAGE",
//         language: "PT"
//     },
// ];
//
// async function seed() {
//     let ok = 0, skipped = 0, failed = 0;
//
//     for (const item of content) {
//         try {
//             const res = await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(item),
//             });
//             const json = await res.json();
//
//             if (res.ok) {
//                 console.log(`✅ [${item.language}] ${item.element_id}`);
//                 ok++;
//             } else {
//                 console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`);
//                 skipped++;
//             }
//         } catch (e) {
//             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`);
//             failed++;
//         }
//     }
//
//     console.log(`\n ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// }
//
// seed();

// seed-about.js
const API_URL = "http://localhost:3000/api/page/create";

const content = [
    // ── EN ──────────────────────────────────────────────────
    {
        element_id: "about_prospective_title",
        text: "What is prospective memory?",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_prospective_text",
        text: "Prospective memory is the ability to remember to carry out an intended action at a specific moment in the future. It plays an important role in many everyday activities, such as taking medication on time, attending medical appointments, passing on important information, or completing a planned task.\nFollowing a breast cancer diagnosis and treatment, some individuals may experience difficulties with prospective memory. These challenges can affect health management, daily routines, work-related activities, and overall quality of life.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_why_title",
        text: "Why Memory2Care?",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_why_text",
        text: "Scientific and technological advances have contributed to earlier diagnosis and increasingly effective breast cancer treatments. As a result, improving quality of life after cancer has become an important priority, particularly considering the side effects of treatments that may persist in the short and long term.\nMemory2Care was developed in response to the cognitive difficulties frequently reported by individuals following breast cancer diagnosis and treatment. Although cognitive rehabilitation programmes exist to support difficulties related to attention, memory, and executive functioning, few interventions specifically address prospective memory and its application in everyday life.\nThe project aims to address this gap through the development of an innovative, accessible, and user-centred digital solution tailored to the needs of breast cancer survivors.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stages_title",
        text: "Project Objectives and Stages",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stages_intro",
        text: "The Memory2Care project will be developed in several stages, from the design of the intervention to the evaluation of its usability and effectiveness. Each stage contributes to ensuring that the final solution is evidence-based, easy to use, and adapted to the real needs of people living with and beyond cancer.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage1_title",
        text: "Stage 1 — Defining Content and Features",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage1_text",
        text: "In this first stage, input will be gathered from national and international experts in psycho-oncology, neuropsychology, cognition, prospective memory, and digital health. The goal is to identify the most appropriate content, strategies, and features to be included in the intervention.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage2_title",
        text: "Stage 2 — Development of the Memory2Care Apps",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage2_text",
        text: "Based on the recommendations gathered during Stage 1, a smartphone application will be developed to deliver the intervention. The app will include information about breast cancer and its potential impact on cognitive functioning, cognitive training exercises designed to be integrated into daily routines, compensatory strategies, and tools to support prospective memory.\nIn addition, augmented reality features will be developed to support the completion of everyday tasks in real-world contexts.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage3_title",
        text: "Stage 3 — Usability and Acceptability Testing",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage3_text",
        text: "In this stage, participants will be invited to try the application and share their experiences. The aim is to assess whether the app is easy to use, intuitive, useful, and appropriate for the needs of its users.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage4_title",
        text: "Stage 4 — Pilot Intervention Study",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "about_stage4_text",
        text: "Following refinements based on the previous stage, a pilot study will be conducted to explore the effects of the intervention. Participants may be allocated to one of three conditions: an app with augmented reality features, an app without augmented reality features, or a wait-list comparison group, which will also receive access to the intervention after the study is completed.\nThe aim is to evaluate whether the intervention can improve prospective memory and other cognitive functions that are essential for daily life and, consequently, promote better treatment adherence and quality of life.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },

    // ── PT ──────────────────────────────────────────────────
    {
        element_id: "about_prospective_title",
        text: "O que é a memória prospetiva?",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_prospective_text",
        text: "A memória prospetiva é a capacidade de se lembrar de realizar uma ação pretendida num momento específico no futuro. Desempenha um papel importante em muitas atividades do quotidiano, como tomar a medicação a tempo, comparecer a consultas médicas, transmitir informações importantes ou completar uma tarefa planeada.\nApós o diagnóstico e tratamento de cancro da mama, algumas pessoas podem experienciar dificuldades de memória prospetiva. Estes desafios podem afetar a gestão da saúde, as rotinas diárias, as atividades profissionais e a qualidade de vida em geral.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_why_title",
        text: "Porquê o Memory2Care?",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_why_text",
        text: "Os avanços científicos e tecnológicos têm contribuído para um diagnóstico mais precoce e tratamentos cada vez mais eficazes do cancro da mama. Como resultado, melhorar a qualidade de vida após o cancro tornou-se uma prioridade importante, tendo em conta os efeitos secundários dos tratamentos que podem persistir a curto e longo prazo.\nO Memory2Care foi desenvolvido em resposta às dificuldades cognitivas frequentemente relatadas por pessoas após o diagnóstico e tratamento de cancro da mama. Embora existam programas de reabilitação cognitiva para apoiar dificuldades relacionadas com a atenção, memória e funcionamento executivo, poucas intervenções abordam especificamente a memória prospetiva e a sua aplicação na vida quotidiana.\nO projeto pretende colmatar esta lacuna através do desenvolvimento de uma solução digital inovadora, acessível e centrada no utilizador, adaptada às necessidades das sobreviventes de cancro da mama.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stages_title",
        text: "Objetivos e Fases do Projeto",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stages_intro",
        text: "O projeto Memory2Care será desenvolvido em várias fases, desde a conceção da intervenção até à avaliação da sua usabilidade e eficácia. Cada fase contribui para garantir que a solução final seja baseada em evidências, fácil de utilizar e adaptada às necessidades reais das pessoas que vivem com e além do cancro.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage1_title",
        text: "Fase 1 — Definição de Conteúdos e Funcionalidades",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage1_text",
        text: "Nesta primeira fase, serão recolhidas contribuições de especialistas nacionais e internacionais em psicooncologia, neuropsicologia, cognição, memória prospetiva e saúde digital. O objetivo é identificar os conteúdos, estratégias e funcionalidades mais adequados a incluir na intervenção.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage2_title",
        text: "Fase 2 — Desenvolvimento das Aplicações Memory2Care",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage2_text",
        text: "Com base nas recomendações recolhidas na Fase 1, será desenvolvida uma aplicação para smartphone para disponibilizar a intervenção. A aplicação incluirá informação sobre o cancro da mama e o seu potencial impacto no funcionamento cognitivo, exercícios de treino cognitivo integrados nas rotinas diárias, estratégias compensatórias e ferramentas de apoio à memória prospetiva.\nAdicionalmente, serão desenvolvidas funcionalidades de realidade aumentada para apoiar a realização de tarefas quotidianas em contextos reais.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage3_title",
        text: "Fase 3 — Teste de Usabilidade e Aceitabilidade",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage3_text",
        text: "Nesta fase, os participantes serão convidados a experimentar a aplicação e a partilhar as suas experiências. O objetivo é avaliar se a aplicação é fácil de utilizar, intuitiva, útil e adequada às necessidades dos seus utilizadores.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage4_title",
        text: "Fase 4 — Estudo Piloto de Intervenção",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "about_stage4_text",
        text: "Após os refinamentos com base na fase anterior, será realizado um estudo piloto para explorar os efeitos da intervenção. Os participantes poderão ser alocados a uma de três condições: uma aplicação com funcionalidades de realidade aumentada, uma aplicação sem realidade aumentada, ou um grupo de comparação em lista de espera, que também terá acesso à intervenção após a conclusão do estudo.\nO objetivo é avaliar se a intervenção pode melhorar a memória prospetiva e outras funções cognitivas essenciais para a vida quotidiana e, consequentemente, promover uma melhor adesão ao tratamento e qualidade de vida.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
];

async function seed() {
    let ok = 0, skipped = 0, failed = 0;

    for (const item of content) {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            const json = await res.json();

            if (res.ok) {
                console.log(`✅ [${item.language}] ${item.element_id}`);
                ok++;
            } else {
                console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`);
                skipped++;
            }
        } catch (e) {
            console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`);
            failed++;
        }
    }

    console.log(`\n ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
}

seed();