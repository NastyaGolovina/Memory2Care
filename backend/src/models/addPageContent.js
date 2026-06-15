// seed-homepage.js
const API_URL = "http://localhost:3000/api/page/create";

const content = [
    // ── EN ──────────────────────────────────────────────────
    {
        element_id: "homepage_title",
        text: "Memory2Care",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_subtitle",
        text: "Prospective Memory Rehabilitation for Cancer Survivors",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_checklist_title",
        text: "Do you remember to...",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_check_1",
        text: "take your medication on time?",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_check_2",
        text: "attend your follow-up appointments?",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_check_3",
        text: "complete important daily tasks?",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_description",
        text: "Memory2Care is an innovative project aiming to develop and provide a digital intervention to support breast cancer survivors experiencing prospective memory difficulties. Through cognitive training, compensatory strategies, psychoeducation, and augmented reality, the application will help users remember, plan, and carry out important everyday tasks. By doing so, it aims to promote better treatment adherence, greater independence, well-being, and quality of life.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_btn_participate",
        text: "I Want to Participate",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "homepage_btn_learn",
        text: "Learn More About the Project",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    // Footer
    {
        element_id: "footer_project_title",
        text: "Memory2Care",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_project_description",
        text: "Memory2Care is a research project aimed at developing an innovative digital intervention to address prospective memory difficulties in the context of cancer.",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_contact_title",
        text: "Contact Information",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_contact_university",
        text: "Portucalense University",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_contact_address",
        text: "Rua Dr. António Bernardino de Almeida, 541",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_contact_city",
        text: "4200-072 Porto, Portugal",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_contact_email",
        text: "memory2care@upt.pt",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_links_title",
        text: "Useful Links",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_funding_label",
        text: "Project funded by:",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_funding_name",
        text: "Gilead GÉNESE Programme – 11th Edition",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_promoter_title",
        text: "Promoter",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_funding_title",
        text: "Funding",
        page_type: "MAIN_PAGE",
        language: "EN"
    },
    {
        element_id: "footer_copyright",
        text: "Memory2Care",
        page_type: "MAIN_PAGE",
        language: "EN"
    },

    // ── PT ──────────────────────────────────────────────────
    {
        element_id: "homepage_title",
        text: "Memory2Care",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_subtitle",
        text: "Reabilitação da Memória Prospetiva para Sobreviventes de Cancro",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_checklist_title",
        text: "Você se lembra de...",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_check_1",
        text: "tomar a sua medicação a tempo?",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_check_2",
        text: "comparecer às consultas de acompanhamento?",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_check_3",
        text: "completar tarefas diárias importantes?",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_description",
        text: "O Memory2Care é um projeto inovador que visa desenvolver e disponibilizar uma intervenção digital para apoiar sobreviventes de cancro da mama com dificuldades de memória prospetiva. Através de treino cognitivo, estratégias compensatórias, psicoeducação e realidade aumentada, a aplicação ajudará os utilizadores a recordar, planear e executar tarefas quotidianas importantes. Com isto, pretende promover uma melhor adesão ao tratamento, maior independência, bem-estar e qualidade de vida.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_btn_participate",
        text: "Quero Participar",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "homepage_btn_learn",
        text: "Saiba Mais Sobre o Projeto",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    // Footer PT
    {
        element_id: "footer_project_title",
        text: "Memory2Care",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_project_description",
        text: "O Memory2Care é um projeto de investigação que visa desenvolver uma intervenção digital inovadora para abordar as dificuldades de memória prospetiva no contexto do cancro.",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_contact_title",
        text: "Informações de Contacto",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_contact_university",
        text: "Universidade Portucalense",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_contact_address",
        text: "Rua Dr. António Bernardino de Almeida, 541",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_contact_city",
        text: "4200-072 Porto, Portugal",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_contact_email",
        text: "memory2care@upt.pt",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_links_title",
        text: "Links Úteis",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_funding_label",
        text: "Projeto financiado por:",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_funding_name",
        text: "Programa Gilead GÉNESE – 11.ª Edição",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_promoter_title",
        text: "Promotor",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_funding_title",
        text: "Financiamento",
        page_type: "MAIN_PAGE",
        language: "PT"
    },
    {
        element_id: "footer_copyright",
        text: "Memory2Care",
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

    console.log(`\nДонор: ✅ ${ok}  ⚠️ ${skipped}  ❌ ${failed}`);
}

seed();