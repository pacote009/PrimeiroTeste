import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<any>('http://localhost:5210/api/pessoas', pessoa);
  }

  deletePessoa(id: number): Observable<void> {  // ✅ Criando método deletePessoa
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePessoa(pessoa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pessoa.id}`, pessoa);
  }

}
