package br.edu.unoesc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.edu.unoesc.model.Formacao;
import br.edu.unoesc.model.Pessoa;
import br.edu.unoesc.model.Time;
import br.edu.unoesc.service.FormacaoService;
import br.edu.unoesc.service.PessoaService;
import br.edu.unoesc.service.TimeService;

@Controller
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private TimeService timeService;
    @Autowired
    private FormacaoService formacaoService;
    @GetMapping("/cadastro")
    public String cadastroDePessoas(@ModelAttribute("pessoa") Pessoa pessoa, Model model) {
        List<Time> times = timeService.getAllTimes();
        model.addAttribute("times", times);
        return "/cadastro/pessoaCadastro";
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvarPessoa(@Validated @ModelAttribute Pessoa pessoa, BindingResult result) {
        try {
            if (result.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }
    
            Pessoa savedPessoa = pessoaService.salvarPessoa(pessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPessoa);
    
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/consulta")
    public String consultaDePessoas(@ModelAttribute("pessoa") Pessoa pessoa) {
        return "/consulta/pessoaConsulta";
    }

    @GetMapping("/dados")
    public ResponseEntity<Map<String, Object>> listarPessoas() throws JsonProcessingException {
        List<Pessoa> pessoas = pessoaService.getAllPessoas();
        Map<String, Object> response = new HashMap<>();
        response.put("data", pessoas);
        System.out.println("Resposta JSON: " + new ObjectMapper().writeValueAsString(response));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/editar/{id}")
    public String consultaDePessoa(@PathVariable("id") Integer id, Model model) {
        Pessoa pessoa = pessoaService.getPessoaById(id);
        List<Time> times = timeService.getAllTimes();
        model.addAttribute("pessoa", pessoa);
        model.addAttribute("times", times);
        return "/cadastro/pessoaCadastro";
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarPessoa(@PathVariable("id") Integer id) {
        try {
            boolean isRemoved = pessoaService.deletarPessoa(id);
            if (!isRemoved) {
                return new ResponseEntity<>("Registro não encontrado.", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Registro deletado com sucesso.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/consultaPorID/{id}")
    public ResponseEntity<Map<String, Object>> listarTime(@PathVariable("id") Integer id) {
        Formacao formacao = formacaoService.getFormacaoById(id);
        Pessoa pessoa = pessoaService.getPessoaById(formacao.getPessoa().getId());
        Map<String, Object> response = new HashMap<>();
        response.put("data", pessoa);
        return new ResponseEntity<>(response , HttpStatus.OK);
    }
}
