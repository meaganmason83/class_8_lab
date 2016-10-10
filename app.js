'use strict';

var allKiosks = [];

var form = document.getElementById('form');

function Kiosk(name, minCustomer, maxCustomer, averageCups, averagePounds) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.averageCups = averageCups;
  this.averagePounds = averagePounds;
  this.hoursOpen = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
  this.customerPerHour = [];
  this.customerPerDay = 0;
  this.cupsPerHour = [];
  this.cupsPerDay = 0;
  this.poundsPerHour = [];
  this.poundsPerDay = 0;
  this.totalBeansPerHour = [];
  this.totalBeansPerDay = 0;
  this.employeesPerHour = [];
  this.employeesPerDay = 0;
  this.cupsIntoPounds = [];
  this.cupsPlusPounds = [];
  this.dailyToGoPackages = 0;
  allKiosks.push(this);
}

Kiosk.prototype.getRandomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min) + 1 + min);
};

Kiosk.prototype.generateCustomerData = function() {
  for (var i = 0; i < this.hoursOpen.length; i++) {
    this.customerPerHour.push(this.getRandomCustomer(this.minCustomer, this.maxCustomer));
    this.customerPerDay += this.customerPerHour[i];
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

Kiosk.prototype.callMethods = function() {
  this.getRandomCustomer();
  this.generateCustomerData();
  // this.generateTotalCustomers(); // NOTE: Not necessary
  this.generateCupsData();
  this.generateLbsData();
  this.generateCupsLbsData();
  this.generateCupsPlusLbsData();
  this.generateBeansData();
  this.generateEmployeeData();
  // this.generateStringsForDOM(); // NOTE: Not necessary
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

var kioskTable = {
  name: 'Totals',
  dailyBeanTotal: 0,
  hourlyBeanTotal: [],
  dailyEmployeeTotal: 0,
  hourlyEmployeeTotal: [],
  hours: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm']
};

kioskTable.dailyBeanTotalData = function() {
  for (var i = 0; i < allKiosks.length; i++) {
    this.dailyBeanTotal += allKiosks[i].totalBeansPerDay;
  }
};

kioskTable.hourlyBeanTotalData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    var count = 0;
    for(var j = 0; j < allKiosks.length; j++) {
      count += allKiosks[j].totalBeansPerHour[i];
    }
    this.hourlyBeanTotal.push(parseFloat(count).toFixed(0));
  }
};

kioskTable.dailyEmployeeTotalData = function() {
  for (var i = 0; i < allKiosks.length; i++) {
    this.dailyEmployeeTotal += allKiosks[i].employeesPerDay;
  }
};
kioskTable.hourlyEmployeeTotalData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    var count = 0;
    for (var j = 0; j < allKiosks.length; j++) {
      count += allKiosks[j].employeesPerHour[i];
    }
    this.hourlyEmployeeTotal.push(count);
  }
};

function kioskTableMethods() {
  kioskTable.dailyBeanTotalData();
  kioskTable.hourlyBeanTotalData();
  kioskTable.dailyEmployeeTotalData();
  kioskTable.hourlyEmployeeTotalData();
}

kioskTableMethods();

function clearTotals() {
  kioskTable.dailyBeanTotal = 0;
  kioskTable.hourlyBeanTotal = [];
  kioskTable.dailyEmployeeTotal = 0;
  kioskTable.hourlyEmployeeTotal = [];
}

var tableElBeans = document.getElementById('pounds-body');

function makeBeansRow(obj) {
  var rowEl = document.createElement('tr');

  var cellElName = document.createElement('td');
  cellElName.textContent = obj.name;
  rowEl.appendChild(cellElName);

  var cellElBeans = document.createElement('td');
  cellElBeans.textContent = obj.totalBeansPerDay;
  rowEl.appendChild(cellElBeans);

  for (var i = 0; i < obj.hoursOpen.length; i++) {
    var cellElHours = document.createElement('td');
    cellElHours.textContent = obj.totalBeansPerHour[i]
    rowEl.appendChild(cellElHours);
    tableElBeans.appendChild(rowEl);
  }
  tableElBeans.appendChild(rowEl);
}

var tableElTotal = document.getElementById('pounds-foot');

function addBeansTotalRow() {
  var rowElTotals = document.createElement('tr');

  var cellElName = document.createElement('td');
  cellElName.textContent = kioskTable.name;
  rowElTotals.appendChild(cellElName);

  var cellElTotal = document.createElement('td');
  cellElTotal.textContent = kioskTable.dailyBeanTotal;
  rowElTotals.appendChild(cellElTotal);

  for (var i = 0; i < kioskTable.hours.length; i++) {
    var cellElHours = document.createElement('td');
    cellElHours.textContent = kioskTable.hourlyBeanTotal[i]
    rowElTotals.appendChild(cellElHours);
    tableElTotal.appendChild(rowElTotals);
  }
  tableElTotal.appendChild(rowElTotals);
}

var tableElEmp = document.getElementById('emp-body');

function makeEmpRow(obj) {
  var rowElEmp = document.createElement('tr');

  var cellElName = document.createElement('td');
  cellElName.textContent = obj.name;
  rowElEmp.appendChild(cellElName);

  var cellElDay = document.createElement('td');
  cellElDay.textContent = obj.employeesPerDay;
  rowElEmp.appendChild(cellElDay);

  for (var i = 0; i < obj.hoursOpen.length; i++) {
    var cellElHours = document.createElement('td');
    cellElHours.textContent = obj.employeesPerHour[i]
    rowElEmp.appendChild(cellElHours);
    tableElEmp.appendChild(rowElEmp);
  }
  tableElEmp.appendChild(rowElEmp);
}

var tabelElEmpTotal = document.getElementById('emp-foot');

function addEmployeeTotalsRow() {
  var rowElTotals = document.createElement('tr');

  var cellElName = document.createElement('td');
  cellElName.textContent = kioskTable.name;
  rowElTotals.appendChild(cellElName);

  var cellElTotal = document.createElement('td');
  cellElTotal.textContent = kioskTable.dailyEmployeeTotal;
  rowElTotals.appendChild(cellElTotal);

  for (var i = 0; i < kioskTable.hours.length; i++) {
    var cellElHours = document.createElement('td');
    cellElHours.textContent = kioskTable.hourlyEmployeeTotal[i]
    rowElTotals.appendChild(cellElHours);
    tabelElEmpTotal.appendChild(rowElTotals);
  }
  tabelElEmpTotal.appendChild(rowElTotals);
}

function makeTable(arr) {
  for (var index in arr) {
    makeBeansRow(arr[index]);
    makeEmpRow(arr[index]);
  }
}

makeTable(allKiosks);
addBeansTotalRow();
addEmployeeTotalsRow();


function formSubmit(event) {
  event.preventDefault();

  var name = event.target.name.value;
  var minCustomer = event.target.minCustomer.value;
  var maxCustomer = event.target.maxCustomer.value;
  var averageCups = event.target.averageCups.value;
  var averagePounds = event.target.averagePounds.value;
  var newKiosk = new Kiosk(name, minCustomer, maxCustomer, averageCups, averagePounds);

  newKiosk.callMethods();
  document.getElementById('pounds-foot').innerHTML = '';
  document.getElementById('emp-foot').innerHTML = '';

  makeBeansRow(newKiosk);
  clearTotals();
  kioskTableMethods();
  addBeansTotalRow();
  addEmployeeTotalsRow();
  makeEmpRow(newKiosk);
}

form.addEventListener('submit', formSubmit);
