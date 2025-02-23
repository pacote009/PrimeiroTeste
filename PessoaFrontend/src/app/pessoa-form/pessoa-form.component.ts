import { Component, EventEmitter, Output } from '@angular/core';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent {
  @Output() pessoaAdicionada = new EventEmitter<void>(); // Evento para atualizar a lista automaticamente

  novaPessoa = {
    nome: '',
    idade: null,
    estadoCivil: '',
    cpf: '',
    cidade: '',
    estado: ''
  };

  estadosCivis: string[] = ['Solteiro', 'Casado', 'Viúvo', 'Divorciado', 'Separado']; // Lista suspensa

  validarCPF(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault(); // Impede a entrada de caracteres inválidos
    }
  }
  estadosBrasil = [
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' }
  ];

  constructor(private pessoaService: PessoaService) {}

  addPessoa(): void {
    if (!this.novaPessoa.nome || !this.novaPessoa.idade) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    this.pessoaService.addPessoa(this.novaPessoa).subscribe(() => {
      console.log("Pessoa adicionada com sucesso!");
      this.pessoaAdicionada.emit(); // Dispara evento para atualizar a tabela
      this.novaPessoa = { // Limpa o formulário após adicionar
        nome: '',
        idade: null,
        estadoCivil: '',
        cpf: '',
        cidade: '',
        estado: ''
      };
    });
  }
}
