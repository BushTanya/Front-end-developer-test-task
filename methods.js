function getBigTileData() {
    if (dataLength === undefined || dataLength == 0)
        return; 
	
    for (let i = 0; i < tableValues.length; i++) {
        tableValues[i] = new Array(4);

        tableValues[i][0] = regions[i];
        tableValues[i][1] = getAverage("osat", regions[i]);
        tableValues[i][2] = getAverage("rsp", regions[i]);
        tableValues[i][3] = getAverage("prd", regions[i]);
    }
	
	$('.team-perf-table > tbody  > tr').each(function(index, tr) { 
		var $ths = $(this).find('th');
			
		for (let j = 1; j < $ths.length; j++) {
			$ths.eq(j).children().remove();		
			$ths.eq(j).append('<div></div>');  
			
			setElementStyle($ths.eq(j).children('div'), tableValues[index][j])
		}
	});
}

function getNpsAverageData() {
	if (dataLength === undefined || dataLength == 0)
		return; 
	var npsAverage = getAverage("nps", "");
	
	return Math.floor(npsAverage * 100) / 100 ;
}

function getEasyAverageData() {
	if (dataLength === undefined || dataLength == 0)
		return; 
	var easyAverage = getAverage("easy", "");
	
	return Math.floor(easyAverage * 1000) / 100
}

function getOsatAverageData() {
	if (dataLength === undefined || dataLength == 0)
		return; 
	var osatAverage = getAverage("osat", "");
	
	return Math.floor(osatAverage * 1000) / 100
}

function getLtrAverageData() {
	var ltrAverage = getAverage("ltr", "");
	
	return Math.floor(ltrAverage * 1000) / 100
}

function setSortedTable(sortedTable) {
	$('.team-perf-table > tbody  > tr').each(function(index, tr) { 
		var $ths = $(this).find('th');
			
		for (let j = 0; j < $ths.length; j++) {
			if (j == 0) {
                $ths.eq(j).html(sortedTable[index][j]);
                continue;
            }
			
			$ths.eq(j).children().remove();		
			$ths.eq(j).append('<div></div>');  
			
			setElementStyle($ths.eq(j).children('div'), tableValues[index][j])
		}
	});	
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
    if ($('#detractor:checked').length > 0 && item >= 0 && item <= 6) {
        flagDet = true;
    }
    if ($('#passive:checked').length > 0 && (item == 7 || item == 8)) {
        flagPas = true;
    }
    if ($('#promoter:checked').length > 0 && (item == 9 || item == 10)) {
        flagProm = true;
    }
    return flagDet || flagPas || flagProm;
}

function checkProductGroup(item) {
    var flagA = false, flagB = false, flagC = false, flagD = false;
    if ($('#product-a:checked').length > 0 && item == "A") {
        flagA = true;
    }
    if ($('#product-b:checked').length > 0 && item == "B") {
        flagB = true;
    }
    if ($('#product-c:checked').length > 0 && item == "C") {
        flagC = true;
    }
    if ($('#product-d:checked').length > 0 && item == "D") {
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
	element.html(val);
	element.addClass('result');
	
	if (val >= 7.0)
		element.css({"background-color" : "rgb(179, 255, 217)"});
    if (val <= 5.0)
        element.css({"background-color" : "rgb(255, 179, 179)"});
}

function sortTable(col, flag){
    var sortedArray;
    if (flag == false) {
        sortedArray = tableValues.sort(function(a, b){
            if (a[col] < b[col]) { return -1; }
            if (a[col] > b[col]) { return 1; }
            return 0;
        })
        flag = true;
    }
    else {
        sortedArray = tableValues.sort(function(a, b){
            if (a[col] > b[col]) { return -1; }
            if (a[col] < b[col]) { return 1; }
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
	$('.sidenav').css({"width" : "200px"});
	$('.main').css({"margin-left": "200px"});
	$('.flex-container').css({"margin" : "0"}); 
}

function closeNav() {
	$('.sidenav').css({"width" : "0"});
	$('.main').css({"margin-left": "0"});
	$('.flex-container').css({"margin" : "auto"});          
}

function closeMenu() {
	$('.burger-menu').css({"display" : "none"});
}

function openMenu() {
	$('.burger-menu').css({"display" : "inline"});
}

function updateTilesData() {
	$.updateTilesData();				
};

function setFiltersPrintData() {
	let filtersNpsPrint = $('.filters-print__nps-info');
	let filtersProductPrint = $('.filters-print__product-info');
	
	let nps = getCheckedNPS();
	let group = getCheckedProductGroup();
	
	filtersNpsPrint.text(nps);
	filtersProductPrint.text(group);
}

function getCheckedNPS() {	
	let nps = "";
	
	if ($('#detractor:checked').length > 0)
		nps += " Detractor";
	
	if ($('#passive:checked').length > 0)
		nps += ", Passive";
	
	if ($('#promoter:checked').length > 0)
		nps += ", Promoter";
	
	if (nps == "")
		nps += "none";
	
	return nps;
}

function getCheckedProductGroup() {	
	let group = "";

	if ($('#product-a:checked').length > 0)
		group += " Product Group A";
	
	if ($('#product-b:checked').length > 0)
		group += " Product Group B";
	
	if ($('#product-c:checked').length > 0)
		group += " Product Group C";

	if ($('#product-d:checked').length > 0)
		group += " Product Group D";	
	
	return group;
}

$(function() {
	$('.navigation__pages-titles li').clone().appendTo($('.burger-menu__nav'));
	$('.burger-menu__nav li').addClass('burger-menu__link');
	$('.burger-menu__nav li').removeClass('pages-titles__link');
	
	var $more_btn = $('.navigation button');
	
	var $titles = $('.navigation .navigation__pages-titles');
	var $overflow = $('.navigation .overflow');

	var titlesAmount = 0;
	var totalSpace = 0;
	var widths = [];

	$titles.children().outerWidth(function(i, w) {
		totalSpace += w;
		titlesAmount += 1;
		widths.push(totalSpace);
	});

	var  visibleTitles, availableSpace, requiredSpace;
	
	setFiltersPrintData();
	getBigTileData();
	checkTitlesWidths();

	function checkTitlesWidths() {
		availableSpace = $titles.width();
		visibleTitles = $titles.children().length;
		requiredSpace = widths[visibleTitles - 1];		
	
		while (requiredSpace > availableSpace) {
			$titles.children().last().prependTo($overflow);
			visibleTitles -= 1;	
																			
			if (visibleTitles = 0)
				break; 
				
			availableSpace = $titles.width();
			visibleTitles = $titles.children().length;
			requiredSpace = widths[visibleTitles - 1];

		} 
		
		while (availableSpace > widths[visibleTitles]) {
			$overflow.children().first().appendTo($titles);
			visibleTitles += 1;
													
			if (visibleTitles == titlesAmount)
				break;
							
			availableSpace = $titles.width();
			visibleTitles = $titles.children().length;
			requiredSpace = widths[visibleTitles - 1];					
		}
		
		if (titlesAmount == visibleTitles)
			$more_btn.hide();
		else 
			$more_btn.show();
	}

	$(window).resize(function() {
		checkTitlesWidths();
	});

	$more_btn.on('click', function() {			
		$overflow.toggleClass('hidden');
	});
	
	$('.burger-menu__button').on('click', function() {			
		openMenu();
	});
	
	$('.burger-menu__close').on('click', function() {			
		closeMenu();
	});
	
	$('.headcol').on('click', function() {			
		sortTableAlphabetically();
	});
	
	$('.main__icons').on('click', function() {			
		openNav();
	});
	
	$('.close-icon').on('click', function() {			
		closeNav();
	});
	
	$('#sort-osat').on('click', function() {			
		sortTableOsat();
	});
	
	$('#sort-rsp').on('click', function() {			
		sortTableRsp();
	});
	
	$('#sort-prd').on('click', function() {			
		sortTablePrd();
	});
	
	$('#detractor').on('change', function() {
		updateTilesData();
	});
	
	$('#passive').on('change', function() {
		updateTilesData();
	});
	
	$('#promoter').on('change', function() {
		updateTilesData();
	});
	
	$('#product-a').on('change', function() {
		updateTilesData();
	});
	
	$('#product-b').on('change', function() {
		updateTilesData();
	});
	
	$('#product-c').on('change', function() {
		updateTilesData();
	});
	
	$('#product-d').on('change', function() {
		updateTilesData();
	});
	
	var gaugeOptions = {
		chart: {
			type: 'solidgauge'
		},

		title: null,

		pane: {
			center: ['50%', '85%'],
			size: '100%',
			startAngle: -90,
			endAngle: 90,
			background: {
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
				innerRadius: '100%',
				outerRadius: '160%',
				shape: 'arc'
			}
		},

		exporting: {
			enabled: false
		},

		tooltip: {
			enabled: false
		},

		// the value axis
		yAxis: {
			stops: [
				[0.3, 'rgb(255, 179, 179)'], 
				[0.5, 'rgb(211,211,211)'],
				[0.8, 'rgb(179, 255, 217)'] 
			],
			lineWidth: 0,
			tickWidth: 0,
			minorTickInterval: null,
			tickAmount: 2,
			title: {
				y: -70
			},
			labels: {
				y: 1
			}
		},

		plotOptions: {
			solidgauge: {
				dataLabels: {
					y: 1,
					borderWidth: 0,
					useHTML: true
				}
			}
			
		}
	};

	//NPS
	var chartNps = Highcharts.chart('container-nps', Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 0,
			max: 10,
			title: {
				text: ''
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Nps',
			data: [ {
				y: getNpsAverageData(),
				radius: 160,
				innerRadius: 100
			}],
			dataLabels: {
				format:
					'<div style="text-align:center">' +
					'<span style="font-size:25px">{y}</span><br/>' +
					'</div>',
			},
			tooltip: {
				valueSuffix: ''
			}
		}]

	}));
	
	//Easy
	var chartEasy = Highcharts.chart('container-easy', Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 0,
			max: 100,
			title: {
				text: ''
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Easy',
			data: [ {
				y: getEasyAverageData(),
				radius: 160,
				innerRadius: 100
			}],
			dataLabels: {
				format:
					'<div style="text-align:center">' +
					'<span style="font-size:25px">{y}</span><br/>' +
					'</div>'
			},
			tooltip: {
				valueSuffix: ''
			}
		}]

	}));
	
	//Osat
	var chartOsat = Highcharts.chart('container-osat', Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 0,
			max: 100,
			title: {
				text: ''
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Osat',
			data: [ {
				y: getOsatAverageData(),
				radius: 160,
				innerRadius: 100
			}],
			dataLabels: {
				format:
					'<div style="text-align:center">' +
					'<span style="font-size:25px">{y}</span><br/>' +
					'</div>'
			},
			tooltip: {
				valueSuffix: ''
			}
		}]

	}));
	
	//Ltr
	var chartLtr = Highcharts.chart('container-ltr', Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 0,
			max: 100,
			title: {
				text: ''
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'Ltr',
			data: [ {
				y: getLtrAverageData(),
				radius: 160,
				innerRadius: 100
			}],
			dataLabels: {
				format:
					'<div style="text-align:center">' +
					'<span style="font-size:25px">{y}</span><br/>' +
					'</div>'
			},
			tooltip: {
				valueSuffix: ''
			}
		}]

	}));
	
	$.updateTilesData = function() {
		chartNps.series[0].update({
			data: [getNpsAverageData()]
		}, true); 
		
		chartEasy.series[0].update({
			data: [getEasyAverageData()]
		}, true);
		
		chartOsat.series[0].update({
			data: [getOsatAverageData()]
		}, true);
		
		chartLtr.series[0].update({
			data: [getLtrAverageData()]
		}, true);
		
		getBigTileData();
		setFiltersPrintData();
	};
	
});