import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private apiUrl = 'http://localhost:5210/api/pessoas';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPessoa(pessoa: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:5210/api/pessoas', pessoa)
      .pipe(
        catchError((error) => {
          console.error('Erro ao adicionar pessoa:', error.error); // ✅ Mostra erro detalhado
          return throwError(error);
        })
      );
  }

  deletePessoa(id: number): Observable<void> {
    // ✅ Criando método deletePessoa
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePessoa(pessoa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pessoa.id}`, pessoa);
  }

  getAllStates() {
    return [
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
      { nome: 'Tocantins', sigla: 'TO' },
    ];
  }

  getMaritalStatuses() {
    return [
      { value: 'Solteiro', label: 'Solteiro' },
      { value: 'Casado', label: 'Casado' },
      { value: 'Viúvo', label: 'Viúvo' },
      { value: 'Divorciado', label: 'Divorciado' },
      { value: 'Separado', label: 'Separado' },
    ];
  }
}
