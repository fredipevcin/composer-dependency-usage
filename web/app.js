var app = angular.module('projects', ['ngResource']);

app.controller('MainCtrl', function($scope, $http) {
    $scope.projects = [];
    $scope.dependencies = [];
    $scope.selectedDependencies = [];

    $scope.filterDependency = function(filteredObject) {
        if($scope.selectedDependencies.length === 0) {
            return true;
        }
        else if(filteredObject.dependencies) {
            var matches = 0;
            $scope.selectedDependencies.forEach(function(dependency){
                if(Object.keys(filteredObject.dependencies).indexOf(dependency) !== -1) {
                    matches++;
                }
            });
            if(matches === $scope.selectedDependencies.length) {
                return true;
            }
        }
    };

    $scope.toggleDependency = function(dependency) {
        var indexOfDependency = $scope.selectedDependencies.indexOf(dependency);

        if (indexOfDependency === -1) {
            $scope.selectedDependencies.push(dependency);
        }
        else {
            $scope.selectedDependencies.splice(indexOfDependency, 1);
        }
    }

    $scope.getClass = function(prefix, dependency) {
        return $scope.selectedDependencies.indexOf(dependency) === -1 ? prefix + "-default" : prefix + "-primary";
    }

    $http({method: 'GET', url: 'projects.json'}).
        success(function(data, status, headers, config) {
            $scope.projects = data;

            $scope.projects.forEach(function(project){
                if(project.dependencies) {
                    Object.keys(project.dependencies).forEach(function(dependency){
                        if ($scope.dependencies.indexOf(dependency) === -1) {
                            $scope.dependencies.push(dependency);
                        }
                    });
                }
            });

            window.setTimeout(function(){
                $('body').scrollspy({ target: '.nav-parent' });
            }, 1000);
        }).
        error(function(data, status, headers, config) {
            console.log("Error getting project data.");
        });
});
