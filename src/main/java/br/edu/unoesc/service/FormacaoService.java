package br.edu.unoesc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.unoesc.model.Formacao;
import br.edu.unoesc.repository.FormacaoRepository;

@Service
public class FormacaoService {
    @Autowired
    private FormacaoRepository formacaoRepository;

    public Formacao salvarFormacao(Formacao formacao) {
        return formacaoRepository.save(formacao);
    }

    public List<Formacao> getAllFormacoes() {
        return formacaoRepository.findAll();
    }

    public Formacao getFormacaoById(Integer id) {
        return formacaoRepository.findById(id).orElse(null);
    }

    public boolean deletarFormacao(Integer id) {
        if (formacaoRepository.existsById(id)) {
            formacaoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
