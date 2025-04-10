$(document).ready(() => {
	search();
});

function search() {
	$('table tbody').html('');
	
	const managerName = $('#search-manager-name').val() || '';
	const regionName  = $('#search-region-name').val() || '';
	const dto         = {'managerName' : managerName, 'regionName' : regionName};
	
	$.ajax({
	    type : 'GET',
	    url : window.apiUrl + '/manager',
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
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const id   		  = item.id    || '';
					const name 		  = item.name  || '';
					const tel  		  = item.tel   || '';
					const useYn		  = item.useYn == 'Y' ? '사용' : '미사용';
					const useYnColor  = useYn == '사용' ? 'blue' : 'red';
					const regionName  = (item.regionName).replaceAll(';', ',').replaceAll('_', ' ') || '';
					const el 		  = `<tr onclick="modifyForm('${id}')">
											<td>${id}</td>
											<td>${name}</td>
											<td>${tel}</td>
											<td>${regionName}</td>
											<td style="color:${useYnColor}">${useYn}</td>
										 </tr>`;
					
					$('table tbody').append(el);
				});
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

function addForm() {
	// $('#form')[0].reset();
	// $('#region-cd').html('');
	// $('#save').removeAttr('onclick');
	
	/*
	$.ajax({
	    type : 'GET',
	    url : window.apiUrl + '/region/root',
		data : null,
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
				const result   = data.data;
				let regionList = null;

				$.each(result, function(idx, item) {
					const regionName = (item.regionName).replaceAll('_', ' ') || '';
					regionList += `<option value="${item.regionCd}">${regionName}</opion>`;
				});

				$('.modal-title').text('매니저 등록');
				$('.alert-text').text('');
				$('#region-cd').append(regionList);
				$('#id').removeAttr('disabled');
				$('#save').attr('onclick', `add()`);
				$('#useYn').prop('checked', true);
				
				showModal();
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
	*/
	
	$('.modal-title').text('하우스 등록');
	showModal();
}

function add() {
	const title    = '알림';
	const icon     = 'error';
	const id	   = $('#id').val();
	const pwd	   = $('#pwd').val();
	const name     = $('#name').val();
	const tel      = $('#tel').val();
	const useYn    = $('#useYn').prop('checked') ? 'Y' : 'N';
	const regionCd = $('#region-cd').val();
	
	if(id == '' || id == null) {
		sweetAlert(title, '아이디를 입력해주세요.', icon);
		$('#id').focus();
		return false;
	}
	
	if(pwd == '' || pwd == null) {
		sweetAlert(title, '패스워드를 입력해주세요.', icon);
		$('#pwd').focus();
		return false;
	}
	
	if(name == '' || name == null) {
		sweetAlert(title, '이름을 입력해주세요.', icon);
		$('#name').focus();
		return false;
	}
	
	if(tel == '' || tel == null) {
		sweetAlert(title, '전화번호를 입력해주세요.', icon);
		$('#tel').focus();
		return false;
	}
	
	Swal.fire({
	  title				: '알림',
	  text				: '등록하시겠습니까?',
	  icon				: 'info',
	  showCancelButton	: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor	: '#d33',
	  confirmButtonText	: '확인',
	  cancelButtonText  : '취소'
	}).then((result) => {
	  if (result.isConfirmed) {
		let dto = {'id' : id, 'pwd' : pwd, 'name' : name, 'tel' : tel, 'regionCd' : regionCd, 'useYn' : useYn};
		
		$.ajax({
		    type : 'POST',
		    url  : window.apiUrl + '/manager',
			data : dto,
		    success: (data) => {
				const status = data.status;

				if(status != '200') {
					const title = '알림';
					const text  = '데이터를 등록할 수 없습니다.';
					const icon  = 'error';

					sweetAlert(title, text, icon);
				} else {
					Swal.fire({
					  title: '완료',
					  text : '등록이 완료되었습니다.',
					  icon : 'success',
					  timer: 2000,
					  showConfirmButton: false,
					  willClose: () => {
						location.reload();
					  }
					});
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	  }
	});
}

function modifyForm(id) {
	$('#save').removeAttr('onclick');
	$('#id').prop('disabled', true);
	
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
				const result         = data.data;
				const id   		     = result.id    || '';
				const name 		     = result.name  || '';
				const tel  		     = result.tel   || '';
				const useYn		     = result.useYn || '';
				const regionCode     = result.regionCode;
				const regionName     = (result.regionName).replaceAll('_', ' ') || '';
				const rootRegionInfo = result.rootRegionInfo;
				let regionList       = `<option value="${regionCode}">${regionName}</opion>`;
				
				$.each(rootRegionInfo, function(idx, item) {
					const regionName = (item.regionName).replaceAll('_', ' ') || '';
					
					regionList += `<option value="${item.regionCd}">${regionName}</opion>`;
				});
				
				$('.modal-title').text('매니저 상세 조회');
				$('.alert-text').text('미입력 시 기존 패스워드로 저장됩니다.');
				$('#id').val(id);
				$('#name').val(name);
				$('#tel').val(tel);
				$('#region-cd').append(regionList);
				$('#save').attr('onclick', `modify("${id}")`);
				
				if(useYn == 'Y') {
					$('#useYn').prop('checked', true);
				} else {
					$('#useYn').prop('checked', false);
				}

				showModal();
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

function modify(id) {
	Swal.fire({
	  title				: '알림',
	  text				: '수정하시겠습니까?',
	  icon				: 'info',
	  showCancelButton	: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor	: '#d33',
	  confirmButtonText	: '확인',
	  cancelButtonText  : '취소'
	}).then((result) => {
	  if (result.isConfirmed) {
		const pwd	   = $('#pwd').val();
		const name     = $('#name').val();
		const tel      = $('#tel').val();
		const useYn    = $('#useYn').prop('checked') ? 'Y' : 'N';
		const regionCd = $('#region-cd').val();
		let dto        = {'id' : id, 'pwd' : pwd, 'name' : name, 'tel' : tel, 'regionCd' : regionCd, 'useYn' : useYn};
		
		$.ajax({
		    type : 'PATCH',
		    url  : window.apiUrl + '/manager',
			data : dto,
		    success: (data) => {
				const status = data.status;

				if(status != '200') {
					const title = '알림';
					const text  = '데이터를 로드할 수 없습니다.';
					const icon  = 'error';

					sweetAlert(title, text, icon);
				} else {
					Swal.fire({
					  title: '완료',
					  text : '수정이 완료되었습니다.',
					  icon : 'success',
					  timer: 2000,
					  showConfirmButton: false,
					  willClose: () => {
						location.reload();
					  }
					});
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	  }
	});
}