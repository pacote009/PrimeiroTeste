namespace PessoaAPI.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public int Idade { get; set; }
        public required string EstadoCivil { get; set; }
        public required string CPF { get; set; }
        public required string Cidade { get; set; }
        public required string Estado { get; set; }
    }
}