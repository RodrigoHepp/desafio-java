
$('#formacaoForm').submit(function (event) {
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

$('#formacaoForm button[type="reset"]').click(function(event) {
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
    
    $('#error-nomeCurso').removeClass("show-message").addClass("hide-message");
    $('#error-nomeCurso').find('span').remove();
    
    $('#error-nivelCurso').removeClass("show-message").addClass("hide-message");
    $('#error-nivelCurso').find('span').remove();
    
    $('#error-dataConclusao').removeClass("show-message").addClass("hide-message");
    $('#error-dataConclusao').find('span').remove();
    
    $('#error-nomeInstituicao').removeClass("show-message").addClass("hide-message");
    $('#error-nomeInstituicao').find('span').remove();
}
