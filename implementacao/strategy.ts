// Padrão Comportamental — Strategy

// 0. Entidade de domínio

class Atividade {
    public id: number;
    public titulo: string;
    public materia: string;
    public tags: string[];

    constructor(id: number, titulo: string, materia: string, tags: string[]) {
        this.id = id;
        this.titulo = titulo;
        this.materia = materia;
        this.tags = tags;
    }
}

// 1. Strategy Interface

interface FiltroStrategy {
    filtrar(atividades: Atividade[], termoBusca: string): Atividade[];
}

// 2. Estratégias Concretas

class FiltroPorMateria implements FiltroStrategy {
    public filtrar(atividades: Atividade[], termoBusca: string): Atividade[] {
        const termo = termoBusca.toLowerCase();
        return atividades.filter(
            (a) => a.materia.toLowerCase() === termo
        );
    }
}

class FiltroPorPalavraChave implements FiltroStrategy {
    public filtrar(atividades: Atividade[], termoBusca: string): Atividade[] {
        const termo = termoBusca.toLowerCase();
        return atividades.filter(
            (a) => a.titulo.toLowerCase().includes(termo)
        );
    }
}

class FiltroPorTag implements FiltroStrategy {
    public filtrar(atividades: Atividade[], termoBusca: string): Atividade[] {
        const termo = termoBusca.toLowerCase();
        return atividades.filter((a) =>
            a.tags.some((tag) => tag.toLowerCase() === termo)
        );
    }
}

// 3. Context

class BuscadorDeAtividades {
    private estrategia: FiltroStrategy;

    constructor(estrategia: FiltroStrategy) {
        this.estrategia = estrategia;
    }

    public setEstrategia(estrategia: FiltroStrategy): void {
        this.estrategia = estrategia;
    }

    public buscar(atividades: Atividade[], termoBusca: string): Atividade[] {
        return this.estrategia.filtrar(atividades, termoBusca);
    }
}

// 4. Bloco de execução

const atividades: Atividade[] = [
    new Atividade(1, 'Trabalho de Arquitetura — Diagrama UML', 'Arquitetura', ['uml', 'grupo']),
    new Atividade(2, 'Prova de Cálculo III',                    'Cálculo',     ['prova', 'individual']),
    new Atividade(3, 'Lista de Exercícios de Arquitetura',      'Arquitetura', ['lista', 'individual']),
    new Atividade(4, 'Apresentação em grupo de Banco de Dados', 'Banco',       ['apresentacao', 'grupo']),
];

const formatar = (lista: Atividade[]): string =>
    lista.map((a) => `#${a.id} ${a.titulo}`).join(' | ') || '(nenhuma)';

const buscador = new BuscadorDeAtividades(new FiltroPorMateria());

console.log('=== Estratégia: FiltroPorMateria | termo="Arquitetura" ===');
console.log(formatar(buscador.buscar(atividades, 'Arquitetura')));

buscador.setEstrategia(new FiltroPorPalavraChave());
console.log('\n=== Estratégia: FiltroPorPalavraChave | termo="prova" ===');
console.log(formatar(buscador.buscar(atividades, 'prova')));

buscador.setEstrategia(new FiltroPorTag());
console.log('\n=== Estratégia: FiltroPorTag | termo="grupo" ===');
console.log(formatar(buscador.buscar(atividades, 'grupo')));

export {};
