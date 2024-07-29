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
@RequestMapping("/formacao")
public class FormacaoController {

    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private FormacaoService formacaoService;

    @GetMapping("/cadastro")
    public String cadastroDeFormacao(@ModelAttribute("formacao") Formacao formacao, Model model) {
        List<Pessoa> pessoas = pessoaService.getAllPessoas();
        model.addAttribute("pessoas", pessoas);
        return "/cadastro/formacaoCadastro";
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvarFormacao(@Validated @ModelAttribute Formacao formacao, BindingResult result) {
        try {
            if (result.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }
            Pessoa pessoa = pessoaService.getPessoaById(formacao.getPessoa().getId());
            formacao.setPessoa(pessoa);
            Formacao savedFormacao = formacaoService.salvarFormacao(formacao);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedFormacao);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/consulta")
    public String consultaDeFormacao(@ModelAttribute("formacao") Formacao formacao) {
        return "/consulta/formacaoConsulta";
    }

    @GetMapping("/dados")
    public ResponseEntity<Map<String, Object>> listarFormacao() throws JsonProcessingException {
        List<Formacao> formacao = formacaoService.getAllFormacoes();
        Map<String, Object> response = new HashMap<>();
        response.put("data", formacao);
        System.out.println("Resposta JSON: " + new ObjectMapper().writeValueAsString(response));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/editar/{id}")
    public String consultaDeFormacao(@PathVariable("id") Integer id, Model model) {
        Formacao formacao = formacaoService.getFormacaoById(id);
        List<Pessoa> pessoas = pessoaService.getAllPessoas();
        model.addAttribute("formacao", formacao);
        model.addAttribute("pessoas", pessoas);
        return "/cadastro/formacaoCadastro";
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarFormacao(@PathVariable("id") Integer id) {
        try {
            boolean isRemoved = formacaoService.deletarFormacao(id);
            if (!isRemoved) {
                return new ResponseEntity<>("Registro não encontrado.", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Registro deletado com sucesso.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
