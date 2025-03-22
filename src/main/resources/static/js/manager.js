$(document).ready(() => {
	$.ajax({
	    type : 'GET',
	    url : window.apiUrl + '/manager',
	    // data : dto,
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
					const el 		  = `<tr onclick="modifyForm()"><td>${id}</td><td>${name}</td><td>${tel}</td><td>${regionNames}</td></tr>`;
					
					$('table').append(el);
				});
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
});

function modifyForm() {
	const title = '알림';
	const text  = '데이터를 로드할 수 없습니다.';
	const icon  = 'error';

	sweetAlert(title, text, icon);
}

function search() {
	const title = '알림';
	const text  = '데이터를 로드할 수 없습니다.';
	const icon  = 'error';

	sweetAlert(title, text, icon);
}