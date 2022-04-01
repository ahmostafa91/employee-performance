angular
  .module('appModule')
  .controller('homeController', homePageController)
  .filter('highlight', function ($sce) {
    return function (text, phrase) {
      if (phrase) text = text.replace(new RegExp(phrase, 'gi'), '((' + phrase.toUpperCase() + '))');
      // '<span class="highlighted">' + phrase + '</span>')

      return $sce.trustAsHtml(text);
    };
  });

function homePageController(Employees, $location, $scope) {
  const homePageVm = this;
  // console.log($scope);

  homePageVm.employees = [];
  $scope.userInput = $location.search().filter ? $location.search().filter : '';
  activate();
  $scope.$watch(function () { return $location.search(); }, function (params) {
    $scope.userInput = params.filter;
  });
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
  $scope.$watch('userInput', (newValue) => {
    $location.search('filter', newValue);
  });
}
