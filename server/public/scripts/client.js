var app = angular.module('TaskApp', []);

app.controller('TaskController', ['$http', function($http) {
    console.log('TaskController loaded');

    var self = this;

    self.newTask = {complete: false};

    self.displayArray = function() {
        $http({
            method: 'GET',
            url: '/task',
        }).then(function (response) {
            self.taskArray = response.data;
        }).catch(function (response) {
            self.taskArray = response.statusText;
        })
    };

    self.addTask = function() {
        $http({
            method: 'POST',
            url: '/task',
            data: self.newTask
        }).then(function (response) {
            console.log(response.status);
            self.displayArray();
        }).catch(function (error) {
            console.log(error);
        });
    }
    self.displayArray();
}]);