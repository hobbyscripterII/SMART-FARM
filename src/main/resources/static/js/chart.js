function getChart(regionCode) {
	const regionCodeTemp = $('#house-list').val();
	const timeInterval   = $('#search-date').val();
	regionCode  		 = regionCode == '' ? regionCodeTemp : regionCode;
	const dto   		 = {"date" : yyyyMMdd(), "regionCode" : regionCode, "timeInterval" : timeInterval};
	const title 		 = ($('#house-list').find(':selected').text()).trim();
	let timeIntervalText = timeInterval == 'DAY' ? '시간' : timeInterval == 'MONTH' ? '일자' : '년도';	
	
	$.ajax({
	    type	    : 'GET',
	    url		    : window.apiUrl + '/weather',
	    data	    : dto,
	    dataType    : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const result 		   = data.data;
			const firstTemperature = result[0].temperature;
			
			/*
			if(timeInterval == 'DAY' && firstTemperature == null) {
				const title = '알림';
				const text  = '데이터를 로드할 수 없습니다.';
				const icon  = 'error';
				
				sweetAlert(title, text, icon);
			}
			*/
			
			let datasets           = null;
			const statusArr        = [];
			const temperatureArr   = [];
			const windPwrArr       = [];
			const windDirectionArr = [];
			const updateDttmArr    = [];
			const humidityArr      = [];
			
			$.each(result, function(idx, item) {
				const status        = item.status;
				const temperature   = item.temperature;
				const windPwr       = item.windPwr;
				const windDirection = item.windDirection;
				const updateDttm    = item.updateDttm;
				const humidity      = item.humidity;
				
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
			    type: 'spline'
			  },
			  title: {
			    text: title
			  },
			  xAxis: {
				visible: false
			  },
			  yAxis: {
				min: -10,
				max: 10,
			    title: {
			      text: '°C'
			    }
			  },
			  tooltip: {
			      shared		  : true,
			      useHTML		  : true,
				  backgroundColor : 'white',
				  borderColor	  : '#ccc',
				  outside		  : true,
				  style			  : {
								         padding    : '10px',
								         color      : '#333',
								         fontSize   : '12px',
								         fontWeight : 'bold',
								         boxShadow  : '0px 4px 6px rgba(0, 0, 0, 0.1)'
								     },
			      formatter: function () {
			          let index = this.points[0].point.index;
					  
			          return `
								  ${timeIntervalText}: ${datasets.xData[index]}<br>
								  상태: ${datasets.datasets[0].data[index]}<br>
								  온도: ${datasets.datasets[1].data[index]}°C<br>
								  습도: ${datasets.datasets[4].data[index]}%<br>
								  풍속: ${datasets.datasets[2].data[index]}m/s<br>
								  풍향: ${datasets.datasets[3].data[index]}
					         `;
			      }
			  },
			  plotOptions: {
			    spline: {
			        dataLabels : {
			        enabled    : true,
			        useHTML    : true,
			        formatter  : function () {
			          let index = this.point.index;
					  
					  return `
						      <div style="min-width: 30px; text-align: center; white-space: nowrap;">
						        ${datasets.datasets[1].data[index]}°C<br>
						        ${datasets.xData[index]}
						      </div>
							 `;
			        }
			      },
			      enableMouseTracking: true
			    }
			  },
			  series: [
				{
				    name: '온도',
				    data: datasets.datasets[1].data.map(value =>
						(value === null) ? null : Number(value)
					),
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
	
	getSensor(regionCode);
}

function getSensor(regionCode) {
	const sensorDataEl = $('.sensor-data');
	
	sensorDataEl.html(''); // 센서 데이터 초기화
	
	let sensorData   = '';
	const sensorList = {
					     'temp' : {name: '온도'  , unit: '°C'},
					     'humi' : {name: '습도'  , unit: '%' },
					     'open' : {name: '개폐량' , unit: '%' },
					     'light': {name: '일조량' , unit: 'LX'}
						};
	
	regionCode = ''; // 추후 센서 API 연동 시 해당 소스코드 제거
	
	if(regionCode == '' || regionCode == null || regionCode == undefined) {
		sensorData = getSensorDummyData();
	} else {
		// Ajax 호출 로직
		// ...
	}

	Object.entries(sensorList).forEach(([eng, { name, unit }]) => {
	    const el = `<div>
	                    <p class="pb">${name}</p>
	                    <span class="${eng}">${sensorData[eng]}</span><span> ${unit}</span>
	                </div>`;

	    sensorDataEl.append(el);
	});
}

function getSensorDummyData() {
    return { temp : 18, humi : 60, open : 20, light : 70 };
}