'use strict';

var allKiosks = [];
var grandTotals = {
  location: 0
};
var form = document.getElementById('form');
var button = document.getElementById('button');

function Kiosk(name, minCustomer, maxCustomer, averageCups, averagePounds) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.averageCups = averageCups;
  this.averagePounds = averagePounds;
  this.hoursOpen = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
  this.customerPerHour = [];
  this.customerPerDay = 0;
  this.totalCustomers = 0;
  this.cupsPerHour = [];
  this.cupsPerDay = 0;
  this.cupsIntoPounds = [];
  this.cupsPlusPounds = [];
  this.poundsPerHour = [];
  this.poundsPerDay = 0;
  this.totalBeansPerHour = [];
  this.totalBeansPerDay = 0;
  this.dailyToGoPackages = 0;
  this.employeesPerHour = [];
  this.employeesPerDay = 0;
  this.stringsForDOM = [];
  this.stringsForDOM = [];
  this.grandTotals = 0; //new property for grandTotals method
  allKiosks.push(this);
}

Kiosk.prototype.getRandomCustomer = function() {
  this.getRandomCustomer = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  Kiosk.prototype.generateCustomerData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.customerPerHour.push(this.getRandomCustomer(this.minCustomer, this.maxCustomer));
      this.customerPerDay += this.customerPerHour[i];
    }
  };

  Kiosk.prototype.generateTotalCustomers = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.totalCustomers += this.customerPerHour[i];
    }
  };

  Kiosk.prototype.generateCupsData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.cupsPerHour.push(this.customerPerHour[i] * this.averageCups);
      this.cupsPerDay += this.cupsPerHour[i];
    }
  };

  Kiosk.prototype.generateLbsData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.poundsPerHour.push(this.customerPerHour[i] * this.averagePounds);
      this.poundsPerDay += this.poundsPerHour[i];
    }
  };

  Kiosk.prototype.generateCupsLbsData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.cupsIntoPounds.push(this.cupsPerHour[i] / 16);
    }
  };

  Kiosk.prototype.generateCupsPlusLbsData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.cupsPlusPounds.push(this.cupsIntoPounds[i] + this.poundsPerHour[i]);
    }
  };

  Kiosk.prototype.generateBeansData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.totalBeansPerHour.push(parseFloat(this.cupsIntoPounds[i].toFixed(0)) + parseFloat(this.poundsPerHour[i].toFixed(0)));
      this.totalBeansPerDay += parseFloat(this.totalBeansPerHour[i].toFixed(0));
    }
  };

  Kiosk.prototype.generateEmployeeData = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.customerPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  };

  Kiosk.prototype.generateStringsForDOM = function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.stringsForDOM.push(this.hoursOpen[i] + ': ' + parseFloat(this.totalBeansPerHour[i].toFixed(2)) + ' lbs [' + parseFloat(this.customerPerHour[i].toFixed(0)) + ' customers, ' + parseFloat(this.cupsPerHour[i].toFixed(1)) + ' cups (' + parseFloat(this.cupsIntoPounds[i].toFixed(1)) + ' lbs), ' + parseFloat(this.poundsPerHour[i].toFixed(0)) + ' lbs to-go]');
    }
    this.stringsForDOM.push('Total customers at ' + this.name + ': ' + this.totalCustomers);
    this.stringsForDOM.push('Total cups sold at ' + this.name + ': ' + parseFloat(this.cupsPerDay.toFixed(2)));
    this.stringsForDOM.push('Total to-go pound packages sold at ' + this.name + ': ' + parseFloat(this.poundsPerDay.toFixed(0)));
    this.stringsForDOM.push('Total pounds of beans needed at ' + this.name + ': ' + parseFloat(this.totalBeansPerDay.toFixed(0)));
  }
};

// Kiosk.prototype.generateLocationTotals = function() {
//   for (var i = 0; i < allKiosks.length; i++) {
//     grandTotals.location += allKiosks.totalBeansPerDay;
//     // console.log(allKiosks.totalBeansPerDay);
//     // console.log(grandTotals.location);
//   }
// };

Kiosk.prototype.callMethods = function() {
  this.getRandomCustomer();
  this.generateCustomerData();
  this.generateTotalCustomers();
  this.generateCupsData();
  this.generateLbsData();
  this.generateCupsLbsData();
  this.generateCupsPlusLbsData();
  this.generateBeansData();
  this.generateEmployeeData();
  this.generateStringsForDOM();
  // this.generateLocationTotals();
}

new Kiosk('Pike Place Market', 14, 35, 1.2, 0.34);
new Kiosk('Capitol Hill', 12, 28, 3.2, 0.03);
new Kiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
new Kiosk('South Lake Union', 5, 18, 1.3, 0.04);
new Kiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

function makeAllKiosks() {
  for (var i = 0; i < allKiosks.length; i++) {
    allKiosks[i].callMethods();
  }
}

makeAllKiosks();

//reference to the id in html
var tableEl = document.getElementById('populate-table1');

function makeARow(obj) {
  var rowEl = document.createElement('tr');
  //make a cell
  var cellElName = document.createElement('td');
      //give it content
      cellElName.textContent = obj.name;
      //append cell to row
      rowEl.appendChild(cellElName);

  var cellElBeans = document.createElement('td');
      cellElBeans.textContent = obj.totalBeansPerDay;
      rowEl.appendChild(cellElBeans);

    //make this a grandtotal method instead of totalBeansPerHour
    for (var i = 0; i < obj.hoursOpen.length; i++) {
      var cellElHours = document.createElement('td');
        cellElHours.textContent = obj.totalBeansPerHour[i]
        rowEl.appendChild(cellElHours);
        tableEl.appendChild(rowEl);
    }
      //append row to the table
      tableEl.appendChild(rowEl);

  // var rowElTotals = document.createElement('tr');
  //
  // var cellElTotals = document.createElement('td');
  //     cellElTotals.textContent = 'Totals';
  //     rowElTotals.appendChild(cellElTotals);
  //     tableEl.appendChild(rowElTotals);
}

function makeTable(arr) {
  for (var index in arr) {
    makeARow(arr[index]);
  }
}
makeTable(allKiosks);

var tableEl2 = document.getElementById('populate-table2');

function makeARow2(obj) {
  var rowEl = document.createElement('tr');
  //make a cell
  var cellElName = document.createElement('td');
      cellElName.textContent = obj.name;
      rowEl.appendChild(cellElName);

  var cellElEmp = document.createElement('td');
      cellElEmp.textContent = obj.employeesPerDay;
      rowEl.appendChild(cellElEmp);

    //make this a grandtotal method instead of totalBeansPerHour
    for (var i = 0; i < obj.hoursOpen.length; i++) {
      var cellElHours = document.createElement('td');
        cellElHours.textContent = obj.employeesPerHour[i]
        rowEl.appendChild(cellElHours);
        tableEl2.appendChild(rowEl);
    }
      //append row to the table
      tableEl2.appendChild(rowEl);

  // var rowElTotals = document.createElement('tr');
  //
  // var cellElTotals = document.createElement('td');
  //     cellElTotals.textContent = 'Totals';
  //     rowElTotals.appendChild(cellElTotals);
  //     tableEl2.appendChild(rowElTotals);
}

function makeTable2(arr) {
  for (var index in arr) {
    makeARow2(arr[index]);
  }
}
makeTable2(allKiosks);

//form and event listener
function buttonClick(event) {
  alert('The button has been clicked! Now your computer will crash.');
}

function formSubmit(event) {
  event.preventDefault();

  var name = event.target.name.value;
  var minCustomer = event.target.minCustomer.value;
  var maxCustomer = event.target.maxCustomer.value;
  var averageCups = event.target.averageCups.value;
  var averagePounds = event.target.averagePounds.value;

  var newKiosk = new Kiosk(name, minCustomer, maxCustomer, averageCups, averagePounds);

  makeAllKiosks(newKiosk);
  makeARow(newKiosk);
  makeARow2(newKiosk);
}

button.addEventListener('click', buttonClick);
form.addEventListener('submit', formSubmit);
