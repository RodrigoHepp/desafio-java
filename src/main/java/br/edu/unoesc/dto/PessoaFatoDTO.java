package br.edu.unoesc.dto;
import br.edu.unoesc.model.Pessoa;

public class PessoaFatoDTO {
    private Pessoa pessoa;
    private String fato;

    public PessoaFatoDTO() {}

    public PessoaFatoDTO(Pessoa pessoa, String fato) {
        this.pessoa = pessoa;
        this.fato = fato;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public String getFato() {
        return fato;
    }

    public void setFato(String fato) {
        this.fato = fato;
    }
}