$(document).ready(function () {
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');
});

$('#pessoaForm').on('submit', function (event) {
    event.preventDefault();
    limparMensagens();
    var email = $('#email').val();
    var cpf = $('#cpf').val();
    if (validarCpf(cpf)) {
        $('#error-cpf').addClass('hide-message');
        if (!validarEmail(email)) {
            $('#error-email').removeClass("hide-message").addClass("show-message")
            .html("<span class='text-error'>E-mail Inválido</span>");
        } else {
            $('#error-email').addClass('hide-message');
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
        }
    } else {
        $('#error-cpf').removeClass("hide-message").addClass("show-message")
        .html("<span class='text-error'>CPF Inválido</span>");
    }

});
function validarEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

$('#pessoaForm button[type="reset"]').click(function (event) {
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

function validarCpf(cpfStr) {
    var cpf = cpfStr.replace(/[.-]/g, '');
    if (cpf == "00000000000") return false;
    if (cpf.length != 11) return false;

    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}