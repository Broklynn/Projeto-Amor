app.controller('mainController', function($scope, $timeout) {
    // COLOQUE AQUI A DATA DE INÍCIO DO NAMORO
    // Exemplo: 7 de Fevereiro de 2023 (Mês 1)
    $scope.finalDate = new Date(2023, 1, 7);

    countdown.setLabels(
    '| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
    '| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
    ' e ', ', ', '',
    function(n) { return n.toString(); });

    $scope.onTimeout = function() {
        // O countdown calcula do finalDate até o momento AGORA (null)
        $scope.days = countdown($scope.finalDate, null).toString();
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.showMessage = false;
    $scope.showMessageBox = function() {
        $scope.showMessage = true;
    };
});