package br.edu.unoesc.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.edu.unoesc.dto.PessoaFatoDTO;
import br.edu.unoesc.model.Pessoa;
import br.edu.unoesc.service.TimeService;

@Controller
@RequestMapping("/mural")
public class MuralController {

    @Autowired
    private TimeService timeService;

    private final String urlApi = "https://uselessfacts.jsph.pl/api/v2/facts/random?Accept=application/json";

    @GetMapping("/exibir/{id}")
    public String mostrarMural(@PathVariable("id") Integer id, Model model) {
        List<Pessoa> pessoas = timeService.getTimeById(id).getPessoas();
        List<PessoaFatoDTO> fatos = new ArrayList<>();
        pessoas.forEach(p -> {
            try {
                HttpClient client = HttpClient.newHttpClient();
                String[] headerAPI = { "Accept", "application/json"};
                HttpRequest request = HttpRequest.newBuilder().headers(headerAPI)
                        .uri(URI.create(urlApi))
                        .build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                ObjectMapper mapper = new ObjectMapper();
                String fato = mapper.readTree(response.body()).path("text").asText();
                fatos.add(new PessoaFatoDTO(p, fato));
            } catch (Exception e) {
                fatos.add(new PessoaFatoDTO(p, "Fato padrão"));
            }
        });
        model.addAttribute("pessoaFatos", fatos);
        return "pages/mural";
    }
}
