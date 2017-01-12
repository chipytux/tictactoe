/* global $ */
/* global ga */

var fim_partida = false;
var vez = 0;
var xwon = 0;
var owon = 0;

//--------------------------TRATAMENTO DE EVENTOS-----------------------------------   


$(document).ready(function() {
    iniciarPartida();

    $(".CELULA").click(function() { //TRATA CLIQUES NO TABULEIRO
        if ($(this).hasClass('O') || $(this).hasClass('X') || fim_partida) {
            return 0;
        } //VERIFICA SE CELULA JÁ FOI JOGADA
        else {
            if (vez % 2 === 0) { //
                $(this).addClass('X'); //
                $(this).attr('valor', 1); //
                vez++; //
            } //
            else { // VERIFICA SE VEZ DE X OU 0
                $(this).addClass('O'); //
                $(this).attr('valor', 2); //
                vez++; //
            } //
        }
        verificarVitoria(); //VERIFICA SE HOUVE VENCEDOR APÓS CADA JOGADA
    });

    $("#LIMPAR").click(function() { //TRATA CLIQUE DO BOTÃO START GAME
        iniciarPartida(); //RECONFIGURA O TABULEIRO
    });

    analytics(); //GOOGLE ANALYTICS
});

//--------------------------CONFIGURA O TABULEIRO PARA O INICIO DA PARTIDA-----------------------------------   

function iniciarPartida() {
    $("#XWON").html(xwon); //ATUALIZA PLACAR
    $("#OWON").html(owon); //
    $(".CELULA").stop(true, true).fadeIn(0); //PARA TODAS ANIMAÇÕES
    $(".CELULA").removeClass('X').removeClass('O'); //REMOVE CLASSE CSS X DE TODAS AS CELULAS
    $(".CELULA").attr('valor', 0); //ZERA VALOR DE TODAS AS CELULAS
    vez = 0;
    fim_partida = false;
}

//-------------------------VERIFICA SE ALGUM JOGADOR VENCEU------------------------------------   


function verificarVitoria() {
    var tab = calculoTabuleiro();
    console.log("TABULEIRO", tab);
    switch (tab[0]) {
        case 1:
            $('#resultado').html('X ganhou');
            console.log('XWON')
            fim_partida = true;
            fadeIt(tab[1], tab[2], tab[3]);
            xwon++;
            $("#XWON").html(xwon);
            break;
        case 2:
            $('#resultado').html('0 ganhou');
            console.log('OWON')
            fim_partida = true;
            fadeIt(tab[1], tab[2], tab[3]);
            owon++;
            $("#OWON").html(owon);
            break;
        case 0:
            $('#resultado').html('Nunhum ganhador');
            break;
    }
}

//----------------------CALCULA VALORES DAS LINHAS COLUNAS E DIAGONAIS---------------------------------------

function calculoTabuleiro() {
    var array = [
        [$('#A1'), $('#A2'), $('#A3')],
        [$('#B1'), $('#B2'), $('#B3')],
        [$('#C1'), $('#C2'), $('#C3')]
    ];
    var valores = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9]
    ];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            valores[i][j] = array[i][j].attr('valor');
        }
    }
    console.log(valores[0]);
    console.log(valores[1]);
    console.log(valores[2]);
    console.log();
    //HORIZONTAL
    for (var i = 0; i < 3; i++) {
        var v1 = array[i][0];
        var v2 = array[i][1];
        var v3 = array[i][2];
        var horizontal = v1.attr('valor') * v2.attr('valor') * v3.attr('valor');
        if (horizontal === 8) return [2, v1, v2, v3];
        if (horizontal === 1) return [1, v1, v2, v3];
    }

    //VERTICAL
    for (var i = 0; i < 3; i++) {
        var v1 = array[0][i]
        var v2 = array[1][i]
        var v3 = array[2][i]
        var vertical = v1.attr('valor') * v2.attr('valor') * v3.attr('valor');
        if (vertical === 8) return [2, v1, v2, v3];
        if (vertical === 1) return [1, v1, v2, v3];
    }

    //DIAGONAL
    var v1 = array[0][0];
    var v2 = array[1][1];
    var v3 = array[2][2];
    var diagonal = v1.attr('valor') * v2.attr('valor') * v3.attr('valor');
    if (diagonal === 8) return [2, v1, v2, v3];
    if (diagonal === 1) return [1, v1, v2, v3];

    v1 = array[0][2];
    v2 = array[1][1];
    v3 = array[2][0];
    var diagonal = v1.attr('valor') * v2.attr('valor') * v3.attr('valor');
    if (diagonal === 8) return [2, v1, v2, v3];
    if (diagonal === 1) return [1, v1, v2, v3];

    else return [0];
}
//-------------------------------------------------------------
function fadeIt(v1, v2, v3) {
    for (var i = 0; i < 20; i++) {
        v1.fadeOut('fast').fadeIn('fast');
        v2.fadeOut('fast').fadeIn('fast');
        v3.fadeOut('fast').fadeIn('fast');
    }
}

//-------------------------------------------------------------
//--------------------GOOGLE ANALYTICS-----------------------------------------


function analytics() {
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-86842053-1', 'auto');
    ga('send', 'pageview');
}

//-------------------------------------------------------------
