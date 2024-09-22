function interpolate() {
    var x = [], y = [];
    
    x[0] = parseFloat(document.getElementById("x0").value);
    x[1] = parseFloat(document.getElementById("x1").value);
    x[2] = parseFloat(document.getElementById("x2").value);
    
    y[0] = parseFloat(document.getElementById("y0").value);
    y[1] = parseFloat(document.getElementById("y1").value);
    y[2] = parseFloat(document.getElementById("y2").value);
    
    var numNullX = 0, numNullY = 0, nullIndex = 0;
    
    for (var i = 0; i < 3; i++) {
        if (isNaN(x[i])) {
            numNullX++;
            nullIndex = i;
        }
        if (isNaN(y[i])) {
            numNullY++;
            nullIndex = i;
        }
    }
    
    var solveForX = false;
    var temp;
    
    if (numNullX == 1 && numNullY == 0) {
        solveForX = true;
        if (nullIndex != 2) {
            x[nullIndex] = x[2];
            temp = y[nullIndex];
            y[nullIndex] = y[2];
            y[2] = temp; 
        }
    } else if (numNullY == 1 && numNullX == 0) {
        solveForX = false;
        if (nullIndex != 2) {
            y[nullIndex] = y[2];
            temp = x[nullIndex];
            x[nullIndex] = x[2];
            x[2] = temp;
        }
    } else {
        showError("Please enter five out of the six values.");
        return;
    }

    var id = "";

    if (solveForX) {
        id = "x" + nullIndex; 
        if (y[0] === y[1] || y[0] === y[2] || y[1] === y[2]) {
            showError("No two y values can be the same.");
        } else {
            x[2] = ((y[1] - y[2]) * x[0] + (y[2] - y[0]) * x[1]) / (y[1] - y[0]);
            document.getElementById(id).value = x[2].toFixed(4); 
            showResult(`Interpolated x${nullIndex + 1} = ${x[2].toFixed(4)}`);
        }
    } else {
        if (x[0] === x[1] || x[0] === x[2] || x[1] === x[2]) {
            showError("No two x values can be the same.");
            return;
        }
        y[2] = ((x[1] - x[2]) * y[0] + (x[2] - x[0]) * y[1]) / (x[1] - x[0]);
        id = "y" + nullIndex; 
        document.getElementById(id).value = y[2].toFixed(4); 
        showResult(`Interpolated y${nullIndex + 1} = ${y[2].toFixed(4)}`);
    }
}

function resetForm() {
    document.getElementById('interpolatorForm').reset();
    hideElements();
    showResult(""); 
    showError("");  
}

function showResult(message) {
    var resultDiv = document.getElementById("result");
    resultDiv.textContent = message;
    resultDiv.classList.remove("hidden");
}

function showError(message) {
    var errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

function hideElements() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("error").classList.add("hidden");
}
