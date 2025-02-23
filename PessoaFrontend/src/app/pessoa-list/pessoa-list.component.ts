import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})

export class PessoaListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'idade', 'estadoCivil', 'cpf', 'cidade', 'estado', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.loadPessoas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  loadPessoas(): void {
    this.pessoaService.getPessoas().subscribe(data => {
      console.log("Lista de pessoas atualizada:", data);
      this.dataSource = new MatTableDataSource(data || []); // Garante que os dados são reatribuídos corretamente
      this.dataSource.paginator = this.paginator; // Mantém paginação funcionando
    });
  }

  deletePessoa(id: number): void {
    this.pessoaService.deletePessoa(id).subscribe(() => this.loadPessoas());
  }
  editPessoa(pessoa: any): void {
    const estadosCivisPermitidos = ["Solteiro", "Casado", "Viúvo", "Divorciado", "Separado"];
    const estadosPermitidos = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
      "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const cpfRegex = /^[0-9]{11}$/; // Apenas 11 números

    const novoNome = prompt("Digite o novo nome:", pessoa.nome);
    const novaIdade = prompt("Digite a nova idade:", pessoa.idade);
    const novoEstadoCivil = prompt(
      `Digite o novo estado civil (${estadosCivisPermitidos.join(", ")}):`,
      pessoa.estadoCivil
    );
    const novoCpf = prompt("Digite o novo CPF (apenas números):", pessoa.cpf);
    const novaCidade = prompt("Digite a nova cidade:", pessoa.cidade);
    const novoEstado = prompt(
      `Digite o novo estado (sigla, ex: RJ, SP, MG):`,
      pessoa.estado
    );


    // Verifica se os valores não estão vazios e se são válidos
    if (novoNome !== null && novoNome.trim() !== "" &&
        novaIdade !== null && novaIdade.trim() !== "" &&
        novaCidade !== null && novaCidade.trim() !== "" &&
        novoEstado !== null && estadosPermitidos.includes(novoEstado.toUpperCase()) &&
        novoEstadoCivil !== null && estadosCivisPermitidos.includes(novoEstadoCivil) &&
        novoCpf !== null && cpfRegex.test(novoCpf)) { // Valida o CPF

      const pessoaAtualizada = {
        ...pessoa,
        nome: novoNome,
        idade: parseInt(novaIdade, 10),
        estadoCivil: novoEstadoCivil,
        cidade: novaCidade,
        estado: novoEstado.toUpperCase(),
        cpf: novoCpf
      };

      this.pessoaService.updatePessoa(pessoaAtualizada).subscribe(() => {
        this.loadPessoas();
        console.log("Pessoa editada com sucesso!");
      });
    } else {
      alert("Dados inválidos! Verifique o Estado Civil, Estado e CPF (11 números).");
    }
  }

}
