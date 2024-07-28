package br.edu.unoesc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.unoesc.model.Time;
import br.edu.unoesc.repository.TimeRepository;

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    public Time salvarTime(Time time) {
        return timeRepository.save(time);
    }
}
