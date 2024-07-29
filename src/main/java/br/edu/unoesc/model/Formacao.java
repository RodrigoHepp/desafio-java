package br.edu.unoesc.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "formacoes")
public class Formacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "O nome do curso é obrigatório")
    @Column(name = "nome_curso")
    private String nomeCurso;

    @NotBlank(message = "O nivel é obrigatório")
    @Column(name = "nivel_curso")
    private String nivelCurso;

    @Column(name = "data_conclusao")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataConclusao;

    @NotBlank(message = "O nome da Instituição é obrigatório")
    @Column(name = "nome_Instituicao")
    private String nomeInstituicao;

    @ManyToOne
    @JoinColumn(name = "pessoa_Id", nullable = false)
    @JsonBackReference
    private Pessoa pessoa;

    public Formacao() {
    }

    public Formacao(String nomeCurso, String nivelCurso, Date dataConclusao, String nomeInstituicao) {
        this.nomeCurso = nomeCurso;
        this.nivelCurso = nivelCurso;
        this.dataConclusao = dataConclusao;
        this.nomeInstituicao = nomeInstituicao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(Date dataConclusao) {
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
