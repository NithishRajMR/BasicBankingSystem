function tableCreate() {
    tbl = document.getElementById('customerTable');
    if (localStorage.getItem("Customers") === null) {
      tableSet();
    }
    document.addEventListener('Customers', function(e) {UpdateStorage()}, false);
    UpdateStorage()
}

function UpdateStorage()
{
  var cus = JSON.parse(localStorage.getItem('Customers'));
  //alert(cus[0][1]);
  for (let i = 0; i < 10; i++) {
    var tr = tbl.insertRow();
    const snum = tr.insertCell();
    snum.appendChild(document.createTextNode((i+1).toString()));
    
    const Name = tr.insertCell();
    Name.appendChild(document.createTextNode(cus[i][0]));
    
    const Email = tr.insertCell();
    Email.appendChild(document.createTextNode(cus[i][0] + "@gmail.com"));
    
    const Amount = tr.insertCell();
    Amount.appendChild(document.createTextNode(cus[i][1].toString()));
  }
  //alert(bus[0][1].toString());
}

function tableSet(){
  let cus = [
    ["Sandip", 85000],
    ["Nakul", 17000],
    ["Gautam", 68000],
    ["Rajan", 123000],
    ["Aashita", 113000],
    ["Ravi", 48000],
    ["Dinesh", 77000],
    ["Rahul", 91000],
    ["Ranjith", 39000],
    ["Santhosh", 82000],
  ];
  localStorage.setItem('Customers', JSON.stringify(cus));
}

function OptionLoad() {
  var sen = document.getElementById("Senders");
  var rec = document.getElementById("Receivers");
  var cus = JSON.parse(localStorage.getItem('Customers'))
  for (let i = 0; i < 10; i++) {
    var option = document.createElement("option");
    option.text = cus[i][0] + "@gmail.com";
    var option1 = document.createElement("option");
    option1.text = cus[i][0] + "@gmail.com";
    sen.add(option); 
    rec.add(option1);
  }
}

function TransferMoney() {
  var cus = JSON.parse(localStorage.getItem('Customers'))
  var sen = document.getElementById("Senders");
  var rec = document.getElementById("Receivers");
  var senid = 0;
  var recid = 0;
  var amount = document.getElementById("Amount").value;
  var num = parseInt(amount);
  var skip = false;
  for (let i = 0; i < 10; i++) {
    if (sen.value == (cus[i][0] + "@gmail.com")){
      senid = i;
      var orginalValue = parseInt(cus[i][1]);
      orginalValue = orginalValue - num;
      if (orginalValue >= 0)
      {
        cus[i][1] = orginalValue;
      }
      else
      {
        alert("Insufficient Funds");
        skip = true;
        break;
      }
    }
    else if (rec.value == (cus[i][0] + "@gmail.com")){
      recid = i;
      var orginalValue = parseInt(cus[i][1]);
      orginalValue = orginalValue + num;
      cus[i][1] = orginalValue;
    }
  }
  if (!skip){
  var date = `${Date()}`;
  let HisValue = [cus[senid][0], cus[recid][0], amount, date.toString()];
  if (localStorage.getItem("History") == null) {
    let his = [
      HisValue,
    ];
    localStorage.setItem('History', JSON.stringify(his));  
  }
  else
  {
    var his = JSON.parse(localStorage.getItem("History"));
    his.push(HisValue);
    localStorage.setItem('History', JSON.stringify(his));  
  }
  localStorage.removeItem("Customers");
  localStorage.setItem('Customers', JSON.stringify(cus));

  var bus = JSON.parse(localStorage.getItem('Customers'))

  alert("Transfered " + amount + " from " + cus[senid][0] + " to " + cus[recid][0]);
  window.location = 'CustomerList.html';
}
}

function HistoryTable()
{
  tbl = document.getElementById('HistoryTable');
  var his = JSON.parse(localStorage.getItem('History'));
  //alert(his.length);
  for (let i = 0; i < his.length; i++) {
    var tr = tbl.insertRow();
    const snum = tr.insertCell();
    snum.appendChild(document.createTextNode((i+1).toString()));
    
    const Sender = tr.insertCell();
    Sender.appendChild(document.createTextNode(his[i][0]));
    
    const receiver = tr.insertCell();
    receiver.appendChild(document.createTextNode(his[i][1]));
    
    const Amount = tr.insertCell();
    Amount.appendChild(document.createTextNode(his[i][2].toString()));
    
    const Date = tr.insertCell();
    Date.appendChild(document.createTextNode(his[i][3].toString()));
  }
}