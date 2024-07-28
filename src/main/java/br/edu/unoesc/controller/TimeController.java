package br.edu.unoesc.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import br.edu.unoesc.model.Time;
import br.edu.unoesc.service.TimeService;

@Controller
@RequestMapping("/time")
public class TimeController {
    @Autowired
    private TimeService timeService;

    @GetMapping("/cadastro")
    public String cadastroDeTimes(@ModelAttribute("time") Time time) {
        return "/cadastro/timeCadastro";
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvarTime(@Validated @ModelAttribute Time time, BindingResult result) {
        try {
            if (result.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            Time savedTime = timeService.salvarTime(time);
            return new ResponseEntity<>(savedTime, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace(); // Para verificar erros para fins de desenvolvimento;
            Map<String, String> error = new HashMap<>();
            // Mensagem genérica
            error.put("message", "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
