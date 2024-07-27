package br.edu.unoesc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.unoesc.model.Time;

public interface TimeRepository extends JpaRepository<Time, Integer> {

    
}