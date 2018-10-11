/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* ------------------------------Plugins JQuery------------------------------ */
jQuery(function ($) {

    $('.mailcheck').blur(function () {
        var domains = ['hotmail.com', 'hotmail.com.br', 'gmail.com', 'hotmail.fr', 'uol.com', 'live.com', 'live.fr'];
        var input = $(this);
        input.mailcheck({
            domains: domains,
            suggested: function (element, suggestion) {
                input.next('span').remove();
                $('<span class="help-inline"/>').insertAfter(input).append('Você quis dizer: <a href="#">' + suggestion.full + '</a>').find('a').click(function (e) {
                    e.preventDefault();
                    input.val($(this).text());
                    input.trigger('blur');
                });
                parent.addClass('warning');
            },
            empty: function (element) {
                input.next('span').remove();
                parent.removeClass('warning');
            }
        });
    });



    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#form',

        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#form';
                }
            }
        }
    });
});



/* -------------------------------JavaScripts------------------------------- */
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}

function menuTopo(oi) {
    if (oi.scrollTop() >= $('#logo').height()) {
        $('#menuNav').addClass('navbar-fixed-top');
    } else {
        $('#menuNav').removeClass('navbar-fixed-top');
    }
}

function validarForm(form) {
    if (!validarNome(form.nome))
        alert("Preencha seu nome corretamente.");

    if (!validarEmail(form.email))
        alert("Preencha seu email corretamente.");

    if (!validarMensagem(form.mensagem))
        alert("preencha sua mensagem.");

    if (validarNome(form.nome) && validarEmail(form.email) && validarMensagem(form.mensagem))
        return true;
    else
        return false;
}

function validarNome(nome) {
    if (nome.value === "" || nome.value.length < 3 || nome.value === null)
    {
        $('#nome').addClass('alert-danger');
        nome.focus();
        return false;
    } else {
        $('#nome').removeClass('alert-danger');
        return true;
    }
}

function validarEmail(email) {
    if (email.value === "" || email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        $('#email').addClass('alert-danger');
        email.focus();
        return false;
    } else {
        $('#email').removeClass('alert-danger');
        return true;
    }
}

function validarMensagem(msg) {
    if (msg.value === "" || msg.value === null)
    {
        $('#mensagem').addClass('alert-danger');
        msg.focus();
        return false;
    } else {
        $('#mensagem').removeClass('alert-danger');
        return true;
    }
}



var app = angular.module("contato", []);
app.controller("msgcontroller", function ($scope, $http) {
    $scope.enviarMensagem = function () {
        $http.post(
                "insert.php",
                {'nome': $scope.nome, 'email': $scope.email, 'mensagem': $scope.mensagem}
        ).success(function (data) {
            alert(data);
            $scope.nome = null;
            $scope.email = null;
            $scope.mensagem = null;
            $scope.mostrarMensagem();
        });
    }
    $scope.mostrarMensagem = function () {
        $http.get("select.php").success(function (data) {
            $scope.mensagens = data;
        });
    }
});
