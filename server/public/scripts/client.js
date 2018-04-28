var app = angular.module('TaskApp', []);

app.controller('TaskController', ['$http', function($http) {
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

    self.taskCompleted = function(task) {
        task.complete = true;
        $http({
            method: 'PUT',
            url: '/task',
            data: task
        }).then(function (response) {
            console.log(response.status);
            self.displayArray();
        }).catch(function (error) {
            console.log(error);
        });

        
    }
    self.deleteTask = function(task) {
        $http({
            method: 'DELETE',
            url: '/task',
            params: task
        }).then(function (response) {
            console.log(response.status);
            self.displayArray();
        }).catch(function (error) {
            console.log(error);
        });
    }
    self.displayArray();
}]);