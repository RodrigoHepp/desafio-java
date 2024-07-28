$('#timeForm').submit(function (event) {
    event.preventDefault();

    limparMensagens();

    var formData = new FormData(this);

    $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: formData,
        success: function (data) {
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
});

function limparMensagens() {
    $('#response-api').removeClass("show-message").addClass("hide-message").empty();
    $('#response-api').find('span').remove();
    $('#error-nome').removeClass("show-message").addClass("hide-message");
    $('#error-nome').find('span').remove();
    $('#error-setor').removeClass("show-message").addClass("hide-message");
    $('#error-setor').find('span').remove();
}