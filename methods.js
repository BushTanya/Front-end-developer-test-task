function getTilesData() {
    if (dataLength === undefined || dataLength == 0)
        return;

    var npsAverage = getAverage("nps", "");
    var easyAverage = getAverage("easy", "");
    var osatAverage = getAverage("osat", "");
    var ltrAverage = getAverage("ltr", "");

    document.getElementById("nps-average").innerHTML = Math.floor(npsAverage * 100) / 100 ;
    document.getElementById("easy-average").innerHTML = Math.floor(easyAverage * 1000) / 100  + "%";
    document.getElementById("ltr-average").innerHTML = Math.floor(ltrAverage * 1000) / 100  + "%";
    document.getElementById("osat-average").innerHTML = Math.floor(osatAverage * 1000) / 100  + "%";  

    for (let i = 0; i < tableValues.length; i++) {
        tableValues[i] = new Array(4);

        tableValues[i][0] = regions[i];
        tableValues[i][1] = getAverage("osat", regions[i]);
        tableValues[i][2] = getAverage("rsp", regions[i]);
        tableValues[i][3] = getAverage("prd", regions[i]);
    }

    var table = document.getElementsByClassName("team-perf-table")[0];
    var rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        for (let j = 1; j < rows[i].cells.length; j++) {
            var insideDiv = document.createElement("div");
            setElementStyle(insideDiv, tableValues[i-1][j]);

            while (rows[i].cells[j].firstChild) {
                rows[i].cells[j].removeChild(rows[i].cells[j].firstChild);
            }
            
            rows[i].cells[j].appendChild(insideDiv);
        }
    }

}
function setSortedTable(sortedTable) {
    var table = document.getElementsByClassName("team-perf-table")[0];
    var rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            if (j == 0) {
                rows[i].cells[j].innerHTML = sortedTable[i-1][j];
                continue;
            }
            var insideDiv = document.createElement("div");
            setElementStyle(insideDiv, sortedTable[i-1][j]);

            while (rows[i].cells[j].firstChild) {
                rows[i].cells[j].removeChild(rows[i].cells[j].firstChild);
            }

            rows[i].cells[j].appendChild(insideDiv);
        }
    }          
}
function getAverage(property, hier) {
    var sum = 0; var amount = 0;
    for (let i = 0; i < dataLength; i++) { 
        if (data[i][property] === undefined) {
            alert("There is no such property!");
            break;
        }

        if (checkNPSData(data[i]["nps"]) && checkProductGroup(data[i]["prd_group"]) && checkHier(hier, data[i])) {
            sum += data[i][property];
            amount++;
        }
    }

    return amount != 0 ? Math.floor( (sum / amount) * 100) / 100 : Math.floor( (sum / dataLength) * 100) / 100;
}           
function checkNPSData(item) {
    var flagDet = false, flagPas = false, flagProm = false;
    if (document.getElementById('detractor').checked && item >= 0 && item <= 6) {
        flagDet = true;
    }
    if (document.getElementById('passive').checked && (item == 7 || item == 8)) {
        flagPas = true;
    }
    if (document.getElementById('promoter').checked && (item == 9 || item == 10)) {
        flagProm = true;
    }
    return flagDet || flagPas || flagProm;
}
function checkProductGroup(item) {
    var flagA = false, flagB = false, flagC = false, flagD = false;
    if (document.getElementById('product-a').checked && item == "A") {
        flagA = true;
    }
    if (document.getElementById('product-b').checked && item == "B") {
        flagB = true;
    }
    if (document.getElementById('product-c').checked && item == "C") {
        flagC = true;
    }
    if (document.getElementById('product-d').checked && item == "D") {
        flagD = true;
    }
    return flagA || flagB || flagC || flagD;
}
function checkHier(hier, item) {
    if (hier == "")
        return true;
    if (hier == item.hier)
        return true;

    return false;
}
function setElementStyle(element, val) {
    element.innerHTML = val;
    element.classList.add("result");

    if (val >= 7.0)
        element.style.backgroundColor = "rgb(179, 255, 217)";
    if (val <= 5.0)
        element.style.backgroundColor = "rgb(255, 179, 179)";

}
function sortTable(col, flag){
    var sortedArray;
    if (flag == false) {
        sortedArray = tableValues.sort(function(a, b){
            if(a[col] < b[col]) { return -1; }
            if(a[col] > b[col]) { return 1; }
            return 0;
        })
        flag = true;
    }
    else {
        sortedArray = tableValues.sort(function(a, b){
            if(a[col] > b[col]) { return -1; }
            if(a[col] < b[col]) { return 1; }
            return 0;
        })
        flag = false;
    }
    setSortedTable(sortedArray);
    return flag;
}
function sortTableAlphabetically() {
    ascAlphSort = sortTable(0, ascAlphSort);                
}
function sortTableOsat() {
    ascOsatSort = sortTable(1, ascOsatSort);
}
function sortTableRsp() {
    ascRspSort = sortTable(2, ascRspSort);
}
function sortTablePrd() {
    ascPrdSort = sortTable(3, ascPrdSort);
}
function openNav() {
    document.getElementsByClassName("sidenav")[0].style.width = "200px";
    document.getElementsByClassName("main")[0].style.marginLeft = "200px";
    document.getElementsByClassName("main__container")[0].style.marginLeft = "0";
    document.getElementsByClassName("main__container")[0].style.justifyContent  = "start";
}
function closeNav() {
    document.getElementsByClassName("sidenav")[0].style.width = "0";
    document.getElementsByClassName("main")[0].style.marginLeft = "0";
    document.getElementsByClassName("main__container")[0].style.justifyContent  = "center";           
}
