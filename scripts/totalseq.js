
$(function(){


// check if local storage is available
  if(typeof(Storage) !== "undefined") {
      console.log("local storage enabled");
  } else {
      alert("Sorry your browser does not support this application");
      console.log("no storage support");
  }


// create panel menu for check area
  var buildMenu = function(){

    var createMenuItem = function($container, ref, color, title, backgroundImg){
      var $menuItem = $('<a href="#' + ref + '"></a>');

      var $menuDiv = $('<div>');
      $menuDiv.addClass('menuItem');
      $menuDiv.css("background-image", "url('" + backgroundImg + "')");

      var $menuTitle = $('<span>');
      $menuTitle.text(title);
      $menuTitle.fitText(1, { minFontSize: '15px', maxFontSize: '40px' });

      $menuDiv.append($menuTitle);
      $menuItem.append($menuDiv);
      $container.append($menuItem);
    };
    
    for (var area in refMatrix){
      createMenuItem ($('#check'), refMatrix[area].ref, refMatrix[area].color, refMatrix[area].title, refMatrix[area].picture);
    }

  };

  buildMenu();


// create station area map
  var createStationAreaMap = function(ref, src, areas){
    var $mainDiv = $('<div id="' + ref +'" class="container" style="font-size:xx-large;position:relative;">');
    var $img = $('<img src="' + src + '" width="100%">');
    $mainDiv.append($img);

    for (var area in areas){
      var $area = $('<a href="#' + areas[area]["ref"] + '">');
      $area.append(
        '<svg width="' + areas[area]["width"] + '" '
        + 'height="' + areas[area]["height"] + '" '
        + 'style="left:'+ areas[area]["left"] + ';'
        + 'top:' + areas[area]["bottom"] + ';'
        + 'position:absolute"><rect class="arearect" width="100%" height="100%" ></svg>');
      $mainDiv.append($area);
    }

    $('#content').append($mainDiv);
  };

  for (var control in refMatrix){
    createStationAreaMap(refMatrix[control]["ref"], refMatrix[control]["picture"], refMatrix[control]["areas"]);
  }


// create pictures section
    var createFotoSection = function(ref, picturesObj ){
      var $mainDiv = $('<div id="' + ref +'" class="container" style="font-size:xx-large;"></div>');

      for (var pic in picturesObj){
        var $pictureDiv = $('<div id="' + pic + '" class="imgControl good"></div>');
        $pictureDiv.append($('<img src="' + picturesObj[pic] + '" width="100%">'));

        if (picturesObj[pic].charAt(picturesObj[pic].length-6)==='b') {
          $pictureDiv.addClass('bad');
          $pictureDiv.append('<i class="fa fa-warning emoticon" ></i>');
          // $pictureDiv.append($('<i class="fa-frown-o" ></i>'));
        } else {
          $pictureDiv.addClass('good');
          $pictureDiv.append('<i class="fa fa-check-square emoticon"></i>');
          // $pictureDiv.append($('<i class="fa-smile-o"></i>'));
        }
        $mainDiv.append($pictureDiv);
      }

      $('#content').append($mainDiv);

    };

    for (var station in refMatrix){
      for (var area in refMatrix[station]["areas"]){
        createFotoSection(area,refMatrix[station]["areas"][area]["images"]);
      }
    }


//end of document ready
});


