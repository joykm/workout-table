// const baseURL = `http://flip2.engr.oregonstate.edu:11711/`;

const baseURL = `https://workout-table.herokuapp.com/`;

// Create the table.
var table = document.createElement("table");
table.id = "workoutsTable";
document.body.appendChild(table);

// Create table header
var tHeader = document.createElement("thead");
table.appendChild(tHeader);

// Create table body
var tBody = document.createElement("tbody");
table.appendChild(tBody);

// // Create table footer
var tFooter = document.createElement("tfoot");
table.appendChild(tFooter);

// Creates the elements of the table header/body
const makeTable = (rows) => {
    // console.log(rows.length);
    deleteTable();
    makeHeaderRow();
    if (rows.length != 0) {
        for (var i = 0; i < rows.length; i++) {
            makeRow(rows[i]);
        }
        makeFooterRow();
    } 
};

// Delete and recreate the header, body, and footer inorder to recreate the table.
const deleteTable = () => {
    table.removeChild(tHeader);
    tHeader = document.createElement("thead");
    table.appendChild(tHeader);

    table.removeChild(tBody);
    tBody = document.createElement("tbody");
    table.appendChild(tBody);

    table.removeChild(tFooter);
    tFooter = document.createElement("tfoot");
    table.appendChild(tFooter);
}

// Make the header row
const makeHeaderRow = () => {
    var row = document.createElement("tr");

    tHeader.appendChild(row);
    headers = ["Name", "Reps", "Weight", "Unit", "Date"]

    // Iterate through headers array, populating header cells.
    for (var i = 0; i < headers.length; i++) {
        var cell = document.createElement("th");
        cell.textContent = headers[i];
        row.appendChild(cell);
    }
};

// Create the rows, cells, and inputs
const makeRow = (rowData, headerRow = false) => {
    const cellEntries = Object.entries(rowData);

    var row = document.createElement("tr");
    rowId = cellEntries[0][1];
    row.id = rowId;
    row.disableInputs = true;
    tBody.appendChild(row);

    // Room for improvement. Could have modularized cell input;
    for (var i = 1; i < cellEntries.length; i++) {
        // Each of these if functions creates a cell and populates it with the proper input.
        if (cellEntries[i][0] == "name") {
            name = cellEntries[i][1];
            var cell = document.createElement("td");
            row.appendChild(cell);

            var input = document.createElement('input');
            input.type = "text";
            input.value = name;
            input.id = 'name' + rowId;
            input.disabled = true;
            cell.appendChild(input);
        }
        if (cellEntries[i][0] == "reps") {
            reps = cellEntries[i][1];
            var cell = document.createElement("td");
            row.appendChild(cell);

            var input = document.createElement('input');
            input.type = "number";
            input.value = reps;
            input.id = "reps" + rowId;
            input.disabled = true;
            cell.appendChild(input);
        }
        if (cellEntries[i][0] == "weight") {
            weight = cellEntries[i][1];
            var cell = document.createElement("td");
            row.appendChild(cell);

            var input = document.createElement('input');
            input.type = "number";
            input.value = weight;
            input.id = 'weight' + rowId;
            input.disabled = true;
            cell.appendChild(input);
        }
        // Creates the radio inputs in a seperate function, as they were handled differently.
        if (cellEntries[i][0]== "unit") {
            makeRadioInputs(rowData, rowId, row);

        }
        if (cellEntries[i][0] == "date") {
            date = cellEntries[i][1];
            var cell = document.createElement("td");
            row.appendChild(cell);

            var input = document.createElement('input');
            input.type = "date";
            input.value = date.substring(0,10);
            input.id = 'date' + rowId;
            input.disabled = true;
            cell.appendChild(input);
        }
    };

    // Creates update and delete buttons at the end of each row
    makeButtons(row, rowId, "update", "update");
    makeButtons(row, rowId, "delete", "delete");
};

// Creates a cell and populates the radio button inputs and labels.
const makeRadioInputs = (radioData, rowId, row) => {
    var cell = document.createElement("td");
    cell.textContent = radioData.unit.value;
    row.appendChild(cell);

    // Room for improvement. Could have made this more modular, or used a loop to avoid code duplication.
    var label1 = document.createElement("label");
    label1.setAttribute("for", "radio1row" + rowId);
    label1.innerHTML = "lbs";
    cell.appendChild(label1);

    var radio1 = document.createElement("input");
    radio1.type = "radio";
    radio1.name = "unit" + rowId;
    radio1.checked = !radioData.unit;
    radio1.id = "radio1row" + rowId;
    radio1.value = 0;
    radio1.disabled = true;
    cell.appendChild(radio1);

    var label2 = document.createElement("label");
    label2.setAttribute("for", "radio2row" + rowId);
    label2.innerHTML = '&nbsp &nbsp' + "kgs";
    cell.appendChild(label2);

    var radio2 = document.createElement("input");
    radio2.type = "radio";
    radio2.name = "unit" + rowId;
    radio2.checked = radioData.unit;
    radio2.id = "radio2row" + rowId;
    radio2.value = 1;
    radio2.disabled = 2;
    cell.appendChild(radio2);
};

// Create update and delete on each row
const makeButtons = (row, rowId, name, txt) => {
    var cell = document.createElement("td");
    row.appendChild(cell);

    var input = document.createElement('button');
    input.type = "button";
    input.name = name;
    input.id = 'row' + rowId + "-" + name;
    input.textContent = txt;
    cell.appendChild(input);
};

// // Creates a reset button for ease of use
const makeFooterRow = () => {
    var row = document.createElement("tr");
    tFooter.appendChild(row);
    var cell = document.createElement("td");
    row.appendChild(cell);

    var input = document.createElement('button');
    input.type = "button";
    input.id = "reset";
    input.textContent = "reset table";
    cell.appendChild(input);
}

// Toggle update and save buttons
const toggleUpdateButton = (targetId, rowId) => {
    var toggle = document.getElementById(targetId);
    if (toggle.textContent == 'update') {
        toggle.textContent = "save";
        toggle.style.backgroundColor = "#0275d8";
        toggle.style.color = "white";
        console.log(targetId + "  <--->  " + rowId)
        $('button').prop('disabled', true);
        $('button[id^=' + targetId + ']').prop('disabled', false);
        $("#addForm :input").prop("disabled", true);

        // $('input[type=button], input[type=submit]').attr('disabled', true);
        // $('button').prop('disabled', false);

    }
    else {
        $('button').prop('disabled', false);
        $("#addForm :input").prop("disabled", false);
        toggle.textContent = "update";
        toggle.style.backgroundColor = "";
        toggle.style.color = "";
    }
};

// Disable row inputs when 'save' button is clicked
const disableInputs = (rowId) => {
    const inputs = ['name', 'reps', 'weight', 'radio1row', 'radio2row', 'date'];

    // iterate the six inputs to be disabled in the row
    for (const i in inputs) {
        const element = document.getElementById(inputs[i]+rowId);
        element.disabled = true;
    }
};
 
// Enable a row inputs when "update" button is clicked.
const enableInputs = (rowId) => {    
    const inputs = ['name', 'reps', 'weight', 'radio1row', 'radio2row', 'date'];
    
    // iterate the six inputs I want to endable in the row
    for (const i in inputs) {
        const element = document.getElementById(inputs[i]+rowId);
        element.disabled = false;
    }
};

// Packages the edited row data into json syntax and sends it to the server as a PUT request.
const putRequest = async (rowId) => {
    const inputs = ['name', 'reps', 'weight', 'radio1row', 'radio2row', 'date'];
    var putPackage = {};

    // iterate the six inputs on the edited row, and packages them as an object.
    for (const i in inputs) {
        const element = document.getElementById(inputs[i]+rowId);
        putPackage['id'] = rowId;
        if (element.type == 'radio') {
            if (element.checked) {
                elementName = element.name.replace(/[0-9]/g,''); // radiobuttons are unique. Name needed to match to make a pair. Id was unique for each in row.
                putPackage[elementName] = element.value;
            };
        }
        else {
            elementId = element.id.replace(/[0-9]/g,'');
            putPackage[elementId] = element.value;
        };
    }

    // Formats the object for json syntax, and sends put request to server.
    var req = new XMLHttpRequest();
    req.open("PUT", baseURL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            makeTable(response.rows);
        }
        else {
            console.log("Error in network request: " + req.statusText);  
        }
    });
    req.send(JSON.stringify(putPackage));
};

// Packages row Id into json syntax and sends it to the server as a DELETE request.
const deleteRequest = async (rowId) => {
    const id = rowId;
    deletePackage = {id};
    var req = new XMLHttpRequest();
    req.open("DELETE", baseURL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            makeTable(response.rows);
        }
        else {
            console.log("Error in network request: " + req.statusText);  
        }
    });
    req.send(JSON.stringify(deletePackage));
}

// Convienent button for calling a get requeset to /reset-table, and resetting the table.
const resetRequest = async () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/reset-table", true);
    req.send(null);
    deleteTable();
}

// Event listener for the form submit button, packages form data in json syntax and sends it to the server.
document.querySelector('#addForm').onsubmit = async (event) => {
    event.preventDefault();

    // Collects form input data into variables.
    nameInput = document.getElementById('name');
    repsInput = document.getElementById('reps');
    weightInput = document.getElementById('weight');
    if (document.getElementById('lbs').checked) {
        unitInput = document.getElementById('lbs');
    } 
    else {
        unitInput = document.getElementById('kgs');
    }
    dateInput = document.getElementById('date');

    // Stores form input data into an object.
    var formData = {
        name: nameInput.value,
        reps: repsInput.value,
        weight: weightInput.value,
        unit: unitInput.value,
        date: dateInput.value
    };

    // Formats form object into json syntax and sends a put request to the server.
    var req = new XMLHttpRequest();
    req.open("POST", baseURL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            // console.log(req.responseText)
            var response = JSON.parse(req.responseText);
            makeTable(response.rows);
        }
        else {
            console.log("Error in network request: " + req.statusText);  
        }
    });
    req.send(JSON.stringify(formData));
    document.getElementById("addForm").reset();
};

// Runs upon window loading. Requests get for existing data from server. Calls function to create the table if data is present.
window.onload = async (event) => {
    var req = new XMLHttpRequest();
    req.open("DELETE", baseURL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            makeTable(response.rows);
        }
        else {
            console.log("Error in network request: " + req.statusText);  
        }
    });
    req.send(null);
};


// LOCAL CODE --> Was not working as I'm serving the html statically. Workaround above uses a null delete request.
// Runs upon window loading. Requests get for existing data from server. Calls function to create the table if data is present.
// window.onload = async (event) => {
//     var req = new XMLHttpRequest();
//     req.open("GET", baseURL, false);
//     req.send(null);
//     console.log(req.responseText)
//     storedRows = JSON.parse(req.responseText);
//     if (storedRows.rows.length != 0) {
//         // console.log(storedRows);
//         // console.log(storedRows.rows);
//         // console.log(storedRows.rows[0]);
//         // console.log(storedRows.rows[0].id);
//         makeTable(storedRows.rows);
//     }
// };

// One listener on the table; event deligation to handle all update, delete,save, and reset buttons in the table.
document.querySelector('#workoutsTable').onclick = async (event) => {
    let target = event.target;
    let targetId = event.target.id;
    row = document.getElementById(targetId).parentElement.parentElement;
    rowId = document.getElementById(targetId).parentElement.parentElement.id;

    // update clicked -> enable inputs -> toggle "update" to "save"
    if (target.textContent == 'update'){
        toggleUpdateButton(targetId, rowId);
        enableInputs(rowId);
    }
    // save clicked -> disable inputs -> toggle "save" to "update"
    else if (target.textContent == 'save') {
        toggleUpdateButton(targetId);
        disableInputs(rowId);
        putRequest(rowId); 
    };

    // delete clicked -> delete row
    if (target.textContent == 'delete') {
        deleteRequest(rowId);
    };

    //reset table clicked -> reset table
    if (target.textContent == 'reset table') {
        resetRequest();
    }
};

