package br.edu.unoesc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.unoesc.model.Formacao;

public interface FormacaoRepository extends JpaRepository<Formacao, Integer> {
    
}
