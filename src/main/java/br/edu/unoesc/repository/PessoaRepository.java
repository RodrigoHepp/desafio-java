package br.edu.unoesc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.unoesc.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa,Integer>{
    
}
