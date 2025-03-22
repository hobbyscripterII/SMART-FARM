$(document).ready(function() {
	let regionCode = null;
	changeNavActive();  // 클릭 메뉴 강조 효과
	subNavClickEvent(); // sub-nav 클릭 시 a 태그 트리거
	
	const houseListEl 		    = $('#house-list');
	let localStorageRegiconCode = localStorage.getItem('regionCode'); // 로컬 스토리지에 담긴 지역 코드 확인
	const regionCodes 			= $('#region-cds').val() || '';
	const dto 					= {"regionCodes" : regionCodes};
	
	if(regionCodes != '') {
		$.ajax({
		    type : 'GET',
		    url : window.apiUrl + '/region',
		    data : dto,
		    dataType : 'json',
		    contentType : 'application/json',
		    success : (data) => {
				const result 	    = data.data;
				const regionCodeMap = new Map();
				let optionEl 		= '';
				
				$.each(result, function(idx, item) {
					const regionCode = item.regionCd;
					const regionName = item.regionName.replaceAll('_', ' ');
					
					if(localStorageRegiconCode != regionCode) {
						optionEl += `<option value=${regionCode}>${regionName}</option>`;
					} else {
						// localStorage에 저장된 지역 코드가 해당 지역 코드와 일치할 경우 백업 후 제일 위에 표출
						regionCodeMap.set('regionCode', regionCode);
						regionCodeMap.set('regionName', regionName);
					}
				});
				
				houseListEl.append(optionEl);
				
				if(regionCodeMap != null) {
					houseListEl.prepend(`<option value=${regionCodeMap.get('regionCode')}>${regionCodeMap.get('regionName')}</option>`);
					houseListEl.val(houseListEl.find('option:first').val());
				}
				
				regionCode       = result[0].regionCd;
				const currentUrl = window.location.pathname;
				const targetUrl  = '/manager/home';

				// 차트 표출하는 페이지에 있을 경우에만 차트 정보 변경 이벤트 실행
				if(currentUrl == targetUrl) {
					getChart(regionCode);
				}
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

function changeHouse(el) {
	const regionCode = ($(el).val()).trim();
	
	localStorage.setItem('regionCode', regionCode);
	
	const currentUrl = window.location.pathname;
	const targetUrl  = '/manager/home';
	
	// 차트 표출하는 페이지에 있을 경우에만 차트 정보 변경 이벤트 실행
	if(currentUrl == targetUrl) {
		getChart(regionCode);
	}
}