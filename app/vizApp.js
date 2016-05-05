var app = angular.module('vizApp', ['ngRoute']);
// Services
app.factory("services", ['$http', function($http) {
    var serviceBase = 'services/'
    var obj = {};
    obj.getProcesses = function(){
        var req = {
            method: 'GET',
            // Use this if you setup a host for the file base
            //url: 'http://www.vizexplorer.local.com/data/data.json'
            url: 'https://api.myjson.com/bins/29f0j'
        }
        return $http(req);
    }
    obj.saveProcesses = function(){
        // TO DO save the process details to database.
    }
    return obj;
}]);


// Controllers.
app.controller('indexCtrl', function ($scope,services) {
    services.getProcesses().then(function(data){
        $scope.Processes = data.data;

    });
    // addprocess button function
    $scope.addprocess = function(){
        var processWrapper = angular.element( document.querySelector('#process-overview-dashboard'));
        $scope.pc=angular.element(document.getElementById('process-overview-dashboard'));
        var processCount = $scope.pc.children().length + 1;

        var newProcesHtml = '<div class="col-md-4">'+
                                 '<div class="box box-success box-solid">'+
                                        '<div class="box-header with-border">'+
                                            '<h3 class="box-title"><span class="process-header-title">Process </span>' + processCount+ '</h3>'+
                                            '<div class="box-tools pull-right">'+
                                            '<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>'+
                                            '</div><!-- /.box-tools -->'+
                                        '</div><!-- /.box-header -->'+
                                        '<div class="box-body">'+
                                            '<div class="process-info-box">'+
                                                '<div class="process-meter">'+
                                                    '<div class="process-widget-title">CPU %</div>'+
                                                    '<div class="process-widget-body">73</div>'+
                                                '</div>'+
                                                '<div class="process-graph"></div>'+
                                            '</div>'+
                                            '<div class="process-info-widget-box">'+
                                                '<div class="process-status border-right">'+
                                                    '<div class="process-widget-title">Status</div>'+
                                                    '<div class="process-widget-body green">On</div>'+
                                                '</div>'+
                                                '<div class="process-instance border-right">'+
                                                    '<div class="process-widget-title">Instances</div>'+
                                                    '<div class="process-widget-body">4</div>'+
                                                '</div>'+
                                                '<div class="process-memory border-right">'+
                                                    '<div class="process-widget-title">Memory MB</div>'+
                                                    '<div class="process-widget-body">' +
                                                        '<div class="c100 p25 small">' +
                                                            '<span>25</span>' +
                                                            '<div class="slice">' +
                                                                '<div class="bar"></div>' +
                                                                '<div class="fill"></div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                '</div>'+
                                                '</div>'+
                                                '<div class="process-uptime border-right">'+
                                                    '<div class="process-widget-title">Up Time</div>'+
                                                    '<div class="process-widget-body digital-fire">3:24:51</div>'+
                                                '</div>'+
                                                '<div class="process-restart">'+
                                                    '<div class="process-widget-title">Restarts</div>'+
                                                    '<div class="process-widget-body">0</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div><!-- /.box-body -->'+
                                 '</div><!-- /.box -->'+
                              '</div>';

        processWrapper.append(newProcesHtml)
    }
});

// Routes.
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                title: 'Dashboard',
                templateUrl: 'templates/dashboard.html',
                controller: 'indexCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);