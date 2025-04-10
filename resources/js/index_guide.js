    /* 검색 전환 */
    $('.search-form .btn-function').eq(0).addClass('is-active')
    $('.search-form .btn-function').click(function () {
        $('.search-form .btn-function').not($(this)).removeClass('is-active')
        $(this).addClass('is-active');
    })

    let searchMode = "fastmode"; // 기본값을 패스트 모드로 설정
    const fastModeBtn = document.querySelector('#fastModeBtn')
    const slowModeBtn = document.querySelector('#slowModeBtn')
    fastModeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        searchMode = "fastmode";
        searchBtn.disabled = true;
    })
    slowModeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        searchMode = "slowmode"
        searchBtn.disabled = false;
    })
    let filterValue;
    let searchTbody;
    let rows;
    document.addEventListener('DOMContentLoaded', function () {
        if (searchMode = "fastmode") {
            searchBtn.disabled = true;
        } else {
            searchBtn.disabled = false;
        }
        const searchInput = document.querySelector('#search')
        searchTbody = document.querySelector('.file_lst tbody');
        searchInput.addEventListener('keyup', function () {
            filterValue = searchInput.value;
            if (searchMode == "fastmode") {
                // 해당 요소의 tr들 모두 배열로 넣기
                rows = searchTbody.querySelectorAll('tr');
                for (var i = 0; i < rows.length; i++) {
                    var rowText = rows[i].textContent;
                    if (rowText.includes(filterValue)) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none'
                    }
                }
            }
        })
    })
    // 검색 버튼 기능
    const searchBtn = document.querySelector('#search-confirm')
    searchBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const pageNameRows = searchTbody.querySelectorAll('tr');
        let matched = false;
        for (var i = 0; i < pageNameRows.length; i++) {
            var pageNumText = pageNameRows[i].textContent;
            // 각각의 tr의 text컨텐츠의 filterValue가 포함되어있다면, tr의 display값을 'block'
            if (pageNumText.includes(filterValue)) {
                pageNameRows[i].style.display = '';
                matched = true;
            } else {
                pageNameRows[i].style.display = 'none';
            }
        }
        // 검색어가 없을 경우
        if (matched === false) {
            const noDataTr = document.createElement('tr')
            const noDataTd = document.createElement('td')
            noDataTd.textContent = "조회된 데이터가 없습니다.";
            noDataTd.setAttribute('colspan', '6');
            noDataTd.setAttribute('style', 'text-align: center;');
            noDataTr.appendChild(noDataTd);
            searchTbody.appendChild(noDataTr);
            return false;
        }
    })

    // 총 건수 저장, 바인딩
    function getTotal(){
        let dataLength = $('table.file_lst tbody').find('tr').length;

        $('.total-num #total').before("&nbsp;") // 강제 공백 삽입
        $('.total-num #total').text(dataLength)
    }

    $(function(){
        getTotal()

        const headerHeight = $('header').outerHeight();
        $('#container').css('padding-top', headerHeight + 56)
        $('.sidebar').css('min-height', `calc(100vh - ${headerHeight}px)`)
    })