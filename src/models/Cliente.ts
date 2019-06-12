export class Cliente{
    nome: String;
    sobrenome : String;
    email: String;
    data_nascimento: Date;
    celular : number;
    telefone_fixo : String;
    sexo : String;
    img: string;

    constructor(){

    }

    verificarCamposObrigatorios(objeto){
      debugger
      if(!objeto.nome || !objeto.sobrenome  || !objeto.celular || !objeto.email
        || !objeto.data_nascimento || !objeto.sexo){
          return false;
      }else{
          return true;
      }
    }

  }
