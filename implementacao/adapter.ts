// Padrão Estrutural — Adapter

// 0. Entidade de domínio

class Reuniao {
    public titulo: string;
    public dataInicio: Date;
    public dataFim: Date;

    constructor(titulo: string, dataInicio: Date, dataFim: Date) {
        this.titulo = titulo;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}

// 1. Target Interface

interface ProvedorAgenda {
    agendar(reuniao: Reuniao): boolean;
}

// 2. Adaptee — <<External>>

class GoogleCalendarAPI {
    public insertEvent(eventDetails: any): boolean {
        console.log(
            '[GoogleCalendarAPI] POST /calendar/v3/events ->',
            JSON.stringify(eventDetails)
        );
        return true;
    }
}

// 3. Adapter

class GoogleCalendarAdapter implements ProvedorAgenda {
    private googleApi: GoogleCalendarAPI;

    constructor() {
        this.googleApi = new GoogleCalendarAPI();
    }

    public agendar(reuniao: Reuniao): boolean {
        const eventDetails = {
            summary: reuniao.titulo,
            start: { dateTime: reuniao.dataInicio.toISOString() },
            end: { dateTime: reuniao.dataFim.toISOString() },
        };

        return this.googleApi.insertEvent(eventDetails);
    }
}

// 4. Client

class ReuniaoService {
    private provedorAgenda: ProvedorAgenda;

    constructor(provedorAgenda: ProvedorAgenda) {
        this.provedorAgenda = provedorAgenda;
    }

    public criarReuniaoNoGrupo(reuniao: Reuniao): boolean {
        console.log(
            `[DB] Salvando reunião "${reuniao.titulo}" no banco de dados local...`
        );
        return this.provedorAgenda.agendar(reuniao);
    }
}

// 5. Bloco de execução

const adapter: ProvedorAgenda = new GoogleCalendarAdapter();
const reuniaoService = new ReuniaoService(adapter);

const reuniao = new Reuniao(
    'Sprint Planning — Organize Seu Grupo',
    new Date('2026-05-15T14:00:00.000Z'),
    new Date('2026-05-15T15:30:00.000Z')
);

console.log('=== Criando reunião no grupo ===');
const sucesso = reuniaoService.criarReuniaoNoGrupo(reuniao);
console.log(`Resultado do agendamento: ${sucesso ? 'OK' : 'FALHOU'}`);

export {};
