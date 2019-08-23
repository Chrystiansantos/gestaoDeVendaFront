class Produto {
    constructor(
        public _id: string = null,
        public codigo: string,
        public marca: string,
        public modelo: string,
        public cor: string,
        public preco: number,
        public tamanho: string,
        public qtd: number,
        public descricao: string,

    ) { }
}
export { Produto }