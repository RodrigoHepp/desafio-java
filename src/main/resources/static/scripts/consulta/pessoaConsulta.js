var table;

$(document).ready(function () {
    if (table) {
        table.clear().draw();
        table.rows.add(data).draw();
        atualizarTimes();
    } else {
        inicializarDataTable();
    }
});

function inicializarDataTable() {
    $.ajax({
        url: '/pessoa/dados',
        cache: false,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            table = $('#tablePessoas').DataTable({
                dom: "Bfrtip",
                data: response.data,
                columns: [
                    { "data": "id" },
                    { "data": "nome" },
                    { "data": "cpf" },
                    {
                        data: 'dataNascimento',
                        render: function (data, type, row) {
                            return formatarData(data);
                        }
                    },
                    { "data": "genero" },
                    { "data": "telefone" },
                    { "data": "email" },
                    { "data": "time", "defaultContent": "Carregando..." }
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
            atualizarTimes();
        },
        error: function () {
            console.log("Erro ao carregar os dados!");
        }
    });
}

function atualizarTimes() {
    table.rows().every(function() {
        const row = this;
        const id = row.data().id;
        
        $.ajax({
            url: '/time/consultaPorID/' + id,
            cache: false,
            type: 'GET',
            contentType: 'application/json',
            success: function (responseTime) {
                const timeHtml = "<span>" + (responseTime.data.nome || 'N/A') + "</span><br>"
                    + "<span>" + (responseTime.data.setor || 'N/A') + "</span><br>";
                const cell = $(row.node()).find('td').eq(7);
                cell.html(timeHtml);
            },
            error: function () {
                const cell = $(row.node()).find('td').eq(7);
                cell.html("<span>Não foi possível carregar o Time</span><br>");
            }
        });
    });
}

function isSelectedRow() {
    var trow = table.row(table.$('tr.selected'));
    return trow.data() !== undefined;
}

$("#tablePessoas tbody").on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected background__selected');
        $('#excluir').prop('disabled', true);
        $('#editar').prop('disabled', true);
    } else {
        $('#tablePessoas tbody tr.selected').removeClass('selected background__selected');
        $(this).addClass('selected background__selected');
        $('#excluir').prop('disabled', false);
        $('#editar').prop('disabled', false);
    }
});

function getId() {
    return table.row(table.$('tr.selected')).data().id;
}

$("#editar").on('click', function () {
    if (getId()) {
        window.location.href = '/pessoa/editar/' + getId();
    } else {
        alert('Por favor, selecione um registro para editar.');
    }
});

$("#excluir").on('click', function () {
    if (confirm("Tem certeza que deseja deletar o registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/pessoa/deletar/" + getId(),
            success: function (response) {
                alert("Registro deletado com sucesso!");
                $.ajax({
                    url: '/pessoa/dados',
                    cache: false,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
                        $('#excluir').prop('disabled', true);
                        $('#editar').prop('disabled', true);
                        if (response && response.data) {
                            table.clear().rows.add(response.data).draw();
                            atualizarTimes(); 
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

function formatarData(dataString) {
    var data = new Date(dataString);

    var dia = String(data.getUTCDate()).padStart(2, '0');
    var mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    var ano = data.getUTCFullYear();

    return dia + "/" + mes + "/" + ano;
}
