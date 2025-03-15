$(document).ready(function() {
	const regionCode = ($('#house-list').find(':selected').val()).trim();
	
	getChart(regionCode);
	getSensor();
});

function getChart(regionCode) {
	const dto   = {"date" : yyyyMMdd(), "regionCode" : regionCode};
	const title = ($('#house-list').find(':selected').text()).trim();
	
	// 센서 데이터 초기화
	const sensorDataEl = $('.sensor-data');
	sensorDataEl.html('');
	
	$.ajax({
	    type: 'GET',
	    url: window.apiUrl + '/weather',
	    data: dto,
	    dataType: 'json',
	    contentType: 'application/json',
	    success: (data) => {
			const result = data.data;
			
			let datasets = null;
			const statusArr = [];
			const temperatureArr = [];
			const windPwrArr = [];
			const windDirectionArr = [];
			const updateDttmArr = [];
			const humidityArr = [];
			
			$.each(result, function(idx, item) {
				const status = item.status;
				const temperature = item.temperature;
				const windPwr = item.windPwr;
				const windDirection = item.windDirection;
				const updateDttm = item.updateDttm;
				const humidity = item.humidity;
				
				statusArr.push(status);
				temperatureArr.push(temperature);
				windPwrArr.push(windPwr);
				windDirectionArr.push(windDirection);
				updateDttmArr.push(updateDttm);
				humidityArr.push(humidity);
			});
			
			datasets = `
				{
					"xData": ${JSON.stringify(updateDttmArr)},
					"datasets": [
						{
							"name": "상태",
							"data": ${JSON.stringify(statusArr)},
							"unit": "",
							"type": "line",
							"valueDecimals": 1
						},
						{
							"name": "온도",
							"data": ${JSON.stringify(temperatureArr)},
							"unit": "°C",
							"type": "line",
							"valueDecimals": 1
						},
						{
							"name": "풍속",
							"data": ${JSON.stringify(windPwrArr)},
							"unit": "m/s",
							"type": "line",
							"valueDecimals": 1
						},
						{
							"name": "풍향",
							"data": ${JSON.stringify(windDirectionArr)},
							"unit": "",
							"type": "line",
							"valueDecimals": 1
						},
						{
							"name": "습도",
							"data": ${JSON.stringify(humidityArr)},
							"unit": "%",
							"type": "line",
							"valueDecimals": 1
						}
					]
				}
			`;
			
			datasets = JSON.parse(datasets);
			
			Highcharts.chart('container', {
			  chart: {
			    type: 'line'
			  },
			  title: {
			    text: title
			  },
			  xAxis: {
			    categories: datasets.xData
			  },
			  yAxis: {
			    title: {
			      text: '°C'
			    }
			  },
			  tooltip: {
			      shared: true,
			      useHTML: true,
			      formatter: function () {
			          let index = this.points[0].point.index;
					  
			          return `
			              <b>${datasets.xData[index]}</b><br>
			              온도: ${datasets.datasets[1].data[index]}°C<br>
			              습도: ${datasets.datasets[4].data[index]}%<br>
			              풍속: ${datasets.datasets[2].data[index]}m/s<br>
			              풍향: ${datasets.datasets[3].data[index]}
			          `;
			      }
			  },
			  plotOptions: {
			    line: {
			      dataLabels: {
					enabled: true
				},
			      enableMouseTracking: true
			    }
			  },
			  series: [
				{
				    name: '온도',
				    data: datasets.datasets[1].data.map(value => Number(value)),
				    tooltip: {
						valueSuffix: datasets.datasets[1].unit
					}
				}
			  ]
			});
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

function getSensor() {
	const sensorDataEl    = $('.sensor-data');
	const sensorDummyData = getSensorDummyData();
	const sensorList      = {
							    'temp' : {name: '온도' , unit: '°C'},
							    'humi' : {name: '습도' , unit: '%' },
							    'open' : {name: '개폐량', unit: '%' },
							    'light': {name: '일조량', unit: 'LX'}
							};

	// onclick="getChart('${eng}')"
	
	Object.entries(sensorList).forEach(([eng, { name, unit }]) => {
	    const el = `<div>
	                    <p class="pb">${name}</p>
	                    <span class="${eng}">${sensorDummyData[eng]}</span><span> ${unit}</span>
	                </div>`;

	    sensorDataEl.append(el);
	});
}

function getSensorDummyData() {
    return { temp : 0, humi : 0, open : 0, light : 0 };
}