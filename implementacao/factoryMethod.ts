// Padrão Criacional — Factory Method

// 1. Interface e Classe Base

interface Material {
    visualizar(): void;
}

abstract class MaterialBase implements Material {
    private id: number;
    private nome: string;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    protected getId(): number {
        return this.id;
    }

    protected getNome(): string {
        return this.nome;
    }

    public abstract visualizar(): void;
}

// 2. Produtos Concretos

class MaterialPDF extends MaterialBase {
    private tamanhoMB: number;

    constructor(id: number, nome: string, tamanhoMB: number) {
        super(id, nome);
        this.tamanhoMB = tamanhoMB;
    }

    public visualizar(): void {
        console.log(
            `[PDF] Abrindo visualizador para "${this.getNome()}" ` +
            `(id=${this.getId()}, ${this.tamanhoMB} MB)...`
        );
    }
}

class MaterialVideo extends MaterialBase {
    private url: string;

    constructor(id: number, nome: string, url: string) {
        super(id, nome);
        this.url = url;
    }

    public visualizar(): void {
        console.log(
            `[VIDEO] Carregando player para "${this.getNome()}" ` +
            `(id=${this.getId()}) a partir de ${this.url}...`
        );
    }
}

// 3. Factory Method

abstract class MaterialFactory {
    public abstract criarMaterial(
        id: number,
        nome: string,
        extraData: any
    ): Material;

    public processarNovoMaterial(
        id: number,
        nome: string,
        extraData: any
    ): void {
        const material = this.criarMaterial(id, nome, extraData);
        console.log(
            `[DB] Salvando material "${nome}" (id=${id}) no banco de dados...`
        );
        material.visualizar();
    }
}

class PDFFactory extends MaterialFactory {
    public criarMaterial(
        id: number,
        nome: string,
        extraData: { tamanhoMB: number }
    ): Material {
        return new MaterialPDF(id, nome, extraData.tamanhoMB);
    }
}

class VideoFactory extends MaterialFactory {
    public criarMaterial(
        id: number,
        nome: string,
        extraData: { url: string }
    ): Material {
        return new MaterialVideo(id, nome, extraData.url);
    }
}

// 4. Bloco de execução

const pdfFactory: MaterialFactory = new PDFFactory();
const videoFactory: MaterialFactory = new VideoFactory();

console.log('=== Processando novo material PDF ===');
pdfFactory.processarNovoMaterial(
    1,
    'Apostila de Arquitetura de Software',
    { tamanhoMB: 4.7 }
);

console.log('\n=== Processando novo material Vídeo ===');
videoFactory.processarNovoMaterial(
    2,
    'Aula sobre Padrões GoF Criacionais',
    { url: 'https://cdn.organizeseugrupo.com/videos/gof-criacionais.mp4' }
);

export {};
