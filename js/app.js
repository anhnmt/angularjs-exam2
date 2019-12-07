var app = angular.module('app', ['ngRoute']);
var user_login = sessionStorage.getItem('user_login') ? angular.fromJson(sessionStorage.getItem('user_login')) : [];
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "./page/home.html"
        });
});

app.controller('mainCtrl', function($scope, $location, $http) {
    var data_url = "./data/students.json";

    $http.get(data_url).then(function(response) {
        $scope.students = response.data;
    });

    $scope.xem = function(student) {
        $scope.dt = student;
        $("#modal-show").modal();
    };

    $scope.check_mark = function() {
        $scope.code = $scope.code ? $scope.code.toUpperCase() : "";

        var checkCode = $scope.students.find(function(value) {
            return value.code === $scope.code;
        });

        // console.log(checkCode);

        if (checkCode) {
            $scope.student_mark = checkCode;
            $scope.avg_m = Math.ceil((checkCode.mark_html + checkCode.mark_ajs + checkCode.mark_dwhcj) / 3);
        } else {
            alert("Thông tin sinh viên này không tồn tại");
		}

		$scope.code = "";
    };

})