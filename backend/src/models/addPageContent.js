// // // // // // // seed-homepage.js
// // // // // // const API_URL = "http://localhost:3000/api/page/create";
// // // // // //
// // // // // // const content = [
// // // // // //     // ── EN ──────────────────────────────────────────────────
// // // // // //     {
// // // // // //         element_id: "homepage_title",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_subtitle",
// // // // // //         text: "Prospective Memory Rehabilitation for Cancer Survivors",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_checklist_title",
// // // // // //         text: "Do you remember to...",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_1",
// // // // // //         text: "take your medication on time?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_2",
// // // // // //         text: "attend your follow-up appointments?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_3",
// // // // // //         text: "complete important daily tasks?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_description",
// // // // // //         text: "Memory2Care is an innovative project aiming to develop and provide a digital intervention to support breast cancer survivors experiencing prospective memory difficulties. Through cognitive training, compensatory strategies, psychoeducation, and augmented reality, the application will help users remember, plan, and carry out important everyday tasks. By doing so, it aims to promote better treatment adherence, greater independence, well-being, and quality of life.",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_btn_participate",
// // // // // //         text: "I Want to Participate",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_btn_learn",
// // // // // //         text: "Learn More About the Project",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     // Footer
// // // // // //     {
// // // // // //         element_id: "footer_project_title",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_project_description",
// // // // // //         text: "Memory2Care is a research project aimed at developing an innovative digital intervention to address prospective memory difficulties in the context of cancer.",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_title",
// // // // // //         text: "Contact Information",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_university",
// // // // // //         text: "Portucalense University",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_address",
// // // // // //         text: "Rua Dr. António Bernardino de Almeida, 541",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_city",
// // // // // //         text: "4200-072 Porto, Portugal",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_email",
// // // // // //         text: "memory2care@upt.pt",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_links_title",
// // // // // //         text: "Useful Links",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_label",
// // // // // //         text: "Project funded by:",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_name",
// // // // // //         text: "Gilead GÉNESE Programme – 11th Edition",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_promoter_title",
// // // // // //         text: "Promoter",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_title",
// // // // // //         text: "Funding",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_copyright",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "EN"
// // // // // //     },
// // // // // //
// // // // // //     // ── PT ──────────────────────────────────────────────────
// // // // // //     {
// // // // // //         element_id: "homepage_title",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_subtitle",
// // // // // //         text: "Reabilitação da Memória Prospetiva para Sobreviventes de Cancro",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_checklist_title",
// // // // // //         text: "Você se lembra de...",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_1",
// // // // // //         text: "tomar a sua medicação a tempo?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_2",
// // // // // //         text: "comparecer às consultas de acompanhamento?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_check_3",
// // // // // //         text: "completar tarefas diárias importantes?",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_description",
// // // // // //         text: "O Memory2Care é um projeto inovador que visa desenvolver e disponibilizar uma intervenção digital para apoiar sobreviventes de cancro da mama com dificuldades de memória prospetiva. Através de treino cognitivo, estratégias compensatórias, psicoeducação e realidade aumentada, a aplicação ajudará os utilizadores a recordar, planear e executar tarefas quotidianas importantes. Com isto, pretende promover uma melhor adesão ao tratamento, maior independência, bem-estar e qualidade de vida.",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_btn_participate",
// // // // // //         text: "Quero Participar",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "homepage_btn_learn",
// // // // // //         text: "Saiba Mais Sobre o Projeto",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     // Footer PT
// // // // // //     {
// // // // // //         element_id: "footer_project_title",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_project_description",
// // // // // //         text: "O Memory2Care é um projeto de investigação que visa desenvolver uma intervenção digital inovadora para abordar as dificuldades de memória prospetiva no contexto do cancro.",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_title",
// // // // // //         text: "Informações de Contacto",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_university",
// // // // // //         text: "Universidade Portucalense",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_address",
// // // // // //         text: "Rua Dr. António Bernardino de Almeida, 541",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_city",
// // // // // //         text: "4200-072 Porto, Portugal",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_contact_email",
// // // // // //         text: "memory2care@upt.pt",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_links_title",
// // // // // //         text: "Links Úteis",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_label",
// // // // // //         text: "Projeto financiado por:",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_name",
// // // // // //         text: "Programa Gilead GÉNESE – 11.ª Edição",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_promoter_title",
// // // // // //         text: "Promotor",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_funding_title",
// // // // // //         text: "Financiamento",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // //     {
// // // // // //         element_id: "footer_copyright",
// // // // // //         text: "Memory2Care",
// // // // // //         page_type: "MAIN_PAGE",
// // // // // //         language: "PT"
// // // // // //     },
// // // // // // ];
// // // // // //
// // // // // // async function seed() {
// // // // // //     let ok = 0, skipped = 0, failed = 0;
// // // // // //
// // // // // //     for (const item of content) {
// // // // // //         try {
// // // // // //             const res = await fetch(API_URL, {
// // // // // //                 method: "POST",
// // // // // //                 headers: { "Content-Type": "application/json" },
// // // // // //                 body: JSON.stringify(item),
// // // // // //             });
// // // // // //             const json = await res.json();
// // // // // //
// // // // // //             if (res.ok) {
// // // // // //                 console.log(`✅ [${item.language}] ${item.element_id}`);
// // // // // //                 ok++;
// // // // // //             } else {
// // // // // //                 console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`);
// // // // // //                 skipped++;
// // // // // //             }
// // // // // //         } catch (e) {
// // // // // //             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`);
// // // // // //             failed++;
// // // // // //         }
// // // // // //     }
// // // // // //
// // // // // //     console.log(`\n ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// // // // // // }
// // // // // //
// // // // // // seed();
// // // // //
// // // // // // seed-about.js
// // // // // const API_URL = "http://localhost:3000/api/page/create";
// // // // //
// // // // // const content = [
// // // // //     // ── EN ──────────────────────────────────────────────────
// // // // //     {
// // // // //         element_id: "about_prospective_title",
// // // // //         text: "What is prospective memory?",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_prospective_text",
// // // // //         text: "Prospective memory is the ability to remember to carry out an intended action at a specific moment in the future. It plays an important role in many everyday activities, such as taking medication on time, attending medical appointments, passing on important information, or completing a planned task.\nFollowing a breast cancer diagnosis and treatment, some individuals may experience difficulties with prospective memory. These challenges can affect health management, daily routines, work-related activities, and overall quality of life.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_why_title",
// // // // //         text: "Why Memory2Care?",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_why_text",
// // // // //         text: "Scientific and technological advances have contributed to earlier diagnosis and increasingly effective breast cancer treatments. As a result, improving quality of life after cancer has become an important priority, particularly considering the side effects of treatments that may persist in the short and long term.\nMemory2Care was developed in response to the cognitive difficulties frequently reported by individuals following breast cancer diagnosis and treatment. Although cognitive rehabilitation programmes exist to support difficulties related to attention, memory, and executive functioning, few interventions specifically address prospective memory and its application in everyday life.\nThe project aims to address this gap through the development of an innovative, accessible, and user-centred digital solution tailored to the needs of breast cancer survivors.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stages_title",
// // // // //         text: "Project Objectives and Stages",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stages_intro",
// // // // //         text: "The Memory2Care project will be developed in several stages, from the design of the intervention to the evaluation of its usability and effectiveness. Each stage contributes to ensuring that the final solution is evidence-based, easy to use, and adapted to the real needs of people living with and beyond cancer.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage1_title",
// // // // //         text: "Stage 1 — Defining Content and Features",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage1_text",
// // // // //         text: "In this first stage, input will be gathered from national and international experts in psycho-oncology, neuropsychology, cognition, prospective memory, and digital health. The goal is to identify the most appropriate content, strategies, and features to be included in the intervention.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage2_title",
// // // // //         text: "Stage 2 — Development of the Memory2Care Apps",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage2_text",
// // // // //         text: "Based on the recommendations gathered during Stage 1, a smartphone application will be developed to deliver the intervention. The app will include information about breast cancer and its potential impact on cognitive functioning, cognitive training exercises designed to be integrated into daily routines, compensatory strategies, and tools to support prospective memory.\nIn addition, augmented reality features will be developed to support the completion of everyday tasks in real-world contexts.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage3_title",
// // // // //         text: "Stage 3 — Usability and Acceptability Testing",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage3_text",
// // // // //         text: "In this stage, participants will be invited to try the application and share their experiences. The aim is to assess whether the app is easy to use, intuitive, useful, and appropriate for the needs of its users.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage4_title",
// // // // //         text: "Stage 4 — Pilot Intervention Study",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage4_text",
// // // // //         text: "Following refinements based on the previous stage, a pilot study will be conducted to explore the effects of the intervention. Participants may be allocated to one of three conditions: an app with augmented reality features, an app without augmented reality features, or a wait-list comparison group, which will also receive access to the intervention after the study is completed.\nThe aim is to evaluate whether the intervention can improve prospective memory and other cognitive functions that are essential for daily life and, consequently, promote better treatment adherence and quality of life.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "EN"
// // // // //     },
// // // // //
// // // // //     // ── PT ──────────────────────────────────────────────────
// // // // //     {
// // // // //         element_id: "about_prospective_title",
// // // // //         text: "O que é a memória prospetiva?",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_prospective_text",
// // // // //         text: "A memória prospetiva é a capacidade de se lembrar de realizar uma ação pretendida num momento específico no futuro. Desempenha um papel importante em muitas atividades do quotidiano, como tomar a medicação a tempo, comparecer a consultas médicas, transmitir informações importantes ou completar uma tarefa planeada.\nApós o diagnóstico e tratamento de cancro da mama, algumas pessoas podem experienciar dificuldades de memória prospetiva. Estes desafios podem afetar a gestão da saúde, as rotinas diárias, as atividades profissionais e a qualidade de vida em geral.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_why_title",
// // // // //         text: "Porquê o Memory2Care?",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_why_text",
// // // // //         text: "Os avanços científicos e tecnológicos têm contribuído para um diagnóstico mais precoce e tratamentos cada vez mais eficazes do cancro da mama. Como resultado, melhorar a qualidade de vida após o cancro tornou-se uma prioridade importante, tendo em conta os efeitos secundários dos tratamentos que podem persistir a curto e longo prazo.\nO Memory2Care foi desenvolvido em resposta às dificuldades cognitivas frequentemente relatadas por pessoas após o diagnóstico e tratamento de cancro da mama. Embora existam programas de reabilitação cognitiva para apoiar dificuldades relacionadas com a atenção, memória e funcionamento executivo, poucas intervenções abordam especificamente a memória prospetiva e a sua aplicação na vida quotidiana.\nO projeto pretende colmatar esta lacuna através do desenvolvimento de uma solução digital inovadora, acessível e centrada no utilizador, adaptada às necessidades das sobreviventes de cancro da mama.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stages_title",
// // // // //         text: "Objetivos e Fases do Projeto",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stages_intro",
// // // // //         text: "O projeto Memory2Care será desenvolvido em várias fases, desde a conceção da intervenção até à avaliação da sua usabilidade e eficácia. Cada fase contribui para garantir que a solução final seja baseada em evidências, fácil de utilizar e adaptada às necessidades reais das pessoas que vivem com e além do cancro.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage1_title",
// // // // //         text: "Fase 1 — Definição de Conteúdos e Funcionalidades",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage1_text",
// // // // //         text: "Nesta primeira fase, serão recolhidas contribuições de especialistas nacionais e internacionais em psicooncologia, neuropsicologia, cognição, memória prospetiva e saúde digital. O objetivo é identificar os conteúdos, estratégias e funcionalidades mais adequados a incluir na intervenção.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage2_title",
// // // // //         text: "Fase 2 — Desenvolvimento das Aplicações Memory2Care",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage2_text",
// // // // //         text: "Com base nas recomendações recolhidas na Fase 1, será desenvolvida uma aplicação para smartphone para disponibilizar a intervenção. A aplicação incluirá informação sobre o cancro da mama e o seu potencial impacto no funcionamento cognitivo, exercícios de treino cognitivo integrados nas rotinas diárias, estratégias compensatórias e ferramentas de apoio à memória prospetiva.\nAdicionalmente, serão desenvolvidas funcionalidades de realidade aumentada para apoiar a realização de tarefas quotidianas em contextos reais.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage3_title",
// // // // //         text: "Fase 3 — Teste de Usabilidade e Aceitabilidade",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage3_text",
// // // // //         text: "Nesta fase, os participantes serão convidados a experimentar a aplicação e a partilhar as suas experiências. O objetivo é avaliar se a aplicação é fácil de utilizar, intuitiva, útil e adequada às necessidades dos seus utilizadores.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage4_title",
// // // // //         text: "Fase 4 — Estudo Piloto de Intervenção",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // //     {
// // // // //         element_id: "about_stage4_text",
// // // // //         text: "Após os refinamentos com base na fase anterior, será realizado um estudo piloto para explorar os efeitos da intervenção. Os participantes poderão ser alocados a uma de três condições: uma aplicação com funcionalidades de realidade aumentada, uma aplicação sem realidade aumentada, ou um grupo de comparação em lista de espera, que também terá acesso à intervenção após a conclusão do estudo.\nO objetivo é avaliar se a intervenção pode melhorar a memória prospetiva e outras funções cognitivas essenciais para a vida quotidiana e, consequentemente, promover uma melhor adesão ao tratamento e qualidade de vida.",
// // // // //         page_type: "MAIN_PAGE",
// // // // //         language: "PT"
// // // // //     },
// // // // // ];
// // // // //
// // // // // async function seed() {
// // // // //     let ok = 0, skipped = 0, failed = 0;
// // // // //
// // // // //     for (const item of content) {
// // // // //         try {
// // // // //             const res = await fetch(API_URL, {
// // // // //                 method: "POST",
// // // // //                 headers: { "Content-Type": "application/json" },
// // // // //                 body: JSON.stringify(item),
// // // // //             });
// // // // //             const json = await res.json();
// // // // //
// // // // //             if (res.ok) {
// // // // //                 console.log(`✅ [${item.language}] ${item.element_id}`);
// // // // //                 ok++;
// // // // //             } else {
// // // // //                 console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`);
// // // // //                 skipped++;
// // // // //             }
// // // // //         } catch (e) {
// // // // //             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`);
// // // // //             failed++;
// // // // //         }
// // // // //     }
// // // // //
// // // // //     console.log(`\n ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// // // // // }
// // // // //
// // // // // seed();
// // // //
// // // //
// // // //
// // // // // seed-team.js
// // // // const API_URL = "http://localhost:3000/api/page/create";
// // // //
// // // // const content = [
// // // //     // ── EN ──────────────────────────────────────────────────
// // // //     {
// // // //         element_id: "team_partners_title",
// // // //         text: "Partner Institutions",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partners_intro",
// // // //         text: "Memory2Care brings together a multidisciplinary team of researchers and specialists from national and international institutions with expertise in psycho-oncology, neuropsychology, and computer science.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner1_name",
// // // //         text: "Portucalense University (Portugal)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner1_text",
// // // //         text: "Portucalense University coordinates the Memory2Care project through RISE-Health@UPT, a research hub of the RISE-Health Research Unit. Supported by a strong network of collaborations with healthcare institutions, the project combines the scientific knowledge and expertise needed to develop innovative solutions for prospective memory rehabilitation in breast cancer survivors.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner2_name",
// // // //         text: "Heidelberg University (Germany)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner2_text",
// // // //         text: "Heidelberg University, one of Europe's most prestigious universities, is a partner in the project. This collaboration contributes specialised expertise in cognition, self-regulation, and, more specifically, prospective memory, a key area for the scientific development and innovation of the proposed intervention.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner3_name",
// // // //         text: "Universidade Aberta (Portugal)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner3_text",
// // // //         text: "Universidade Aberta (UAb), Portugal's leading public distance-learning university, is also a partner in the Memory2Care project. With recognised expertise in the development and implementation of technological solutions, it contributes to the evaluation of digital tools that support an accessible, innovative intervention tailored to the needs of breast cancer survivors.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partnership_title",
// // // //         text: "A Partnership to Improve the Lives of Breast Cancer Survivors",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_partnership_text",
// // // //         text: "The collaboration between these institutions combines scientific knowledge, technological innovation, and clinical expertise to develop an accessible, sustainable digital solution centred on the real needs of breast cancer survivors.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_researchers_title",
// // // //         text: "Research Team",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_researchers_intro",
// // // //         text: "Meet the team behind Memory2Care. Click on any researcher to view their full profile, institutional affiliation, and research identifiers.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_collaborators_title",
// // // //         text: "Collaborators",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_collaborators_text",
// // // //         text: "The project also benefits from the collaboration of students from different levels of study in Psychology and Computer Science. These students actively contribute to various stages of the research process, supporting the development and implementation of the different activities carried out within Memory2Care.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_funding_title",
// // // //         text: "Funding",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //     {
// // // //         element_id: "team_funding_text",
// // // //         text: "The Memory2Care project is funded through the 11th Edition of the Gilead GÉNESE Programme, an initiative that supports innovative projects with a positive impact on health and healthcare in Portugal.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "EN"
// // // //     },
// // // //
// // // //     // ── PT ──────────────────────────────────────────────────
// // // //     {
// // // //         element_id: "team_partners_title",
// // // //         text: "Instituições Parceiras",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partners_intro",
// // // //         text: "O Memory2Care reúne uma equipa multidisciplinar de investigadores e especialistas de instituições nacionais e internacionais com experiência em psicooncologia, neuropsicologia e ciências da computação.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner1_name",
// // // //         text: "Universidade Portucalense (Portugal)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner1_text",
// // // //         text: "A Universidade Portucalense coordena o projeto Memory2Care através do RISE-Health@UPT, um polo de investigação da Unidade de Investigação RISE-Health. Apoiado por uma forte rede de colaborações com instituições de saúde, o projeto combina o conhecimento científico e a experiência necessários para desenvolver soluções inovadoras para a reabilitação da memória prospetiva em sobreviventes de cancro da mama.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner2_name",
// // // //         text: "Universidade de Heidelberg (Alemanha)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner2_text",
// // // //         text: "A Universidade de Heidelberg, uma das universidades mais prestigiadas da Europa, é parceira do projeto. Esta colaboração contribui com experiência especializada em cognição, autorregulação e, mais especificamente, memória prospetiva, uma área-chave para o desenvolvimento científico e a inovação da intervenção proposta.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner3_name",
// // // //         text: "Universidade Aberta (Portugal)",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partner3_text",
// // // //         text: "A Universidade Aberta (UAb), a principal universidade pública de ensino a distância de Portugal, é também parceira do projeto Memory2Care. Com reconhecida experiência no desenvolvimento e implementação de soluções tecnológicas, contribui para a avaliação de ferramentas digitais que apoiam uma intervenção acessível, inovadora e adaptada às necessidades das sobreviventes de cancro da mama.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partnership_title",
// // // //         text: "Uma Parceria para Melhorar a Vida das Sobreviventes de Cancro da Mama",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_partnership_text",
// // // //         text: "A colaboração entre estas instituições combina conhecimento científico, inovação tecnológica e experiência clínica para desenvolver uma solução digital acessível e sustentável, centrada nas necessidades reais das sobreviventes de cancro da mama.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_researchers_title",
// // // //         text: "Equipa de Investigação",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_researchers_intro",
// // // //         text: "Conheça a equipa por trás do Memory2Care. Clique em qualquer investigador para ver o seu perfil completo, afiliação institucional e identificadores de investigação.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_collaborators_title",
// // // //         text: "Colaboradores",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_collaborators_text",
// // // //         text: "O projeto beneficia também da colaboração de estudantes de diferentes níveis de formação em Psicologia e Ciências da Computação. Estes estudantes contribuem ativamente para várias etapas do processo de investigação, apoiando o desenvolvimento e a implementação das diferentes atividades realizadas no âmbito do Memory2Care.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_funding_title",
// // // //         text: "Financiamento",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // //     {
// // // //         element_id: "team_funding_text",
// // // //         text: "O projeto Memory2Care é financiado pela 11.ª Edição do Programa Gilead GÉNESE, uma iniciativa que apoia projetos inovadores com impacto positivo na saúde e nos cuidados de saúde em Portugal.",
// // // //         page_type: "MAIN_PAGE",
// // // //         language: "PT"
// // // //     },
// // // // ];
// // // //
// // // // async function seed() {
// // // //     let ok = 0, skipped = 0, failed = 0;
// // // //
// // // //     for (const item of content) {
// // // //         try {
// // // //             const res = await fetch(API_URL, {
// // // //                 method: "POST",
// // // //                 headers: { "Content-Type": "application/json" },
// // // //                 body: JSON.stringify(item),
// // // //             });
// // // //             const json = await res.json();
// // // //
// // // //             if (res.ok) {
// // // //                 console.log(`✅ [${item.language}] ${item.element_id}`);
// // // //                 ok++;
// // // //             } else {
// // // //                 console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`);
// // // //                 skipped++;
// // // //             }
// // // //         } catch (e) {
// // // //             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`);
// // // //             failed++;
// // // //         }
// // // //     }
// // // //
// // // //     console.log(`\nРезультат: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// // // // }
// // // //
// // // // seed();
// // //
// // //
// // // // seed-team-members.js
// // // const API_URL = "http://localhost:3000/api/page/create";
// // //
// // // const content = [
// // //     // ── RESEARCHERS EN ──────────────────────────────────────
// // //     { element_id: "researcher_1_initials",    text: "AB",                                              page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_1_name",        text: "Ana Bártolo",                                     page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_1_role",        text: "Principal Investigator (Project Coordinator)",    page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_1_affiliation", text: "Portucalense University",                         page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_1_url",         text: "https://www.cienciavitae.pt/0E1F-D02A-6DFF",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_1_tag",         text: "PI",                                              page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "researcher_2_initials",    text: "PFSR",                                            page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_2_name",        text: "Pedro F. S. Rodrigues",                           page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_2_role",        text: "Co-Principal Investigator (Co-Coordinator)",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_2_affiliation", text: "Portucalense University",                         page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_2_url",         text: "https://www.cienciavitae.pt/A619-A232-5DDC",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_2_tag",         text: "Co-PI",                                           page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "researcher_3_initials",    text: "BC",                                              page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_3_name",        text: "Bruno Cunha",                                     page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_3_role",        text: "Researcher",                                      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_3_affiliation", text: "Portucalense University",                         page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_3_url",         text: "https://www.cienciavitae.pt/581D-067C-6E6C",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_3_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "researcher_4_initials",    text: "JR",                                              page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_4_name",        text: "Jan Rummel",                                      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_4_role",        text: "Researcher",                                      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_4_affiliation", text: "Heidelberg University",                           page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_4_url",         text: "https://www.psychologie.uni-heidelberg.de/person/jan-rummel", page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_4_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "researcher_5_initials",    text: "SMF",                                             page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_5_name",        text: "Sara M. Fernandes",                               page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_5_role",        text: "Researcher",                                      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_5_affiliation", text: "Universidade Aberta",                             page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_5_url",         text: "https://www.cienciavitae.pt/5B1A-1694-0186",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_5_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "researcher_6_initials",    text: "SM",                                              page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_6_name",        text: "Sara Monteiro",                                   page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_6_role",        text: "Researcher",                                      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_6_affiliation", text: "Portucalense University",                         page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_6_url",         text: "https://www.cienciavitae.pt/4C18-1369-EB51",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "researcher_6_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     // ── COLLABORATORS EN ────────────────────────────────────
// // //     { element_id: "collaborator_1_initials",    text: "JB",                                            page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "collaborator_1_name",        text: "João Barros",                                   page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "collaborator_1_role",        text: "Master's Student",                              page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "collaborator_1_affiliation", text: "MSc in Clinical and Health Psychology",         page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     // ── PARTNERS EN ─────────────────────────────────────────
// // //     { element_id: "partner_1_name", text: "Portucalense University (Portugal)",   page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "partner_1_text", text: "Portucalense University coordinates the Memory2Care project through RISE-Health@UPT, a research hub of the RISE-Health Research Unit. Supported by a strong network of collaborations with healthcare institutions, the project combines the scientific knowledge and expertise needed to develop innovative solutions for prospective memory rehabilitation in breast cancer survivors.", page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "partner_2_name", text: "Heidelberg University (Germany)",      page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "partner_2_text", text: "Heidelberg University, one of Europe's most prestigious universities, is a partner in the project. This collaboration contributes specialised expertise in cognition, self-regulation, and, more specifically, prospective memory, a key area for the scientific development and innovation of the proposed intervention.", page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     { element_id: "partner_3_name", text: "Universidade Aberta (Portugal)",       page_type: "MAIN_PAGE", language: "EN" },
// // //     { element_id: "partner_3_text", text: "Universidade Aberta (UAb), Portugal's leading public distance-learning university, is also a partner in the Memory2Care project. With recognised expertise in the development and implementation of technological solutions, it contributes to the evaluation of digital tools that support an accessible, innovative intervention tailored to the needs of breast cancer survivors.", page_type: "MAIN_PAGE", language: "EN" },
// // //
// // //     // ── RESEARCHERS PT ──────────────────────────────────────
// // //     { element_id: "researcher_1_initials",    text: "AB",                                              page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_1_name",        text: "Ana Bártolo",                                     page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_1_role",        text: "Investigadora Principal (Coordenadora)",          page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_1_affiliation", text: "Universidade Portucalense",                       page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_1_url",         text: "https://www.cienciavitae.pt/0E1F-D02A-6DFF",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_1_tag",         text: "PI",                                              page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "researcher_2_initials",    text: "PFSR",                                            page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_2_name",        text: "Pedro F. S. Rodrigues",                           page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_2_role",        text: "Co-Investigador Principal (Co-Coordenador)",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_2_affiliation", text: "Universidade Portucalense",                       page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_2_url",         text: "https://www.cienciavitae.pt/A619-A232-5DDC",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_2_tag",         text: "Co-PI",                                           page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "researcher_3_initials",    text: "BC",                                              page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_3_name",        text: "Bruno Cunha",                                     page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_3_role",        text: "Investigador",                                    page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_3_affiliation", text: "Universidade Portucalense",                       page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_3_url",         text: "https://www.cienciavitae.pt/581D-067C-6E6C",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_3_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "researcher_4_initials",    text: "JR",                                              page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_4_name",        text: "Jan Rummel",                                      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_4_role",        text: "Investigador",                                    page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_4_affiliation", text: "Universidade de Heidelberg",                      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_4_url",         text: "https://www.psychologie.uni-heidelberg.de/person/jan-rummel", page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_4_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "researcher_5_initials",    text: "SMF",                                             page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_5_name",        text: "Sara M. Fernandes",                               page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_5_role",        text: "Investigadora",                                   page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_5_affiliation", text: "Universidade Aberta",                             page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_5_url",         text: "https://www.cienciavitae.pt/5B1A-1694-0186",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_5_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "researcher_6_initials",    text: "SM",                                              page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_6_name",        text: "Sara Monteiro",                                   page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_6_role",        text: "Investigadora",                                   page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_6_affiliation", text: "Universidade Portucalense",                       page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_6_url",         text: "https://www.cienciavitae.pt/4C18-1369-EB51",      page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "researcher_6_tag",         text: "",                                                page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     // ── COLLABORATORS PT ────────────────────────────────────
// // //     { element_id: "collaborator_1_initials",    text: "JB",                                            page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "collaborator_1_name",        text: "João Barros",                                   page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "collaborator_1_role",        text: "Estudante de Mestrado",                         page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "collaborator_1_affiliation", text: "Mestrado em Psicologia Clínica e da Saúde",     page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     // ── PARTNERS PT ─────────────────────────────────────────
// // //     { element_id: "partner_1_name", text: "Universidade Portucalense (Portugal)", page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "partner_1_text", text: "A Universidade Portucalense coordena o projeto Memory2Care através do RISE-Health@UPT, um polo de investigação da Unidade de Investigação RISE-Health. Apoiado por uma forte rede de colaborações com instituições de saúde, o projeto combina o conhecimento científico e a experiência necessários para desenvolver soluções inovadoras para a reabilitação da memória prospetiva em sobreviventes de cancro da mama.", page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "partner_2_name", text: "Universidade de Heidelberg (Alemanha)", page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "partner_2_text", text: "A Universidade de Heidelberg, uma das universidades mais prestigiadas da Europa, é parceira do projeto. Esta colaboração contribui com experiência especializada em cognição, autorregulação e, mais especificamente, memória prospetiva, uma área-chave para o desenvolvimento científico e a inovação da intervenção proposta.", page_type: "MAIN_PAGE", language: "PT" },
// // //
// // //     { element_id: "partner_3_name", text: "Universidade Aberta (Portugal)",        page_type: "MAIN_PAGE", language: "PT" },
// // //     { element_id: "partner_3_text", text: "A Universidade Aberta (UAb), a principal universidade pública de ensino a distância de Portugal, é também parceira do projeto Memory2Care. Com reconhecida experiência no desenvolvimento e implementação de soluções tecnológicas, contribui para a avaliação de ferramentas digitais que apoiam uma intervenção acessível, inovadora e adaptada às necessidades das sobreviventes de cancro da mama.", page_type: "MAIN_PAGE", language: "PT" },
// // // ];
// // //
// // // async function seed() {
// // //     let ok = 0, skipped = 0, failed = 0;
// // //     for (const item of content) {
// // //         try {
// // //             const res = await fetch(API_URL, {
// // //                 method: "POST",
// // //                 headers: { "Content-Type": "application/json" },
// // //                 body: JSON.stringify(item),
// // //             });
// // //             const json = await res.json();
// // //             if (res.ok) { console.log(`✅ [${item.language}] ${item.element_id}`); ok++; }
// // //             else { console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`); skipped++; }
// // //         } catch (e) {
// // //             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`); failed++;
// // //         }
// // //     }
// // //     console.log(`\nРезультат: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// // // }
// // //
// // // seed();
// //
// //
// // // seed-contact.js
// // const API_URL = "http://localhost:3000/api/page/create";
// //
// // const content = [
// //     // ── EN ──────────────────────────────────────────────────
// //     { element_id: "contact_title",                text: "Contact",                                                                          page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_intro",                text: "We are available to answer questions, receive suggestions, and provide further information about the project.", page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_form_title",           text: "Contact Us",                                                                       page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_form_desc",            text: "This area is intended for participants, healthcare professionals, researchers, or anyone interested in learning more about the project.", page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_field_name",           text: "Name",                                                                             page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_field_email",          text: "Email",                                                                            page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_field_subject",        text: "Subject",                                                                          page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_field_message",        text: "Message",                                                                          page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_field_privacy",        text: "I accept the Privacy Policy",                                                      page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_btn_send",             text: "Send Message",                                                                     page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_other_title",          text: "Other Ways to Contact Us",                                                         page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_email_label",          text: "Email",                                                                            page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_email_value",          text: "memory2care@upt.pt",                                                               page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_address_label",        text: "Address",                                                                          page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_address_1",            text: "Portucalense University\nRua Dr. António Bernardino de Almeida, 541\n4200-072 Porto, Portugal", page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_address_2",            text: "Rua de S. Tomé, 712\n4200-072 Porto, Portugal",                                   page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_hours_label",          text: "Office Hours",                                                                     page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_hours_days",           text: "Monday to Friday",                                                                 page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_hours_time",           text: "09:00 – 18:00",                                                                    page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_map_title",            text: "Where to Find Us",                                                                 page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_map_btn",              text: "View on Map",                                                                      page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_privacy_required",     text: "Please accept the Privacy Policy to continue",                                     page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_name_required",        text: "Please enter your name",                                                           page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_email_required",       text: "Please enter a valid email",                                                       page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_subject_required",     text: "Please enter a subject",                                                           page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_message_required",     text: "Please enter your message",                                                        page_type: "MAIN_PAGE", language: "EN" },
// //     { element_id: "contact_success",              text: "Your message has been sent successfully. We will get back to you soon.",            page_type: "MAIN_PAGE", language: "EN" },
// //
// //     // ── PT ──────────────────────────────────────────────────
// //     { element_id: "contact_title",                text: "Contacto",                                                                         page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_intro",                text: "Estamos disponíveis para responder a questões, receber sugestões e fornecer mais informações sobre o projeto.", page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_form_title",           text: "Contacte-nos",                                                                     page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_form_desc",            text: "Esta área destina-se a participantes, profissionais de saúde, investigadores ou qualquer pessoa interessada em saber mais sobre o projeto.", page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_field_name",           text: "Nome",                                                                             page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_field_email",          text: "Email",                                                                            page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_field_subject",        text: "Assunto",                                                                          page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_field_message",        text: "Mensagem",                                                                         page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_field_privacy",        text: "Aceito a Política de Privacidade",                                                 page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_btn_send",             text: "Enviar Mensagem",                                                                  page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_other_title",          text: "Outras Formas de Contacto",                                                        page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_email_label",          text: "Email",                                                                            page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_email_value",          text: "memory2care@upt.pt",                                                               page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_address_label",        text: "Morada",                                                                           page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_address_1",            text: "Universidade Portucalense\nRua Dr. António Bernardino de Almeida, 541\n4200-072 Porto, Portugal", page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_address_2",            text: "Rua de S. Tomé, 712\n4200-072 Porto, Portugal",                                   page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_hours_label",          text: "Horário de Atendimento",                                                          page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_hours_days",           text: "Segunda a Sexta-feira",                                                            page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_hours_time",           text: "09:00 – 18:00",                                                                    page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_map_title",            text: "Onde nos Encontrar",                                                               page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_map_btn",              text: "Ver no Mapa",                                                                      page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_privacy_required",     text: "Por favor, aceite a Política de Privacidade para continuar",                       page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_name_required",        text: "Por favor, introduza o seu nome",                                                  page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_email_required",       text: "Por favor, introduza um email válido",                                             page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_subject_required",     text: "Por favor, introduza um assunto",                                                  page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_message_required",     text: "Por favor, introduza a sua mensagem",                                              page_type: "MAIN_PAGE", language: "PT" },
// //     { element_id: "contact_success",              text: "A sua mensagem foi enviada com sucesso. Entraremos em contacto brevemente.",        page_type: "MAIN_PAGE", language: "PT" },
// // ];
// //
// // async function seed() {
// //     let ok = 0, skipped = 0, failed = 0;
// //     for (const item of content) {
// //         try {
// //             const res = await fetch(API_URL, {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(item),
// //             });
// //             const json = await res.json();
// //             if (res.ok) { console.log(`✅ [${item.language}] ${item.element_id}`); ok++; }
// //             else { console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`); skipped++; }
// //         } catch (e) {
// //             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`); failed++;
// //         }
// //     }
// //     console.log(`\nРезультат: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// // }
// //
// // seed();
//
//
// // seed-news.js
// const API_URL = "http://localhost:3000/api/page/create";
//
// const content = [
//     // ── UI labels EN ────────────────────────────────────────
//     { element_id: "news_page_title",      text: "News",               page_type: "MAIN_PAGE", language: "EN" },
//     { element_id: "news_btn_read_more",   text: "Read More",          page_type: "MAIN_PAGE", language: "EN" },
//     { element_id: "news_btn_view_all",    text: "View All News",      page_type: "MAIN_PAGE", language: "EN" },
//     { element_id: "news_btn_full",        text: "View Full Article",  page_type: "MAIN_PAGE", language: "EN" },
//     { element_id: "news_select_hint",     text: "Select a news item from the list to read the full article.", page_type: "MAIN_PAGE", language: "EN" },
//
//     // ── UI labels PT ────────────────────────────────────────
//     { element_id: "news_page_title",      text: "Notícias",                    page_type: "MAIN_PAGE", language: "PT" },
//     { element_id: "news_btn_read_more",   text: "Ler Mais",                    page_type: "MAIN_PAGE", language: "PT" },
//     { element_id: "news_btn_view_all",    text: "Ver Todas as Notícias",       page_type: "MAIN_PAGE", language: "PT" },
//     { element_id: "news_btn_full",        text: "Ver Artigo Completo",         page_type: "MAIN_PAGE", language: "PT" },
//     { element_id: "news_select_hint",     text: "Selecione uma notícia da lista para ler o artigo completo.", page_type: "MAIN_PAGE", language: "PT" },
//
//     // ── NEWS #1 EN ──────────────────────────────────────────
//     {
//         element_id: "news_1_title",
//         text: "Memory2Care awarded funding through the 11th Edition of the Gilead GÉNESE Programme",
//         page_type: "NEWS", language: "EN",
//         news_author: "Memory2Care Team",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_category",
//         text: "Funding",
//         page_type: "NEWS", language: "EN",
//         news_author: "Memory2Care Team",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_short",
//         text: "Memory2Care was selected for funding through the 11th Edition of the Gilead GÉNESE Programme, supporting innovative projects with impact on health and healthcare in Portugal.",
//         page_type: "NEWS", language: "EN",
//         news_author: "Memory2Care Team",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_full",
//         text: "Memory2Care was one of the projects selected for funding through the 11th Edition of the Gilead GÉNESE Programme, an initiative supporting innovative projects with impact on health and healthcare in Portugal.\nThe public recognition event took place on 11 March 2026 at the Centro Cultural de Belém, Lisbon, during an event dedicated to the theme \"From Data to Decision: Access to Innovation in Healthcare\". The event brought together experts from different fields to discuss challenges and opportunities related to healthcare innovation.\nThe funding awarded will support the development of Memory2Care and contribute to the creation of an innovative digital intervention designed to support individuals diagnosed with breast cancer who experience prospective memory difficulties following treatment.",
//         page_type: "NEWS", language: "EN",
//         news_author: "Memory2Care Team",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_url",
//         text: "https://www.gilead.com/genese",
//         page_type: "NEWS", language: "EN",
//         news_author: "Memory2Care Team",
//         news_date: "2026-03-11"
//     },
//
//     // ── NEWS #1 PT ──────────────────────────────────────────
//     {
//         element_id: "news_1_title",
//         text: "Memory2Care distinguido com financiamento pela 11.ª Edição do Programa Gilead GÉNESE",
//         page_type: "NEWS", language: "PT",
//         news_author: "Equipa Memory2Care",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_category",
//         text: "Financiamento",
//         page_type: "NEWS", language: "PT",
//         news_author: "Equipa Memory2Care",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_short",
//         text: "O Memory2Care foi selecionado para financiamento pela 11.ª Edição do Programa Gilead GÉNESE, uma iniciativa que apoia projetos inovadores com impacto na saúde em Portugal.",
//         page_type: "NEWS", language: "PT",
//         news_author: "Equipa Memory2Care",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_full",
//         text: "O Memory2Care foi um dos projetos selecionados para financiamento pela 11.ª Edição do Programa Gilead GÉNESE, uma iniciativa que apoia projetos inovadores com impacto na saúde e nos cuidados de saúde em Portugal.\nA cerimónia pública de reconhecimento realizou-se a 11 de março de 2026 no Centro Cultural de Belém, em Lisboa, durante um evento dedicado ao tema \"Dos Dados à Decisão: Acesso à Inovação nos Cuidados de Saúde\". O evento reuniu especialistas de diferentes áreas para debater desafios e oportunidades relacionados com a inovação em saúde.\nO financiamento atribuído irá apoiar o desenvolvimento do Memory2Care e contribuir para a criação de uma intervenção digital inovadora, concebida para apoiar pessoas diagnosticadas com cancro da mama que experienciam dificuldades de memória prospetiva após o tratamento.",
//         page_type: "NEWS", language: "PT",
//         news_author: "Equipa Memory2Care",
//         news_date: "2026-03-11"
//     },
//     {
//         element_id: "news_1_url",
//         text: "https://www.gilead.com/genese",
//         page_type: "NEWS", language: "PT",
//         news_author: "Equipa Memory2Care",
//         news_date: "2026-03-11"
//     },
// ];
//
// async function seed() {
//     let ok = 0, skipped = 0, failed = 0;
//     for (const item of content) {
//         try {
//             const res = await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(item),
//             });
//             const json = await res.json();
//             if (res.ok) { console.log(`✅ [${item.language}] ${item.element_id}`); ok++; }
//             else { console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.message || JSON.stringify(json)}`); skipped++; }
//         } catch (e) {
//             console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`); failed++;
//         }
//     }
//     console.log(`\nРезультат: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
// }
//
// seed();

const content = [
    // NEWS #1 EN
    {
        element_id: "news_1_title",
        text: "Memory2Care awarded funding through the 11th Edition of the Gilead GÉNESE Programme",
        page_type: "NEWS", language: "EN",
        news_author: "Memory2Care Team",
        news_date: "2026-03-11T00:00:00.000Z"  // ← так
    },
    {
        element_id: "news_1_category",
        text: "Funding",
        page_type: "NEWS", language: "EN",
        news_author: "Memory2Care Team",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_short",
        text: "Memory2Care was selected for funding through the 11th Edition of the Gilead GÉNESE Programme, supporting innovative projects with impact on health and healthcare in Portugal.",
        page_type: "NEWS", language: "EN",
        news_author: "Memory2Care Team",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_full",
        text: "Memory2Care was one of the projects selected for funding through the 11th Edition of the Gilead GÉNESE Programme, an initiative supporting innovative projects with impact on health and healthcare in Portugal.\nThe public recognition event took place on 11 March 2026 at the Centro Cultural de Belém, Lisbon, during an event dedicated to the theme \"From Data to Decision: Access to Innovation in Healthcare\". The event brought together experts from different fields to discuss challenges and opportunities related to healthcare innovation.\nThe funding awarded will support the development of Memory2Care and contribute to the creation of an innovative digital intervention designed to support individuals diagnosed with breast cancer who experience prospective memory difficulties following treatment.",
        page_type: "NEWS", language: "EN",
        news_author: "Memory2Care Team",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_url",
        text: "https://www.gilead.com/genese",
        page_type: "NEWS", language: "EN",
        news_author: "Memory2Care Team",
        news_date: "2026-03-11T00:00:00.000Z"
    },

    // NEWS #1 PT
    {
        element_id: "news_1_title",
        text: "Memory2Care distinguido com financiamento pela 11.ª Edição do Programa Gilead GÉNESE",
        page_type: "NEWS", language: "PT",
        news_author: "Equipa Memory2Care",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_category",
        text: "Financiamento",
        page_type: "NEWS", language: "PT",
        news_author: "Equipa Memory2Care",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_short",
        text: "O Memory2Care foi selecionado para financiamento pela 11.ª Edição do Programa Gilead GÉNESE, uma iniciativa que apoia projetos inovadores com impacto na saúde em Portugal.",
        page_type: "NEWS", language: "PT",
        news_author: "Equipa Memory2Care",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_full",
        text: "O Memory2Care foi um dos projetos selecionados para financiamento pela 11.ª Edição do Programa Gilead GÉNESE, uma iniciativa que apoia projetos inovadores com impacto na saúde e nos cuidados de saúde em Portugal.\nA cerimónia pública de reconhecimento realizou-se a 11 de março de 2026 no Centro Cultural de Belém, em Lisboa, durante um evento dedicado ao tema \"Dos Dados à Decisão: Acesso à Inovação nos Cuidados de Saúde\". O evento reuniu especialistas de diferentes áreas para debater desafios e oportunidades relacionados com a inovação em saúde.\nO financiamento atribuído irá apoiar o desenvolvimento do Memory2Care e contribuir para a criação de uma intervenção digital inovadora, concebida para apoiar pessoas diagnosticadas com cancro da mama que experienciam dificuldades de memória prospetiva após o tratamento.",
        page_type: "NEWS", language: "PT",
        news_author: "Equipa Memory2Care",
        news_date: "2026-03-11T00:00:00.000Z"
    },
    {
        element_id: "news_1_url",
        text: "https://www.gilead.com/genese",
        page_type: "NEWS", language: "PT",
        news_author: "Equipa Memory2Care",
        news_date: "2026-03-11T00:00:00.000Z"
    },
];

async function seed() {
    let ok = 0, skipped = 0, failed = 0;
    for (const item of content) {
        try {
            const res = await fetch("http://localhost:3000/api/page/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            const json = await res.json();
            if (res.ok) { console.log(`✅ [${item.language}] ${item.element_id}`); ok++; }
            else { console.warn(`⚠️  [${item.language}] ${item.element_id} — ${json.error?.message ?? JSON.stringify(json)}`); skipped++; }
        } catch (e) {
            console.error(`❌ [${item.language}] ${item.element_id} — ${e.message}`); failed++;
        }
    }
    console.log(`\nРезультат: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
}

seed();