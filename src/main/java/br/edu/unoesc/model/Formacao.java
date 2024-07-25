package br.edu.unoesc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Formacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nomeCurso;
    private String nivelCurso;
    private Integer dataConclusao;
    private String nomeInstituicao;

    @ManyToOne
    @JoinColumn(name = "pessoaId", nullable = false)
    private Pessoa pessoa;

    public Formacao() {
    }

    public Formacao(String nomeCurso, String nivelCurso, Integer dataConclusao, String nomeInstituicao) {
        this.nomeCurso = nomeCurso;
        this.nivelCurso = nivelCurso;
        this.dataConclusao = dataConclusao;
        this.nomeInstituicao = nomeInstituicao;
    }

    public String getNomeCurso() {
        return nomeCurso;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }

    public String getNivelCurso() {
        return nivelCurso;
    }

    public void setNivelCurso(String nivelCurso) {
        this.nivelCurso = nivelCurso;
    }

    public Integer getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(Integer dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public String getNomeInstituicao() {
        return nomeInstituicao;
    }

    public void setNomeInstituicao(String nomeInstituicao) {
        this.nomeInstituicao = nomeInstituicao;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

}
