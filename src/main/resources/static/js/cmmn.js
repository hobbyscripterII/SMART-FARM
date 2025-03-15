$(document).ready(() => {
	// API URL
	window.apiUrl = $('#api-url').val();
	
    // 현재 시간 표출
    yyyyMMddhhmmss();
    setInterval(yyyyMMddhhmmss, 1000);
});

function yyyyMMdd() {
    let currentDate = new Date();
    let year        = currentDate.getFullYear();
    let month       = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day         = currentDate.getDate().toString().padStart(2, '0');
    let resultDate  = `${year}-${month}-${day}`;

	return resultDate;
}

function yyyyMMddhhmmss() {
    let currentDate = new Date();
    let year        = currentDate.getFullYear();
    let month       = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day         = currentDate.getDate().toString().padStart(2, '0');
    let hours       = currentDate.getHours().toString().padStart(2, '0');
    let minutes     = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds     = currentDate.getSeconds().toString().padStart(2, '0');
    let resultDate  = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    $('#time').html(resultDate);
}