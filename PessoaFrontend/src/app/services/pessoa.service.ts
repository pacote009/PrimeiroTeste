import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private apiUrl = 'http://localhost:5210/api/pessoas';
  private pessoaAdicionadaSource = new Subject<void>();
  pessoaAdicionada$ = this.pessoaAdicionadaSource.asObservable();

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPessoa(pessoa: any): Observable<any> {
    return this.http.post<any>('http://localhost:5210/api/pessoas', pessoa).pipe(
      tap(() => {
        this.pessoaAdicionadaSource.next();
      })
    );
  }

  deletePessoa(id: number): Observable<void> {  // ✅ Criando método deletePessoa
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePessoa(pessoa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pessoa.id}`, pessoa);
  }

}
