import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Cliente } from '../../models/Cliente';
import { ConfiguracaoService } from '../../config/config.service';
import { ConfiguracaoMensagem } from '../../config/config.messages';
import { Http } from '@angular/http';


@Component({
    providers : [Cliente, ConfiguracaoService, ConfiguracaoMensagem],
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class Formulario implements OnInit{

  public cliente : Cliente = new Cliente;

  myColor: string;
  isRound: boolean;
  loader : any;
  private _alert : Alert;
  public nomeValido: boolean  = false;

  constructor(public parametro : NavParams,
      public _navController : NavController,
      public _alertCtrl : AlertController,
      private _loadingCtrl: LoadingController,
      public _http: Http,
      public _configuracaoMensagem: ConfiguracaoMensagem,
      public _configuracaoService: ConfiguracaoService){

  }

  ngOnInit(){
    this.myColor = 'search-buttom';
    this.isRound = false;

    this.loader = this._loadingCtrl.create({
        content : "Salvando o cliente, aguarde"
    });
  }

  salvar(){
    if(this.cliente.verificarCamposObrigatorios(this.cliente)){
            this.loader.present();
            this._http.post(this._configuracaoService.getAdressAPI() + '/salvar', this.cliente)
              .toPromise().then(elemento => {
                let mensagem = this.criarMensagem(200);
                mensagem.present();
                this.loader.dismiss();
            }).catch (erro => {
              this.loader.dismiss();
              this._alertCtrl.create({
                  title : this._configuracaoMensagem.getFalhaOperacaoTitulo(),
                  buttons : [{ text : "Estou ciente", handler:() => {this._navController.setRoot(HomePage)}}],
                  subTitle : this._configuracaoMensagem.getFalhaOperacaoMensagem()
              }).present();
            });
    }else{
        this._configuracaoMensagem.mostrarMensagemCamposObrigatorios(this);

        let array = this.getCamposVazios();

        this.limparCorCampos();

        array.forEach(element => {
            element.setAttribute("style", "color: #f53d3d");
        });
    }
  }

  getCamposVazios(){
    let arr : any = [];

    if(!this.cliente.celular)
        arr.push(document.querySelector('#celular'));

    if(!this.cliente.email)
        arr.push(document.querySelector('#email'));

    if(!this.cliente.sexo)
        arr.push(document.querySelector('#sexo'));

    if(!this.cliente.data_nascimento)
        arr.push(document.querySelector('#data_nascimento'));

     return arr;
  }

  limparCorCampos(){
    document.querySelector('#celular').setAttribute("style", "color: #0084b4");
    document.querySelector('#email').setAttribute("style", "color: #0084b4");
    document.querySelector('#sexo').setAttribute("style", "color:#0084b4");
    document.querySelector('#data_nascimento').setAttribute("style", "color:#0084b4");
  }

  criarMensagem(status){
    return this._alert = this._alertCtrl.create({
      title: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoTitulo() : this._configuracaoMensagem.getFalhaOperacaoTitulo() ,
      subTitle: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoMensagem() : this._configuracaoMensagem.getFalhaOperacaoMensagem(),
      buttons: [{
        text:'Fechar',
        handler:() => {this._navController.setRoot(HomePage)}
      }]
    });
  }

  verificarDuplicidadeNome(){

    if(!this.cliente.nome && !this.cliente.sobrenome) {
      this._alertCtrl.create({
        title : 'Dados vazios',
        buttons : [{ text : "Entendi"}],
        subTitle : 'Por favor, informe o nome'
      }).present();
    }else{
        const loader = this._loadingCtrl.create({
          content : "Verificando nome, aguarde"
        });

      loader.present();

      this._http.get(this._configuracaoService.getAdressAPI() + `/verificaDuplicidadeNome?nome=${this.cliente.nome}&sobrenome=${this.cliente.sobrenome}`)
      .map(resp => resp.json())
        .toPromise()
          .then(elemento => {
            loader.dismiss();

            if (typeof elemento == 'undefined' || elemento.length == 0) {
              this.nomeValido = true;
            }else{
              this._alertCtrl.create(
              {
                title : 'Nome Existente',
                buttons : [{ text : "Tudo bem"}],
                subTitle : 'Verificamos e, já existe um cliente com esse nome'
              }).present();
            }

          }).catch (erro => {
            loader.dismiss();
            this._alertCtrl.create(
              {
                title : 'Erro',
                buttons : [{ text : "Tudo bem", handler : () => {this._navController.setRoot(HomePage)} }],
                subTitle : 'Houve um erro ao consultar o nome, tente mais tarde'
              }
            ).present();
          });
    }
  }
}
