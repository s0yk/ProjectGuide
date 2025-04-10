/*
 * 함수  : 
 * 설명  : 단순 액티브 스타일 변경
 * 기능  : 클릭한 요소에 클래스 추가, 클릭하지 않은 요소에 클래스 제거 
 * 조건  : 요소 모두 형제 관계 HTML
 */

$('.element').eq(0).addClass('is-active'); // 첫번째 요소에 초기 액티브 설정 
$('.element').click(function(){
    $('.element').removeClass('is-active'); // 모든 요소 탭 액티브 제거
    $(this).addClass('is-active'); // 클릭한 요소만 액티브 추가
})

/*
 * 함수  :  
 * 설명  : 파일첨부 커스텀
 * 기능  : 파일 첨부 시 지정 요소에 해당 파일명 디스플레이
 * 조건  : input type="file" 필수
 */

$('.file').on('change', function() {
    var fileName = $(this).val().split(/\\|\//).pop(); // 파일 경로 슬래시 제거
    if (fileName) {
        $(this).siblings('.upload-name').val(fileName);
    } else {
        $(this).siblings('.upload-name').val(''); // 비어있을 경우 초기화
    }
});

/*
 * 함수  : 
 * 설명  : 아코디언, 슬라이드 기능
 * 기능  : 요소 클릭 시 연결된 콘텐츠 슬라이드
 * 조건  : 연결된 콘텐츠가 요소 다음에 위치해야함 
 */

let $article = $('.accordian li a')
$('.accordian-content').hide(); // 초기 콘텐츠 hide

$article.click(function(){
    $('.accordian-content').not($(this).next()).hide() 
    $(this).next('.accordian-content').slideToggle(500)
})

/*
 * 함수  : 
 * 설명  : 비밀번호 숨기기,보이기 (*****)
 * 기능  : 클릭 시 요소의 type 변환, type에 따라 아이콘 변경
 * 조건  :  
 */

const $secretInput = $('.input')
const $showIcon = $('.icon')

$showIcon.click(function(){
    // 클릭 시 password일 시 text, text일 시에는 password
    let type = $secretInput.attr('type') === 'password' ? 'text' : 'password';
    $secretInput.attr('type', type)

    // 타입에 따라 아이콘 변경
    if (type === 'password'){
        $showIcon.removeClass('visible-icon')
        $showIcon.addClass('hide-icon');
    } else {
        $showIcon.removeClass('hide-icon')
        $showIcon.addClass('visible-icon');
    }
})

/*
 * 함수  : 
 * 설명  : 첨부파일 용량 제한
 * 기능  : 파일 업로드 시 용량 체크 후 지정 용량 초과 시 alert 
 * 조건  :  
 */

$("[type=file]").on('change', function(){
    var totalSize = 0;

    // 1MB = 1024 * 1024 Byte
    var maxSize = 600 * 1024 * 1024;

    $.each($(this)[0].files, function(i,v){
        // 총 파일 크기에 각 파일 크기 더하기
        totalSize += v.size;
    });

    if(totalSize > maxSize){
        alert("첨부파일 사이즈는 600MB 이내로 등록 가능합니다.")
        $(this).val(null)
    }
})

/*
 * 함수  : layersPop
 * 설명  : 다중 레이어 팝업 관리
 * 기능  : event 발생 개체 
 * 조건  : 버튼에 click 이벤트로 연결된 팝업 지정 ex) click=layersPop(#sample)
 */

function layersPop(target){    
    $('#' + target).fadeIn().addClass('is-open');
    $('#' + target).attr('tabindex', 0).focus(); // 해당 요소 키보드로 접근할 수 있게 속성 설정
    $('body').append('<div class="layer-bg"></div>')
    $('body').css('overflow', 'hidden') // 스크롤 잠금
}



