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
        if (self.newTask.complete) {
            self.newTask.name = '✅ ' + self.newTask.name;
        }
        $http({
            method: 'POST',
            url: '/task',
            data: self.newTask
        }).then(function (response) {
            console.log(response.status);
            self.displayArray();
            self.newTask = {complete: false};
        }).catch(function (error) {
            console.log(error);
        });
    };

    self.taskCompleted = function(task) {
        task.complete = true;
        task.name = '✅ ' + task.name; // this works for me, but is this bad code?
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

        
    };

    self.deleteTask = function(task) {
        if (confirm('Really? Or are you just lazy?')) {
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
    };

    self.trueToCompleted = function(bool) {
        if (bool) {
            return 'completed';
        }
        else {
            return 'not';
        }
    }

    self.displayArray();
}]);