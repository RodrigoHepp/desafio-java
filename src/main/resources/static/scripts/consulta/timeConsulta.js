let table;

$(document).ready(function () {
    $(window).on('load', function() {
        $('#loadingOverlay').fadeOut();
    });
    if (table) {
        table.clear().draw();
        table.rows.add(data).draw();
        inicializarDataTable();
    } else {
        inicializarDataTable();
    }
});

function inicializarDataTable() {
    $.ajax({
        url: '/time/dados',
        cache: false,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            table = $('#tableTimes').DataTable({
                dom: "Bfrtip",
                data: response.data,
                columns: [
                    { "data": "id" },
                    { "data": "nome" },
                    { "data": "setor" }
                ],
                "language": {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
                "paging": true,
                "pageLength": 10,
                "info": true,
                "searching": true,
                initComplete: function () {
                    $('.paginate_button').addClass('custom-color-button');
                }
            });
        },
        error: function () {
            console.log("Erro ao carregar os dados!");
        }
    });
}
function isSelectedRow() {
    var trow = table.row(table.$('tr.selected'));
    return trow.data() !== undefined;
}

$("#tableTimes tbody").on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected background__selected');
        $('#excluir').prop('disabled', true);
        $('#editar').prop('disabled', true);
        $('#mural').prop('disabled', true);
    } else {
        $('#tableTimes tbody tr.selected').removeClass('selected background__selected');
        $(this).addClass('selected background__selected');
        $('#excluir').prop('disabled', false);
        $('#editar').prop('disabled', false);
        $('#mural').prop('disabled', false);
    }
});


function getId() {
    return table.row(table.$('tr.selected')).data().id;;
}

$("#editar").on('click', function () {
    if (getId()) {
        window.location.href = '/time/editar/' + getId();
    } else {
        alert('Por favor, selecione um registro para editar.');
    }
});

$("#mural").on('click', function () {
    
    if (getId()) {
        window.location.href = '/mural/exibir/' + getId();
        $('#loadingOverlay').fadeIn();
    } else {
        alert('Por favor, selecione um registro.');
    }
});



$("#excluir").on('click', function () {

    if (confirm("Tem certeza que deseja deletar o registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/time/deletar/" + getId(),
            success: function (response) {
                alert("Registro deletado com sucesso!");
                $.ajax({
                    url: '/time/dados',
                    cache: false,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
                        $('#excluir').prop('disabled', true);
                        $('#editar').prop('disabled', true);
                        if (response && response.data) {
                            table.clear().rows.add(response.data).draw();
                        } else {
                            console.error("Resposta JSON inválida ou sem dados.");
                        }
                    },
                    error: function () {
                        console.log("Erro ao carregar os dados!");
                    }
                });
            },
            error: function (xhr, status, error) {
                alert("Erro ao deletar o registro." + error);
            }
        });
    }
});