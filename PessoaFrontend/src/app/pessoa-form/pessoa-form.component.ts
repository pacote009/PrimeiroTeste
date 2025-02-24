import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { PessoaService } from '../services/pessoa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
})
export class PessoaFormComponent {
  pessoaForm: FormGroup;
  isEdit: boolean;
  brazilStates: any;
  maritalStatuses: any;

  validarCPF(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault(); // Impede a entrada de caracteres inválidos
    }
  }

  constructor(
    private pessoaService: PessoaService,
    public dialogRef: MatDialogRef<PessoaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.brazilStates = this.pessoaService.getAllStates();
    this.maritalStatuses = this.pessoaService.getMaritalStatuses();

    this.isEdit = data.isEdit;

    this.pessoaForm = this.fb.group({
      id: [data.pessoa ? data.pessoa.id : null],
      nome: [data.pessoa ? data.pessoa.nome : '', Validators.required],
      idade: [data.pessoa ? data.pessoa.idade : '', Validators.required],
      estadoCivil: [data.pessoa ? data.pessoa.estadoCivil : ''],
      cpf: [data.pessoa ? data.pessoa.cpf : '', Validators.required],
      cidade: [data.pessoa ? data.pessoa.cidade : ''],
      estado: [data.pessoa ? data.pessoa.estado : ''],
    });
  }

  save() {
    if (this.pessoaForm.valid) {
      let pessoaData = this.pessoaForm.value;
      if (!this.isEdit) {
        delete pessoaData.id;
      }

      this.dialogRef.close(this.pessoaForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
