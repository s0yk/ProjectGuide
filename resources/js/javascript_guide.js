/*
 * 함수  :
 * 설명  : Javascript 탭 , 접근성 WAL-ARIA 포함
 * 기능  : 탭 버튼 클릭 시 탭 액티브 스타일 지정, 연결된 탭 콘텐츠 show 및 액티브 스타일 지정
 * 조건  : 탭 버튼과 탭 콘텐츠 아이디 값 및 role 속성 연결 필요
 */

const tabButtons = document.querySelectorAll('[role="tab"]');
const tabContents = document.querySelectorAll('[role="tabpanel"]');

tabButtons.forEach((button) => {
	button.addEventListener("click", () => {
		// 버튼 액티브 제거
		tabButtons.forEach((btn) => {
			btn.classList.remove("is-active");
			// 접근성 속성 false 설정
			btn.setAttribute("aria-selected", "false");
		});
		tabContents.forEach((content) => {
			content.classList.remove("is-active");
		});

		// 연결된 탭 콘텐츠 확인
		const controlId = button.getAttribute("aria-controls");
		const controlTabContent = document.getElementById(controlId);
		button.classList.add("active");
		button.setAttribute("aria-selected", "true");
		controlTabContent.classList.add("active");
	});
});

/*
 * 함수  : elements.init()
 * 설명  : 요소 초기 클래스 설정
 * 기능  : Dom 로드 시 해당 요소에 클래스 지정
 * 조건  : Dom 로드 시 함수 호출 필요
 */

const elements = {
	init: () => {
		const targets = document.querySelectorAll(".target");

		targets.forEach((target) => {
			target.classList.add("default-class");
		});
	},
};

document.addEventListener("DOMContentLoaded", () => {
	elements.init();
});

/*
 * 함수  :
 * 설명  : URL별 기능 분배
 * 기능  : URL 값 추출 후 해당 값 포함 여부에 따라 기능 실행
 * 조건  :
 */

const URL = window.location.href.split("/").reverse()[0];

if (URL.includes("A")) {
	console.log("A 페이지 기능");
} else if (URL.includes("B")) {
	console.log("B 페이지 기능");
}

/**
 * 함수명 :
 * 설명   : 스크롤 올릴 때 헤더 상단 고정
 * param  :
 */

let lastScrollTop = 0;
$(window).scroll(function () {
	let gnbg_cnt = $(".gnb-backdrop").length;
	let gnbg_dis = $(".gnb-backdrop").css("display");

	let scrollTop = $(this).scrollTop();
	let headerHeight = $(".ly-header").outerHeight();

	if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
		$(".ly-header").addClass("is-shadow"); // 20250103 스타일 추가가
		$(".ly-header").removeClass("is-fixed");
	} else if (scrollTop < lastScrollTop || scrollTop <= headerHeight) {
		if (gnbg_cnt == 0 || gnbg_dis == "none") {
			$(".ly-header").addClass("is-fixed"); // 스크롤을 올릴 때 헤더를 고정
		}
	}
	if (scrollTop <= headerHeight) {
		$(".ly-header").removeClass("is-fixed"); // 단 스크롤 높이 값이 header의 Height값보다 작아진다면 relative로 다시 전환하기 (최상단 애니메이션 막기)
		$(".ly-header").removeClass("is-shadow"); // 20250103 스타일 추가가
	}

	lastScrollTop = scrollTop;
	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 스크롤이 0일 때 음수로 가지 않게 함
});

/*
	tit: Header nav open
	dec: 1Depth 선택 시 해당 하위메뉴 열림/닫힘
*/
$(".gnb .gnb-main-list .gnb-main-btn").on("click", function () {
	let isActive = $(this).parent().hasClass("is-active");
	if (!isActive) {
		setHeaderFixPad();
		$(".gnb-sub-list .gnb-sub-inner-list > ul > li").removeClass("is-active");
		$(".gnb-main-list > li").removeClass("is-active");
		$(this).parent().addClass("is-active");
		gnbBgOpen(true);
		gnbDepth2Active();
	} else {
		setHeaderFixPad();
		$(".gnb-sub-list .gnb-sub-inner-list > ul > li").removeClass("is-active");
		$(this).parent().removeClass("is-active");
		gnbBgOpen(false);
	}

	gnbMenuSizeChange($(this));
});

/*
	tit: 3Depth open
	dec: 2Depth 선택 시 해당 하위메뉴 보이기
*/
$(".gnb-sub-list .gnb-sub-inner-list > ul > li .gnb-sub-btn").on("click", function () {
	$(".gnb-sub-list .gnb-sub-inner-list > ul > li").removeClass("is-active");
	$(this).parent().addClass("is-active");
	gnbMenuSizeChange($(this));
});

/*
	func.	 gnbDepth2Active
	dec.	 2Depth 선택 시 active 효과 처리
*/
function gnbDepth2Active() {
	$(".gnb-sub-list").each(function () {
		$(this).find(".gnb-sub-inner-list > ul > li").eq(0).addClass("is-active");
	});
}

/*
	func.	 gnbBgOpen
	dec.	 gnb open 시 배경 visible 처리
*/
function gnbBgOpen(isOpen) {
	if (isOpen) {
		$(".is-dimmed").remove();
		$("body").append('<div class="is-dimmed gnb-bg"></div>');
	} else {
		gnbDepth2Active();
		$(".is-dimmed").remove();
	}
}

/*
	func.	 gnbBgOpen
	dec.	 gnb 배경 클릭 시 gnb 비활성화 및 배경 비활성화
*/
$("body").on("click", ".gnb-bg.is-dimmed", function () {
	$(this).hide();
	$(".gnb .gnb-main-list li").removeClass("is-active");
});

/*
	func.	 gnbMenuSizeChange
	dec.	 gnb 동적 높이 제어
*/
function gnbMenuSizeChange(e) {
	let meLi = e.closest("li"); // 가장 가까운 li 선택
	let gnbSubMenu = meLi.children(".gnb-sub-list"); // 해당 li의 서브 메뉴 가져오기

	if (!gnbSubMenu.length) return; // 서브 메뉴가 없으면 종료

	let liSum = 0;
	let wrap = 0;

	// 서브 메뉴 내부의 모든 `.gnb-sub-btn`이 포함된 'li'의 높이 합산
	gnbSubMenu
		.find(".gnb-sub-btn")
		.parent()
		.each(function () {
			liSum += $(this).outerHeight(true); // margin 포함 높이

			if ($(this).hasClass("is-active")) {
				wrap = $(this).find(".gnb-detail-list").outerHeight(true) + 16; // 여백 포함
			}
		});

	let max = Math.max(liSum, wrap);

	console.log("최대 높이: ", max); // 콘솔에서 높이 값 확인

	gnbSubMenu.css("min-height", max + "px"); // 높이 적용
}
function setHeaderFixPad() {
	// $('#wrap').css('padding-top', "19.4rem");
	// $('.ly-header').css('position', 'fixed');
}
function unsetHeaderFixPad() {
	// $('#wrap').css('padding-top', "0rem");
	// $('.ly-header').css('position', 'relative');
}

/*
	func.	 gnb open-close(mo ver.)
	dec.	 모바일 메뉴 열림/닫힘 제어
*/
$(".btn-navi").on("click", function () {
	$(".gnb-sm").addClass("is-open");
	$("body").css("overflow", "hidden");
});
$(".btn-gnb-close").on("click", function () {
	$(".gnb-sm").removeClass("is-open");
});

/*
	func.	 1Depth Active style(mo ver.)
	dec.	 모바일 1Depth Active css 추가
*/
$(".gnb-sm .gnb-main-list > ul > li > a").on("click", function () {
	let activeMenu = $(".gnb-sm .gnb-main-list > ul > li > a");
	$(activeMenu).removeClass("is-active");
	$(this).addClass("is-active");
});

/*
	func.	 gnb 3Depth open-close(mo ver.)
	dec.	 모바일 3Depth 열림/닫힘 제어
*/
let hasDepth = $(".has-depth3");
$(hasDepth).on("click", function () {
	if (!$(this).hasClass("is-open")) {
		$(hasDepth).removeClass("is-open");
		$(hasDepth).siblings(".gnb-detail-list").hide();
		$(this).addClass("is-open");
		$(this).siblings(".gnb-detail-list").show();
	} else {
		$(this).removeClass("is-open");
		$(this).siblings(".gnb-detail-list").hide();
	}
});

/*
	func.	 lnb 3Depth open-close
	dec.	 lnb 3Depth 열림/닫힘 제어
*/
let lnbMainBtn = $(".lnb-main-btn");
let lnbSubBtn = $(".lnb-sub-btn");
$(lnbMainBtn).on("click", function () {
	$(lnbSubBtn).siblings(".lnb-detail-list").slideUp();
	$(lnbSubBtn).removeClass("is-open");
	if (!$(this).hasClass("is-open")) {
		$(lnbMainBtn).siblings(".lnb-sub-list").slideUp();
		$(lnbMainBtn).removeClass("is-open");
		$(this).addClass("is-open");
		$(this).siblings(".lnb-sub-list").slideDown();
	} else {
		$(this).removeClass("is-open");
		$(this).siblings(".lnb-sub-list").slideUp();
	}
});
$(lnbSubBtn).on("click", function () {
	if (!$(this).hasClass("is-open")) {
		$(lnbSubBtn).removeClass("is-open");
		$(this).addClass("is-open");
		$(this).siblings(".lnb-detail-list").slideDown();
	} else {
		$(this).removeClass("is-open");
		$(this).siblings(".lnb-detail-list").slideUp();
	}
});
