(function() {

  var names;
  var namesPresent;
  var selectionDuration;
  var elapsedTime;
  var counter;
  var counterIncrementer;
  var listContainer;
  var checkboxContainer;
  var submitBtn;

  names = ['Eric', 'Tal', 'Nick L', 'Arcy', 'Keelan', 'Pat', 'Chris', 'Forest', 'Ken', 'Shawn', 'Nick DY', 'Randall', 'Tim'];

  submitBtn = document.getElementById('submit-list');
  listContainer = document.getElementById('name-container-list');
  checkboxContainer = document.getElementById('checkbox-container');

  submitBtn.addEventListener('click', getPresentNames, false);

  function init() {
    var startingIndex;

    startingIndex = Math.floor(Math.random() * listContainer.children.length);  // randomly choose starting index
    listContainer.children[startingIndex].className = 'selected';

    selectionDuration = (Math.random() * 3000) + 3000;
    counterIncrementer = (Math.random() / 8) + 1.1;
    selectionDuration = (Math.random() * 2000) + 4000;

    elapsedTime = 0;
    counter = 20;
  }

  // build HTML for checkboxes
  function drawCheckboxes() {

    _.each(names, function(name) {
      var checkbox = document.createElement('input');
      var label = document.createElement('span');
      var lineBreak = document.createElement('br');

      checkbox.type = 'checkbox';
      checkbox.value = name;
      checkbox.checked = true;

      label.innerHTML = name;

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(lineBreak);
    });
  }

  // find who is present
  function getPresentNames() {

    // get selected names and shuffle them
    namesPresent =
      _(checkboxContainer.children)
        .filter(function(child) { return child.tagName ==='INPUT' && child.checked === true; })
        .map(function(child) { return child.value; })
        .shuffle()
        .value();

    drawSelector(namesPresent);
  }

  // build HTML for selector
  function drawSelector(names) {

    // make sure selector is empty
    while( listContainer.hasChildNodes() ){
      listContainer.removeChild(listContainer.lastChild);
    }

    // populate selector
    _.each(names, function(name, index) {
      var listItem = document.createElement('li');
      listItem.innerHTML = name;
      listContainer.appendChild(listItem);
    });

    setTimeout(doSelection, 100);
  }

  // begins 'animation' and returns after elapsed time has passed
  function doSelection() {

    init();

    // updateselection recursively called to call nextSelection at growing intervals
    var updateSelection = function() {
      clearInterval(interval);
      elapsedTime += counter;
      if (elapsedTime >= selectionDuration) {
        findWinner();
        return;
      }
      counter *= counterIncrementer;
      nextSelection();
      interval = setInterval(updateSelection, counter);
    };

    var interval = setInterval(updateSelection, counter);
  }

  // toggles selected class based on child node's location
  function nextSelection() {

    _.each(listContainer.children, function(child, index, listContainer) {
      if (child.className === 'selected') {
        child.className = '';
        if (child.nextSibling) {
          child.nextSibling.className = 'selected';
        } else {
          listContainer[0].className = 'selected';
        }
        return false;
      }
    });
  }

  // adds special class to winner
  function findWinner() {
    _.each(listContainer.children, function(child, index, listContainer) {
      if (child.className === 'selected') {
        child.className += ' winner';
      }
    });
  }

  drawCheckboxes();

})();