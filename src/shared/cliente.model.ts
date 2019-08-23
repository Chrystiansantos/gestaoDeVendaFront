class Cliente {

    constructor(
        public id: string,
        //este id serve apenas para dados vindos do banco
        public _id: string,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public sexo: string,
        public numero: number,
        public cidade: string,
        public cep: string,
        public rua: string,
        public estado: string,
    ) { }
}
export { Cliente }