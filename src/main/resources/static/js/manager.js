$(document).ready(() => {
	$.ajax({
	    type : 'GET',
	    url : window.apiUrl + '/manager',
	    dataType : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const status = data.status;
			
			if(status != '200') {
				const title = '알림';
				const text  = '데이터를 로드할 수 없습니다.';
				const icon  = 'error';

				sweetAlert(title, text, icon);
			} else {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const id   		  = item.id   || '';
					const name 		  = item.name || '';
					const tel  		  = item.tel  || '';
					const regionNames = (item.regionNames).replaceAll(';', ',').replaceAll('_', ' ') || '';
					const el 		  = `<tr ondblclick="modifyForm('${id}')"><td>${id}</td><td>${name}</td><td>${tel}</td><td>${regionNames}</td></tr>`;
					
					$('table').append(el);
				});
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
});

function modifyForm(id) {
	const dto = {"id" : id};
	
	$.ajax({
	    type : 'GET',
	    url : window.apiUrl + '/manager/detail',
		data : dto,
	    dataType : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const status = data.status;
			
			if(status != '200') {
				const title = '알림';
				const text  = '데이터를 로드할 수 없습니다.';
				const icon  = 'error';

				sweetAlert(title, text, icon);
			} else {
				const result      = data.data;
				const id   		  = result.id   || '';
				const name 		  = result.name || '';
				const tel  		  = result.tel  || '';
				const regionNames = (result.regionNames).replaceAll(';', ',').replaceAll('_', ' ') || '';
				const useYn		  = 'Y';
				
				$('.modal-title').text('매니저 상세 조회');
				$('#manager-id').val(id);
				$('#manager-name').val(name);
				$('#manager-tel').val(tel);
				$('#manager-region-names').val(regionNames);
				
				if(useYn == 'Y') {
					$('#manager-use').prop('checked', true);
				} else {
					$('#manager-use').prop('checked', false);
				}

				$('#overlay, #modal').show();
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

function search() {
	const title = '알림';
	const text  = '현재 개발 중인 기능입니다.';
	const icon  = 'info';

	sweetAlert(title, text, icon);
}