$(document).ready(function() {
	let regionCode = null;
	
	changeNavActive();  // 클릭 메뉴 강조 효과
	subNavClickEvent(); // sub-nav 클릭 시 a 태그 트리거
	
	const houseListEl   = $('#house-list');
	const regionCodeMap = JSON.parse(localStorage.getItem('regionCodeMap')); // 로컬 스토리지에 담긴 지역 코드 확인
	
	if(regionCodeMap) {
		const jsonParseMap = new Map(Object.entries(regionCodeMap));
		regionCode         = jsonParseMap.get('regionCode');
		const regionName   = jsonParseMap.get('regionName');
		const optionEl     = `<option value=${regionCode}>${regionName}</option>`;

		houseListEl.append(optionEl);
	}

	const regionCodes = $('#region-cds').val() || '';
	const dto = {"regionCodes" : regionCodes};
	
	if(regionCodes != '') {
		$.ajax({
		    type: 'GET',
		    url: window.apiUrl + '/region',
		    data: dto,
		    dataType: 'json',
		    contentType: 'application/json',
		    success: (data) => {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const regionCode = item.regionCd;
					const regionName = item.regionName.replaceAll('_', ' ');
					const optionEl   = `<option value=${regionCode}>${regionName}</option>`;
					
					houseListEl.append(optionEl);
				});
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
});


// sub-nav 클릭 시 a 태그 트리거 이벤트
function subNavClickEvent() {
	$(document).on('click', '.sub-nav', function() {
		window.location = $(this).find('a').attr('href');
	})
}

// 클릭 메뉴 강조 효과 이벤트
function changeNavActive() {
	const currentPath = window.location.pathname;
    const subPlantEl  = $('.sub-nav');
	
    subPlantEl.each((idx, el) => {
		const elHref = $(el).find('a').attr('href');

        // 기존 active 효과 제거
        $(el).removeClass('active');
		
        if(currentPath == elHref) {
            $(el).addClass('active');
        }
    });
}

function chagePlant(el) {
	localStorage.removeItem('regionCodeMap');
	
	const regionCode    = ($(el).val()).trim();
	const regionName    = ($(el).find(':selected').text()).trim();
	const regionCodeMap = new Map();
	
	regionCodeMap.set('regionCode', regionCode);
	regionCodeMap.set('regionName', regionName);
	
	localStorage.setItem('regionCodeMap', JSON.stringify(Object.fromEntries(regionCodeMap)));
	
	const currentUrl = window.location.pathname;
	const targetUrl  = '/manager/home';
	
	// 차트 표출하는 페이지에 있을 경우에만 차트 정보 변경 이벤트 실행
	if(currentUrl == targetUrl) {
		getChart(regionCode);
		getSensor();
	}
}