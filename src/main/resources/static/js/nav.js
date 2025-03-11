$(document).ready(function() {
	window.apiUrl = $('#api-url').val();
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
				const plantListEl = $('#plant-list');
				const firstRegionCd = result[0].regionCd;
				
				$.each(result, function(idx, item) {
					const regionCd = item.regionCd;
					const regionName = item.regionName;
					const optionEl = `<option value=${regionCd}>${regionName}</option>`;
					
					plantListEl.append(optionEl);
				});
				
				// 기본 정보 세팅
				defaultSettings(firstRegionCd);
		    },
		    error: (x) => { console.log(x); }
		});
	}
});

function defaultSettings(regionCode) {
	const dto = {"date" : getCurrentDate(), "regionCode" : regionCode};
	
	$.ajax({
	    type: 'GET',
	    url: window.apiUrl + '/weather',
	    data: dto,
	    dataType: 'json',
	    contentType: 'application/json',
	    success: (data) => {
			console.log('data = ', data);
	    },
	    error: (x) => { console.log(x); }
	})
}

function getCurrentDate() {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');

    let resultDate = `${year}-${month}-${day}`;

	return resultDate;
}