// export const translations = {
//     en: {
//         nav: {
//             home: "Home",
//             about: "About",
//             team_partners: "Team and Partners",
//             news: "News",
//             contact: "Contact",
//             language : "Language",
//             account : "My Account"
//         }
//     },
//
//
//     pt: {
//         nav: {
//             home: "Início",
//                 about: "Sobre",
//                 team_partners: "Equipe e Parceiros",
//                 news: "Notícias",
//                 contact: "Contato"
//                 ,language : "Idioma",
//                 account : "A minha conta"
//         }
//     }
//
// };


export const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            team_partners: "Team and Partners",
            news: "News",
            contact: "Contact",
            language: "Language",
            account: "My Account"
        },
        common: {
            edit: "Edit",
            view: "View",
            save: "Save",
            cancel: "Cancel"
        },
        account: {
            login: "Log In",
            signup: "Sign Up",
            logout: "Log Out"
        },
        login: {
            username: "Username",
            password: "Password",
            submit: "Submit",
            username_required: "Please input your username!",
            password_required: "Please input your password!",
            caregiver_pending: "Your account is awaiting confirmation",
            patient_inactive: "Your account has been deactivated"
        },
        signup: {
            role: "Role",
            patient: "Patient",
            caregiver: "Caregiver",
            email: "Email",
            password: "Password",
            password_placeholder: "input password",
            name: "Name",
            address: "Address",
            phone: "Phone",
            diagnosis: "Diagnosis",
            birth_date: "Birth Date",
            submit: "Submit",

            email_required: "Please input your email!",
            password_required: "Please input your password!",
            name_required: "Please input your name!",
            address_required: "Please input your address!",
            phone_required: "Please input your phone!",
            diagnosis_required: "Please input your diagnosis!",
            birth_date_required: "Please select birth date!"
        },
        caregiver: {
                menu: {
                    about: "About",
                    patient: "Patient",
                    search: "Search",
                    task: "Task",
                    calendar: "Calendar",
                    history: "History",
                    create_new: "Create new"
                },
            select: {
                family_member: "Family Member",
                informal_caretaker: "Informal Caretaker",
                medical_caretaker: "Medical Caretaker",
                low: "Low",
                medium: "Medium",
                high: "High"
            },
            form: {
                patient_id: "Patient ID",
                anon_name: "Name",
                relationship: "Relationship",
                support_level: "Support Level",
                approx_age: "Approximate Age",
                anon_name_required: "Name is required",
                relationship_required: "Relationship is required",
                support_level_required: "Support level is required",
                approx_age_required: "Approximate age is required",
                add_patient: "Add Patient",
                cancel: "Cancel",
                patient_code:     "Patient Code",
                assignment_date:  "Assignment Date",
                pc_id:            "Record ID",

            },
            messages: {
                patient_added: "Patient successfully added",
            },
            deactivate:       "Deactivate",
            deactivate_title: "Deactivate patient",
            deactivate_desc:  "Are you sure you want to deactivate this patient?",
            deactivate_ok:    "Yes",
            deactivate_cancel:"No",
            deactivated:      "Patient deactivated",
            updated:          "Patient updated successfully",
            select_patient:   "Seleсt a patient from the list"
        },
        patient: {
                patient_code: "Patient code"
        },
        task: {
            type:                    "Task Type",
            normal:                  "Normal",
            recurrent:               "Recurrent",
            select_patient:          "Select patient",
            task_type:               "Task Type",
            select_task_type:        "Select task type",
            description:             "Description",
            execution_date:          "Execution Date",
            time_range:              "Time",
            start_date:              "Start Date",
            end_date:                "End Date",
            recurrence_type:         "Recurrence",
            every_days:              "Every (days)",
            every_weekday:           "Every weekday",
            recur_every_week:        "Every (weeks)",
            day_of_week:             "Days of week",
            day_of_month:            "Day of month",
            every_months:            "Every (months)",
            sunday: "Sunday", monday: "Monday", tuesday: "Tuesday",
            wednesday: "Wednesday", thursday: "Thursday",
            friday: "Friday", saturday: "Saturday",
            // required messages
            pc_id_required:           "Please select a patient",
            task_type_required:       "Please select a task type",
            description_required:     "Please enter a description",
            execution_date_required:  "Please select an execution date",
            time_range_required:      "Please select a time range",
            start_date_required:      "Please select a start date",
            end_date_required:        "Please select an end date",
            every_days_required:      "Please enter interval in days",
            recur_every_week_required:"Please enter interval in weeks",
            day_of_week_required:     "Please select at least one day",
            day_of_month_required:    "Please enter day of month",
            every_months_required:    "Please enter interval in months",
            created: "Task created successfully"
        },


    },
    pt: {
        nav: {
            home: "Início",
            about: "Sobre",
            team_partners: "Equipe e Parceiros",
            news: "Notícias",
            contact: "Contato",
            language: "Idioma",
            account: "A minha conta"
        },
        common: {
            edit: "Editar",
            view: "Visualizar",
            save: "Guardar",
            cancel: "Cancelar"
        },
        account: {
            login: "Entrar",
            signup: "Registrar",
            logout: "Sair"
        },
        login: {
            username: "Nome de usuário",
            password: "Senha",
            submit: "Enviar",
            username_required: "Por favor, insira seu nome de usuário!",
            password_required: "Por favor, insira sua senha!",
            caregiver_pending: "Sua conta está aguardando confirmação.",
            patient_inactive: "Sua conta foi desativada.",


        },
        signup: {
            role: "Função",
            patient: "Paciente",
            caregiver: "Cuidador",
            email: "Email",
            password: "Senha",
            password_placeholder: "insira a senha",
            name: "Nome",
            address: "Endereço",
            phone: "Telefone",
            diagnosis: "Diagnóstico",
            birth_date: "Data de nascimento",
            submit: "Enviar",

            email_required: "Insira o email!",
            password_required: "Insira a senha!",
            name_required: "Insira o nome!",
            address_required: "Insira o endereço!",
            phone_required: "Insira o telefone!",
            diagnosis_required: "Insira o diagnóstico!",
            birth_date_required: "Selecione a data de nascimento!"
        },
        caregiver: {
            menu: {
                about: "Sobre",
                patient: "Paciente",
                search: "Pesquisar",
                task: "Tarefa",
                calendar: "Calendário",
                history: "Histórico",
                create_new: "Criar novo"
            },
            select: {
                family_member: "Familiar",
                informal_caretaker: "Cuidador Informal",
                medical_caretaker: "Cuidador Médico",
                low: "Baixo",
                medium: "Médio",
                high: "Alto"
            },
            form: {
                patient_id: "ID do Paciente",
                anon_name: "Nome",
                relationship: "Relacionamento",
                support_level: "Nível de Suporte",
                approx_age: "Idade Aproximada",
                anon_name_required: "Nome é obrigatório",
                relationship_required: "Relacionamento é obrigatório",
                support_level_required: "Nível de suporte é obrigatório",
                approx_age_required: "Idade aproximada é obrigatória",
                add_patient: "Adicionar Paciente",
                cancel: "Cancelar",
                patient_code:     "Código do Paciente",
                assignment_date:  "Data de Atribuição",
                pc_id:            "ID do Registo",
            },
            messages: {
                patient_added: "Paciente adicionado com sucesso",
            },
            deactivate:       "Desativar",
            deactivate_title: "Desativar paciente",
            deactivate_desc:  "Tem certeza que deseja desativar este paciente?",
            deactivate_ok:    "Sim",
            deactivate_cancel:"Não",
            deactivated:      "Paciente desativado",
            updated:          "Paciente atualizado com sucesso",
            select_patient:   "Selecione um paciente da lista",

        },
        patient: {
                patient_code: "Сódigo do paciente"
            },
        task: {
            type:                    "Tipo de Tarefa",
            normal:                  "Normal",
            recurrent:               "Recorrente",
            select_patient:          "Selecionar paciente",
            task_type:               "Tipo de Tarefa",
            select_task_type:        "Selecionar tipo de tarefa",
            description:             "Descrição",
            execution_date:          "Data de Execução",
            time_range:              "Horário",
            start_date:              "Data de Início",
            end_date:                "Data de Fim",
            recurrence_type:         "Recorrência",
            every_days:              "A cada (dias)",
            every_weekday:           "Todos os dias úteis",
            recur_every_week:        "A cada (semanas)",
            day_of_week:             "Dias da semana",
            day_of_month:            "Dia do mês",
            every_months:            "A cada (meses)",
            sunday: "Domingo", monday: "Segunda", tuesday: "Terça",
            wednesday: "Quarta", thursday: "Quinta",
            friday: "Sexta", saturday: "Sábado",
            pc_id_required:           "Selecione um paciente",
            task_type_required:       "Selecione um tipo de tarefa",
            description_required:     "Insira uma descrição",
            execution_date_required:  "Selecione a data de execução",
            time_range_required:      "Selecione o intervalo de tempo",
            start_date_required:      "Selecione a data de início",
            end_date_required:        "Selecione a data de fim",
            every_days_required:      "Insira o intervalo em dias",
            recur_every_week_required:"Insira o intervalo em semanas",
            day_of_week_required:     "Selecione pelo menos um dia",
            day_of_month_required:    "Insira o dia do mês",
            every_months_required:    "Insira o intervalo em meses",
            created: "Tarefa criada com sucesso"
        },

    }
};