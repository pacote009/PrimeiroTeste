import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PessoaService } from '../services/pessoa.service';
import { PessoaFormComponent } from '../pessoa-form/pessoa-form.component';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  estadoCivil: string;
  cpf: string;
  cidade: string;
  estado: string;
}

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css'],
})
export class PessoaListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'idade',
    'estadoCivil',
    'cpf',
    'cidade',
    'estado',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Pessoa>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pessoaService: PessoaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Recupera os dados do serviço
  loadData(): void {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.dataSource.data = data.reverse(); // Ordena do último para o primeiro
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '500px',
      data: { pessoa: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: Pessoa) => {
      if (result) {
        this.pessoaService.addPessoa(result).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  openEditModal(pessoa: Pessoa): void {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '500px',
      data: { pessoa: pessoa, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pessoaService.updatePessoa(result).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
