$(document).ready(function() {
	// 클릭 메뉴 강조 효과
	changeNavActive();
	
	// sub-nav 클릭 시 a 태그 트리거
	subNavClickEvent();
	
	const regionCodes = $('#region-cds').val() || '';
	const dto = {"regionCodes" : regionCodes};
	
	if(regionCodes != '') {
		// 작물 목록 세팅
		$.ajax({
		    type: 'GET',
		    url: window.apiUrl + '/region',
		    data: dto,
		    dataType: 'json',
		    contentType: 'application/json',
		    success: (data) => {
				const result = data.data;
				const houseListEl = $('#house-list');
				const firstRegionCd = result[0].regionCd;
				
				$.each(result, function(idx, item) {
					const regionCd = item.regionCd;
					const regionName = item.regionName;
					const optionEl = `<option value=${regionCd}>${regionName}</option>`;
					
					houseListEl.append(optionEl);
				});
				
				// 기본 정보 세팅
				defaultSettings(firstRegionCd);
		    },
		    error: (x) => { console.log(x); }
		});
	}
});

function defaultSettings(regionCode) {
	const dto = {"date" : yyyyMMdd(), "regionCode" : regionCode};
	
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
			// const sensorDefaultList = getSensorDefaultList();
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
				[
					{
						"name": "상태",
						"data": ${statusArr},
						"unit": "",
						"type": "line",
						"valueDecimals": 1
					},
					{
						"name": "온도",
						"data": ${temperatureArr},
						"unit": "°C",
						"type": "line",
						"valueDecimals": 1
					},
					{
						"name": "풍속",
						"data": ${windPwrArr},
						"unit": "m/s",
						"type": "line",
						"valueDecimals": 1
					},
					{
						"name": "풍향",
						"data": ${windDirectionArr},
						"unit": "",
						"type": "line",
						"valueDecimals": 1
					},
					{
						"name": "습도",
						"data": ${humidityArr},
						"unit": "%",
						"type": "line",
						"valueDecimals": 1
					}
				]
			`;
			
			// console.log('datasets = ', datasets);
			
	    },
	    error: (x) => { console.log(x); }
	})
}

function getChartDataInfo(type) {
	let chartInfoClass = {};
}

function subNavClickEvent() {
	$(document).on('click', '.sub-nav', function() {
		window.location = $(this).find('a').attr('href');
	})
}

function changeNavActive() {
	const currentPath = window.location.pathname;
    const subPlantEl = $('.sub-nav');
	
    subPlantEl.each((idx, el) => {
		const elHref = $(el).find('a').attr('href');

        // 기존 active 효과 제거
        $(el).removeClass('active');
		
        if(currentPath == elHref) {
            $(el).addClass('active');
        }
    });
}

function getSensorDefaultList() {
	const sensorList = {
	    'temp' : {name: '온도' , unit: '°C'},
	    'humi' : {name: '습도' , unit: '%' },
	    'open' : {name: '개폐량', unit: '%' },
	    'light': {name: '일조량', unit: 'LX'}
	};
	
	return sensorList;
}