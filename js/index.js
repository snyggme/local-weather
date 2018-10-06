$(document).ready(function() {
  var url = "https://api.openweathermap.org/data/2.5/weather?";
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var lat = Math.round(position.coords.latitude * 1000) / 1000;
      var lon = Math.round(position.coords.longitude * 1000) / 1000;
 
      url += "lat=" + lat + "&lon=" + lon + "&APPID=c6b45fb85023e29f73a1dd872ff8f09e";
        
      $.ajax( {
         url: url,
         success: function(json) {
           var date = new Date(json.dt * 1000);      
           var minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
           $("#data").html("<h3>" + json.name + ", " + json.sys.country + "</h3><p>" +  weekday[date.getDay()] + " " + date.getHours() + ":" + minutes + "</p><p>" + json.weather[0].description + "</p>");
            
           $("#temperature").html(json.main.temp - 273.15);
           
           $("#weather-img").attr("src", function() {
             return "https://github.com/snyggme/m3-solution/blob/master/site/weather_api/" + json.weather[0].icon + ".png?raw=true";
           });
         },
         cache: false
      });
 
    });
  } else {
    $("#data").html("<b>Couldnt get your coordinates, please, dont block pop-up window!</b>");
  }
  
  $("#metric").click("on", function(){
    var selfv = $(this);
    
    if (selfv.data('clickable'))
      return;

    selfv.data('clickable', true);
    
    $("#temp-background").animate({
      left: "10px"
    }, 300);
    
    var temp = +$("#temperature").html();
    
    temp = Math.round((temp - 32) * 5 / 9 * 10) / 10;   
    $("#temperature").html(temp);
    
    $("#imperial").data('clickable', false);
  });
  
  $("#imperial").click("on", function(){
    var selfv = $(this);
    
    if (selfv.data('clickable'))
      return;
    
    selfv.data('clickable', true);
    
    $("#temp-background").animate({
      left: "95px"
    }, 300);
    
    var temp = +$("#temperature").html();
 
    temp = Math.round((temp * 9 / 5 + 32) * 10) / 10;
    $("#temperature").html(temp);
    
    $("#metric").data('clickable', false);
  });
  
});