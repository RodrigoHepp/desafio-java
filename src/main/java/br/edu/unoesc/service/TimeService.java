package br.edu.unoesc.service;

import java.util.List;

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

    public List<Time> getAllTimes() {
        return timeRepository.findAll();
    }

    public Time getTimeById(Integer id) {
        return timeRepository.findById(id).orElse(null);
    }

    public boolean deletarTime(Integer id) {
        if (timeRepository.existsById(id)) {
            timeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
