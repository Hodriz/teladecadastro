import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  cliente= new Cliente();

  btnCadastro=true;

  tabela:boolean = true;

  clientes:Cliente[]=[];

  constructor(private servico:ClienteService){}
 

  select():void {
    this.servico.select()
    .subscribe(retorno => this.clientes=retorno);  }

    cadastrar():void {
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => {
        
        this.clientes.push(retorno);
        this.cliente = new Cliente();

        alert("Clientee cadasstrado com sucesso!");
      
      });
    }

    selecionarCliente(posicao:number):void{

      this.cliente = this.clientes[posicao];

      this.btnCadastro = false;

      this.tabela=false;

    }

    editar():void{

      this.servico.editar(this.cliente)
      .subscribe(retorno =>{

        let posicao = this.clientes.findIndex(obj =>{
          return obj.id == retorno.id;
        });

        this.clientes[posicao] = retorno;

        this.cliente= new Cliente();

        this.btnCadastro = true;

        this.tabela=true;

        alert("Cliente alterado")
      })
    }

    excluir():void{

      this.servico.excluir(this.cliente.id)
      .subscribe(retorno =>{

        let posicao = this.clientes.findIndex(obj =>{
          return obj.id == this.cliente.id;
        });

        this.clientes.splice(posicao, 1);

        this.cliente= new Cliente();

        this.btnCadastro = true;

        this.tabela=true;

        alert("Cliente removido")
      })
    }

    cancelar(): void{

        this.cliente= new Cliente();

        this.btnCadastro = true;

        this.tabela=true;
    }
    
    ngOnInit(): void {
      this.select();
    }

}




