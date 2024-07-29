$(document).ready(function () {

    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');

    $('#pessoaForm').on('submit', function (event) {
        var email = $('#email').val();
        if (!validarEmail(email)) {
            event.preventDefault();
            $('#error-email').text('E-mail inválido').removeClass('hide-message');
        } else {
            $('#error-email').addClass('hide-message');
        }
    });

    function validarEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

$('#pessoaForm').submit(function (event) {
    event.preventDefault();
    limparMensagens();

    var id = $('#Id').val();
  
    if (id != "" && id != undefined && id != null) {
        var confirmar = window.confirm('Deseja editar os dados?');
        if (confirmar) {
            cadastrarPessoa(this);
        } else {
            return;
        }
    } else {
        cadastrarPessoa(this); 
    }
});

$('#pessoaForm button[type="reset"]').click(function(event) {
    limparMensagens();
});

function cadastrarPessoa(form) {
    var formData = new FormData(form); 
    $.ajax({
        url: $(form).attr('action'),
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            $('#Id').val(data.id);
            $("#response-api").removeClass('hide-message').addClass("show-message")
                .append("<span class='message-success'> OK! Cadastro realizado com sucesso. </span>");
        },
        error: function (jqXHR) {
            $('#response-api').removeClass('show-message').addClass('hide-message');
            if (jqXHR.status === 400) {
                var errors = jqXHR.responseJSON;
                for (var field in errors) {
                    var errorDiv = $("#error-" + field);
                    errorDiv.removeClass("hide-message").addClass("show-message")
                        .html("<span class='text-error'>" + errors[field] + "</span>");
                }
            } else if (jqXHR.status === 500) {
                $("#response-api").removeClass('hide-message').addClass("show-message")
                    .html("<span class='message-error'>" + jqXHR.responseJSON.message + "</span>");
            } else {
                $("#response-api").removeClass('hide-message').addClass("show-message")
                    .html("<span class='message-error'>Erro desconhecido: " + jqXHR.statusText + "</span>");
            }
        }
    });
}

function limparMensagens() {
    $('#response-api').removeClass("show-message").addClass("hide-message").empty();
    $('#response-api').find('span').remove();
    
    $('#error-nome').removeClass("show-message").addClass("hide-message");
    $('#error-nome').find('span').remove();
    
    $('#error-cpf').removeClass("show-message").addClass("hide-message");
    $('#error-cpf').find('span').remove();
    
    $('#error-dataNascimento').removeClass("show-message").addClass("hide-message");
    $('#error-dataNascimento').find('span').remove();
    
    $('#error-genero').removeClass("show-message").addClass("hide-message");
    $('#error-genero').find('span').remove();
    
    $('#error-telefone').removeClass("show-message").addClass("hide-message");
    $('#error-telefone').find('span').remove();
    
    $('#error-email').removeClass("show-message").addClass("hide-message");
    $('#error-email').find('span').remove();
}