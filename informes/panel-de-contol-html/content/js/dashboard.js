/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 89.42857142857143, "KoPercent": 10.571428571428571};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8764285714285714, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "3. Browse Products"], "isController": false}, {"data": [1.0, 500, 1500, "1. User Login"], "isController": false}, {"data": [0.25, 500, 1500, "Create Payment"], "isController": false}, {"data": [1.0, 500, 1500, "Delete Item"], "isController": false}, {"data": [1.0, 500, 1500, "Get Items"], "isController": false}, {"data": [0.84, 500, 1500, "Create Order"], "isController": false}, {"data": [0.84, 500, 1500, "Get Order Status"], "isController": false}, {"data": [1.0, 500, 1500, "4. Get Product Details"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - Feliz"], "isController": false}, {"data": [1.0, 500, 1500, "Create Cart"], "isController": false}, {"data": [1.0, 500, 1500, "Add Item"], "isController": false}, {"data": [1.0, 500, 1500, "2. Get User Profile"], "isController": false}, {"data": [1.0, 500, 1500, "Update Item"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - Fallo"], "isController": false}, {"data": [0.34, 500, 1500, "Get Payment"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1400, 148, 10.571428571428571, 89.55357142857136, 0, 1009, 43.0, 154.9000000000001, 385.0, 912.98, 1.4133990227355329, 2.8068126858241125, 0.706252894628579], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3. Browse Products", 100, 0, 0.0, 62.64000000000003, 13, 112, 65.0, 104.9, 107.0, 111.97999999999999, 0.1010062240035231, 1.252812549871823, 0.025547472672766094], "isController": false}, {"data": ["1. User Login", 100, 0, 0.0, 91.76, 71, 156, 90.0, 105.0, 113.74999999999994, 155.65999999999983, 0.100999082928327, 0.13823263156645538, 0.03215400491663536], "isController": false}, {"data": ["Create Payment", 100, 50, 50.0, 417.75000000000006, 5, 1009, 538.0, 923.8, 953.95, 1008.96, 0.10105736319106814, 0.11942236779675747, 0.07134116921600708], "isController": false}, {"data": ["Delete Item", 100, 0, 0.0, 33.76, 6, 64, 34.0, 53.900000000000006, 58.0, 63.95999999999998, 0.1010160191203121, 0.0975633231542858, 0.060792111116105794], "isController": false}, {"data": ["Get Items", 100, 0, 0.0, 34.55999999999999, 7, 65, 33.0, 57.0, 58.0, 64.95999999999998, 0.10101448850808671, 0.14767450126621662, 0.054379137490315234], "isController": false}, {"data": ["Create Order", 100, 16, 16.0, 278.06999999999994, 5, 409, 314.0, 397.9, 406.95, 409.0, 0.10101877433921094, 0.13929936534955023, 0.07115213964077724], "isController": false}, {"data": ["Get Order Status", 100, 16, 16.0, 29.45, 2, 74, 27.0, 56.70000000000002, 59.0, 73.87999999999994, 0.10105317620238122, 0.11795984626780305, 0.054956546186859453], "isController": false}, {"data": ["4. Get Product Details", 100, 0, 0.0, 33.66000000000001, 8, 62, 31.0, 56.900000000000006, 60.94999999999999, 62.0, 0.10100683614267013, 0.16206467947500686, 0.027619056757761364], "isController": false}, {"data": ["JSR223 Sampler - Feliz", 75, 0, 0.0, 2.1200000000000014, 0, 27, 1.0, 3.0, 6.40000000000002, 27.0, 0.07652998751030604, 0.0, 0.0], "isController": false}, {"data": ["Create Cart", 100, 0, 0.0, 38.22, 12, 63, 39.0, 57.900000000000006, 59.0, 62.989999999999995, 0.10100561187179559, 0.12714475947533646, 0.062068145771804084], "isController": false}, {"data": ["Add Item", 100, 0, 0.0, 106.00999999999999, 59, 161, 107.0, 147.0, 154.0, 160.98, 0.10100173520981091, 0.12822485915308024, 0.06739202693564776], "isController": false}, {"data": ["2. Get User Profile", 100, 0, 0.0, 34.139999999999986, 9, 57, 36.0, 53.80000000000001, 55.0, 56.989999999999995, 0.1010078563910701, 0.1314384459385751, 0.054770129161271164], "isController": false}, {"data": ["Update Item", 100, 0, 0.0, 74.39, 34, 111, 74.0, 105.9, 107.0, 110.99, 0.10101203962500291, 0.12774471808044802, 0.07065417322403157], "isController": false}, {"data": ["JSR223 Sampler - Fallo", 25, 0, 0.0, 2.4000000000000004, 1, 24, 1.0, 3.8000000000000043, 18.299999999999986, 24.0, 0.026041151268881135, 0.0, 0.0], "isController": false}, {"data": ["Get Payment", 100, 66, 66.0, 17.149999999999995, 3, 61, 7.5, 49.900000000000006, 55.849999999999966, 61.0, 0.10114404023914496, 0.11890746230614481, 0.053924391922030086], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["402/Payment Required", 1, 0.6756756756756757, 0.07142857142857142], "isController": false}, {"data": ["429/Too Many Requests", 147, 99.32432432432432, 10.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1400, 148, "429/Too Many Requests", 147, "402/Payment Required", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Create Payment", 100, 50, "429/Too Many Requests", 49, "402/Payment Required", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Create Order", 100, 16, "429/Too Many Requests", 16, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Get Order Status", 100, 16, "429/Too Many Requests", 16, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Get Payment", 100, 66, "429/Too Many Requests", 66, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
