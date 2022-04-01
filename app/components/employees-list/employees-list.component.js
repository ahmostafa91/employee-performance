// import Vue from 'vue';
// import 'ngVue';
// import 'ngVue/build/plugins.js';
// import EmployeesListComponent from '../vue-components/employees-list.vue';

angular
  .module('appModule')
  .component('employeesList', {
    templateUrl: 'components/employees-list/employees-list.html',
    controller: EmployeesListComponent,
    controllerAs: 'EmployeesListComponentVm',
    bindings: {
      employeesList: '<',
    },
  });

function EmployeesListComponent($scope) {
  $scope.test = '';
  $scope.$parent.$watch('userInput', (newValue) => {
    $scope.test = newValue;
  });
}

// angular.module('appModule').directive('vEmployeesList', (createVueComponent) => {
//   return createVueComponent(Vue.component('employeesListComponent', EmployeesListComponent));
// });
