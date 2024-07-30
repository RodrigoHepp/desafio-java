$('#timeForm').submit(function (event) {
    event.preventDefault();
    limparMensagens();

    var id = $('#Id').val();
  
    if (id != "" && id != undefined && id != null) {
        var confirmar = window.confirm('Deseja editar os dados?');
        if (confirmar) {
            cadastrarTime(this);
        } else {
            return;
        }
    } else {
        cadastrarTime(this); 
    }
});

$('#timeForm button[type="reset"]').click(function(event) {
    limparMensagens();
});

function cadastrarTime(form) {
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
            if (jqXHR.status === 400) {
                var errors = jqXHR.responseJSON;
                for (var field in errors) {
                    var errorDiv = $("#error-" + field);
                    errorDiv.removeClass("hide-message").addClass("show-message")
                        .append("<span class='text-error'>" + errors[field] + "</span>");
                }
            } else {
                $("#response-api").removeClass('hide-message').addClass("show-message")
                    .append("<span class='message-error'>" + jqXHR.responseJSON.message + "</span>");
            }
        }
    });
}

function limparMensagens() {
    $('#response-api').removeClass("show-message").addClass("hide-message").empty();
    $('#response-api').find('span').remove();
    $('#error-nome').removeClass("show-message").addClass("hide-message");
    $('#error-nome').find('span').remove();
    $('#error-setor').removeClass("show-message").addClass("hide-message");
    $('#error-setor').find('span').remove();
}
