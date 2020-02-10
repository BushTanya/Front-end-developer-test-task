$(function() {
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