export class ConfiguracaoService {
    public _API : string;
  
    constructor(){
      this._API = 'http://localhost:8080';
    }
  
    getAdressAPI() : String{
      return this._API;
    }
  }
  