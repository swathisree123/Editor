var app = angular.module("app",[])
      app.controller("controller",function ($scope,$http,$log,$window,$location) {
          $scope.data={}
          $scope.send = function(){
                      $window.clear()
                      if($scope.data.extension == "html" ||  $scope.data.extension == "js")
                          $window.location.href = "saketh.html"
                        else if($scope.data.file && $scope.data.extension){
                     $scope.data.FileData = $window.data;
                     $http({  method: 'POST',
                         url: "http://127.0.0.1:1235/"+$scope.data.extension+".js",
                        data:$scope.data
                      })
                     .then(function successCallback(response) {
                            $window.a(response.data)
                      }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                            $window.a(response.data)
                    });
                  }
                  else
                  {
                    alert("fill all")
                  }
          }
      })


 window.a = function(data){
  if(data.error)
  document.getElementById("error").innerHTML = data.error.replace(/\n/g, "<br />");
  if(data.output)
   document.getElementById("output").innerHTML = data.output.replace(/\n/g, "<br />");

}
window.clear = function()
{
  document.getElementById("error").innerHTML = ""
  document.getElementById("output").innerHTML = ""
}