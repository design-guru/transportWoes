      
      var vehicles = [ "Boat", "Tractor", "Plane", "Train", "Car", "Helicopter", "Taxi" ];

      function displayVehicles() {

        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var displayDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var caps = rating.toUpperCase();

            var p = $("<p>").text("Rating: " + caps);

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.addClass("state-change");
            topicImage.attr("state", "still");
            topicImage.attr("still-data", results[i].images.fixed_height_still.url);
            topicImage.attr("animated-data", results[i].images.fixed_height.url);

            displayDiv.prepend(topicImage);
            displayDiv.prepend(p);

            $("#lineup-gif").prepend(displayDiv);

            $(".state-change").unbind("click");
            $(".state-change").on("click", function(){
            if($(this).attr("state") === "still") {
              $(this).attr("state", "animated");
              $(this).attr("src", $(this).attr("animated-data"));
            }   
            else {
              $(this).attr("state", "still");
              $(this).attr("src", $(this).attr("still-data"));
            }
          });

          displayButtons();

        }});
      }

      function displayButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < vehicles.length; i++) {

          var a = $("<button>");

          a.addClass("vehicle");

          a.attr("data-topic", vehicles[i]);

          a.text(vehicles[i]);

          $("#buttons-view").append(a);
        }
      }

      $("#add-vehicle").on("click", function(event) {
        event.preventDefault();

        var vehicle = $("#vehicle-input").val().trim();

        vehicles.push(vehicle);
        console.log(vehicles)

        displayButtons();
      });

      $(document).on("click", ".vehicle", displayVehicles);
      
      $("#buttons-view").empty();
      
      displayButtons();