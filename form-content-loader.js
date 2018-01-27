$(document).ready(function() {});

var totalLines = 1; // current count of lines entered
var maxLines = 6; // maximum allowed entries

// Row of HTML content for creating new lines
var newGroup =
  '<div class="group"><div class="cell">Department<br><input type="text" name="dept" placeholder="Department Name"></div><div class="cell">Board Style<br><select class="board-type"><option value="none">Board Style</option><option value="white">White Boards</option><option value="safety">Safety Boards</option><option value="digital">Digital Boards</option></select></div></div>';

var deleteButtonDiv =
  '<div class="cell delete-div"><br><button class="delete-button">x</button></div>';

// markup content for each board type to be loaded when selected
var whiteSet =
  '<div class="cell cell-w">Quantity<br><input type="text" name="quantity" placeholder="qty"></div><div class="cell cell-w">Frame Size<br><select class="w-frame-size"><option value="w-frame-size1">22 x 28</option><option value="w-frame-size2">24 x 30</option><option value="w-frame-size3">24 x 36</option><option value="w-frame-size4">30 x 40</option></select></div></div><div class="cell cell-w">Frame Style<br><select class="w-frame-style"><option value="w-frame-style1">Style 1</option><option value="w-frame-style2">Style 2</option><option value="w-frame-style3">Style 3</option><option value="w-frame-style4">Style 4</option></select></div><div class="cell cell-w">Alternate Languages<br><input type="text" name="lang" placeholder="other languages if any"></div>';
var safetySet =
  '<div class="cell cell-s">Quantity<br><input type="text" name="quantity" placeholder="qty"></div><div class="cell cell-s">Fields for Safety Boards Only<br><input type="text" name="tbd" placeholder="To Be Implemented"></div>';
var digitalSet =
  '<div class="cell cell-d">Quantity<br><input type="text" name="quantity" placeholder="qty"></div><div class="cell cell-d">Fields for Digital Boards Only<br><input type="text" name="tbd" placeholder="To Be Added"></div>';

makeAddLineWork(); // Event listener call. Run after new entry
countLines();
changeBoardType(); // Event listener call initialization

function addLine() {
  if (totalLines < maxLines) {
    $("#container").append(newGroup);
  }
  makeDeleteWork();
  changeBoardType();
}

// Count Lines and display count
function countLines() {
  totalLines = $("#container .group").length;
  $("#total-lines").html(totalLines);
  $("#max-lines").html(maxLines);
}

// EVENT LISTENERS
function makeAddLineWork() {
  $("#add-line").click(function() {
    addLine();
    countLines();
  });
}
function makeDeleteWork() {
  $(".delete-button").click(function() {
    $(this)
      .parent()
      .parent()
      .remove();
    countLines();
  });
}
// Loads content based on Board Type selected
function changeBoardType() {
  $(".board-type")
    .off()
    .change(function() {
      if ($(this).val() == "white") {
        var line = $(this)
          .parent()
          .parent();
        line.addClass("white").removeClass("safety digital");
        line
          .append(whiteSet)
          .children(".delete-div, .cell-s, .cell-d")
          .remove();
        line.append(deleteButtonDiv);
        makeDeleteWork();
      } else if ($(this).val() == "safety") {
        var line = $(this)
          .parent()
          .parent();
        line.addClass("safety").removeClass("white digital");
        line
          .append(safetySet)
          .children(".delete-div, .cell-w, .cell-d")
          .remove();
        line.append(deleteButtonDiv);
        makeDeleteWork();
      } else if ($(this).val() == "digital") {
        var line = $(this)
          .parent()
          .parent();
        line.addClass("digital").removeClass("safety white");
        line
          .append(digitalSet)
          .children(".delete-div, .cell-w, .cell-s")
          .remove();
        line.append(deleteButtonDiv);
        makeDeleteWork();
      } else {
        var line = $(this)
          .parent()
          .parent();
        line.removeClass("safety white digital");
        line.children(".cell-d, .cell-w, .cell-s").remove();
      }
    });
}
