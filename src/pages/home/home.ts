import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http'
import { Formulario } from '../formulario/formulario';
import { Cliente } from '../../models/Cliente'
import { ConfiguracaoService } from '../../config/config.service';
import { ConfiguracaoMensagem } from '../../config/config.messages';

import 'rxjs/add/operator/map';

@Component({
  providers : [ ConfiguracaoService, ConfiguracaoMensagem ],
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public self = this;
  private _alert : Alert;
  public clientes : Cliente[] = [];

    constructor(public navCtrl: NavController,
                private _http: Http,
                private _loadingCtrl: LoadingController,
                private _alertCtrl: AlertController,
                public _configuracaoMensagem: ConfiguracaoMensagem,
                public _configuracaoService: ConfiguracaoService) {
    }

  ngOnInit() {
    const loader = this._loadingCtrl.create({
        content : this._configuracaoMensagem.getMensagemLoading()
    });

    loader.present();

    this._http.get(this._configuracaoService.getAdressAPI() + '/clientes')
      .map(resp => resp.json())
        .toPromise()
          .then(elemento => {
            this.clientes = elemento;
            this.inserirNomeCompletoClientes(this.clientes);
            loader.dismiss();
          }).catch (erro => {
              loader.dismiss();
              this._alertCtrl.create({
                  title : this._configuracaoMensagem.getFalhaConexaoTitulo(),
                  buttons : [{ text : "Estou ciente"}],
                  subTitle : this._configuracaoMensagem.getFalhaConexaoMensagem()
              }).present();
          });
  }

  inserirNomeCompletoClientes(clientes){
    this.clientes = clientes.map((cliente) =>{
      cliente.nomeCompleto = cliente.nome.concat(' ').concat(cliente.sobrenome);
      return cliente;
    });
  }

  confirmarOperacao(cliente) {
    this._configuracaoMensagem.confirmarOperacao(this, cliente);
  }

  remover(cliente){
    this._http.post(this._configuracaoService.getAdressAPI() + '/remover', cliente)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
          let mensagem = this.criarMensagem(200);
          mensagem.present();
        }).catch (erro => {
          let mensagem = this.criarMensagem(500);
          mensagem.present();
          console.log(erro);
        });
  }


  cadastrar(){
    this.navCtrl.push(Formulario);
  }

  criarMensagem(status){
    return this._alert = this._alertCtrl.create({
      title: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoTitulo() : this._configuracaoMensagem.getFalhaOperacaoTitulo() ,
      subTitle: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoMensagem() : this._configuracaoMensagem.getFalhaOperacaoMensagem(),
      buttons: [{
        text:'Fechar',
        handler:() => {this.navCtrl.setRoot(HomePage)}
      }]
    });
  }


}
