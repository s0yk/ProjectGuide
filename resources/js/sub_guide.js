// 헤더 푸터 제외 컨텐츠 100vh 계산, 스타일 적용
function getMaxHeightSubContainer(){
    const headerHeight = $('#guide-header').outerHeight();
    const footerHeight = $('#guide-code').outerHeight();
    const maxHeight = `calc(100vh - (${headerHeight + footerHeight}px))`  

    $('#guide-contents').css('max-height', maxHeight)
}

// URL별 가이드 전용 클래스 바인딩
function setClassByUrl(){
    const URL = (window.location.href).split('/').reverse()[1];

    switch (true){
        case URL.includes('base'):
            $('#guide-header').addClass('base');
            $('.cate').text('base')
            break;
        case URL.includes('layout'):
            $('#guide-header').addClass('layout');
            $('.cate').text('layout')
            break;
        case URL.includes('component'):
            $('#guide-header').addClass('component');
            $('.cate').text('component')
            break;
    }
}

// 각 태그 내 코드 복사
function codeClone(){
    let html;
    let css;
    let js;

    html = $('#guide-contents')
    .clone()
    .find('.tlt')
    .remove()
    .end()
    .prop('outerHTML')

    if (html == ''){
        html = 'html 코드가 없습니다.'
    }

    if ($('style').length > 0){
        // 250314 :: 이민혁 full Calendar style 해제
        css = $('style:not([data-fullcalendar])').prop('outerHTML')
    } else {
        css  = 'css 코드가 없습니다.'
    }

    let scriptLength = 0;

    // liveServer script 제외하기
    $('body > script').each(function(index, script){
        if (!$(script).html().includes('WebSocket')){
            scriptLength++
        }
    })

    if (scriptLength > 0){    
        js = $('body > script').prop('outerHTML')
    } else {
        js = 'js 코드가 없습니다.'
    }


    replaceTag(html, css, js)
}

// 복사된 코드 겉 태그 삭제
function replaceTag(html, css, js){
    html = html.replace(/<section id="guide-contents"[^>]*>/g, '').replace(/<\/section>/g, '');
    css = css.replace(/<style[^>]*>/g, '').replace(/<\/style>/g, '');
    js = js.replace(/<script[^>]*>/g, '').replace(/<\/script>/g, '');


    formattBindCode(html, '.language-html')
    formattBindCode(css , '.language-css')
    formattBindCode(js, '.language-js')
}

// 공백 초기화, 복사 내용 바인딩
function formattBindCode(content, container){
    if (!content.includes('없습니다')){
        let formattContent = content.split('\n');
        formattContent = formattContent.filter(line => line.trim() !== '');
    
        let formattSpace = formattContent.map(line => line.match(/^\s*/)[0].length)
        let minSpace = Math.min(...formattSpace)
        
        formattContent = formattContent.map(line => line.slice(minSpace))
        formattContent = formattContent.join('\n')
    
        content = formattContent;    
    }

    $('code' + container).text(content)
}

$(function(){
    setClassByUrl()
    codeClone()
    getMaxHeightSubContainer()
    Prism.highlightAll()


    // code 클립보드 복사 기능
    $('.copy-btn').click(function(){ 
        if ($(this).text() == 'COPY'){
            var tempEl = document.createElement("textarea");
            document.body.appendChild(tempEl);
        
            var copyText = $(this).parent().siblings('code').text();
            tempEl.value = copyText;

            // Clipboard API
            tempEl.select();
            tempEl.setSelectionRange(0,9999);
            document.execCommand("copy");
            tempEl.setSelectionRange(0,0);
            document.body.removeChild(tempEl);
            
            $(this).text('COPIED!');
        } else {
            $(this).text('COPY');
        }
    })
})