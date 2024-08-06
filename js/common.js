window.addEventListener('load', function () {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

$(document).ready(function () {
    // 탭 메뉴 클릭 시 해당 탭 박스 표시
    $('.tab-menu li').click(function () {
        var index = $(this).index();
        $('.tab-menu li').removeClass('active');
        $(this).addClass('active');
        $('.tab-box').removeClass('show');
        $('.tab-box').eq(index).addClass('show');
        // 해당 탭의 guide-tab의 첫 번째 li에 active 클래스 추가
        $('.tab-box').eq(index).find('.guide-tab li:first').addClass('active');
        // 해당 탭의 첫 번째 guide-box에 show 클래스 추가
        $('.tab-box').eq(index).find('.guide-box:first').addClass('show');
    });

    // 초기에 첫 번째 탭과 첫 번째 guide-tab에 active 클래스 추가
    $('.tab-menu li:first').addClass('active');
    $('.guide-tab li:first').addClass('active');

    // 첫 번째 tab-box와 첫 번째 guide-box에 show 클래스 추가
    $('.tab-box:first').addClass('show');
    $('.tab-box:first .guide-box:first').addClass('show');

    // guide-tab의 li 클릭 시 해당 index에 맞는 guide-box 표시
    $('.guide-tab li').click(function () {
        var index = $(this).index();
        $('.guide-tab li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.tab-box').find('.guide-box').removeClass('show');
        $(this).closest('.tab-box').find('.guide-box').eq(index).addClass('show');
    });


    // menu-btn 클릭 시 메뉴 토글
    $(document).on('click', '.menu-btn', function () {
        $('.mo-nav, .black-overlay').toggleClass('show');
        $('body').toggleClass('overflow-hidden');
    });

    // 모바일 네비게이션 링크 클릭 시 네비게이션 닫기
    $(document).on('click', '.mo-nav a', function () {
        $('.mo-nav, .black-overlay').removeClass('show');
        $('body').removeClass('overflow-hidden');
    });

    // 창 크기 변화 시 처리
    function checkWindowWidth() {
        if ($(window).width() >= 481) {
            $('.mo-nav, .black-overlay').removeClass('show');
            $('body').css('overflow', 'auto');
        }
    }

    checkWindowWidth();

    $(window).resize(function () {
        checkWindowWidth();
    });
});

/* youtube */
$(document).ready(function () {
    var apiKey = 'AIzaSyBlutTPaSd_dQRXEHXfyKs-SkbGjYfaf-c';
    /* youtube video id */
    /* https://www.youtube.com/watch?v=UZjGcAjd8Ok */
    var videoId = 'UZjGcAjd8Ok';
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

    function formatNumberWithUnit(number) {
        if (number >= 100000000) {
            return (number / 100000000).toFixed(0) + '억';
        } else if (number >= 10000000) {
            return (number / 10000000).toFixed(0) + '천만';
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(0) + '백만';
        } else {
            return formatNumber(number);
        }
    }

    function fetchVideoDetails() {
        var currentTime = new Date();
        var minutes = currentTime.getMinutes();
        var roundedMinutes = Math.floor(minutes / 5) * 5;
        currentTime.setMinutes(roundedMinutes);

        $('.youtube-info-text').text(formatDate(currentTime) + ' 기준');

        $.ajax({
            url: apiUrl,
            dataType: 'json',
            data: {
                key: apiKey,
                part: 'snippet,statistics',
                id: videoId
            },
            success: function (data) {
                var thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
                var videoLink = 'https://www.youtube.com/watch?v=' + videoId;
                var viewCount = data.items[0].statistics.viewCount;

                $('.thumbnail').css('background-image', 'url(' + thumbnailUrl + ')');
                $('.youtube-box a').attr('href', videoLink);
                $('#viewCount').text(formatNumber(viewCount)+' 회');

                var targetMilestone = calculateTargetMilestone(viewCount);
                var percentage = (viewCount / targetMilestone) * 100;
                var formattedPercentage = percentage.toFixed(2);

                $('.youtube-progress .percent').attr('per', formattedPercentage + '%');

                $('.youtube-progress .percent').css('width', '0');

                var currentWidth = 0;
                var interval = 20;
                var steps = 2000 / interval;

                var animationInterval = setInterval(function () {
                    currentWidth += percentage / steps;
                    $('.youtube-progress .percent').css('width', currentWidth + '%');

                    $('.youtube-info-box .target').text('목표: ' + formatNumberWithUnit(targetMilestone));

                    if (currentWidth >= percentage) {
                        clearInterval(animationInterval);
                    }
                }, interval);
            },
            error: function (error) {
                console.error('YouTube 비디오 세부 정보를 가져오는 중 오류:', error);
                $('#viewCount').text('Error');
            }
        });
    }

    function formatNumber(number) {
        return new Intl.NumberFormat().format(number);
    }

    function formatDate(date) {
        return date.toLocaleString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Seoul'
        }).replace(',', '');
    }

    /* 조회수 목표 */
    function calculateTargetMilestone(viewCount) {
        if (viewCount < 1000000) {
            return 1000000;
        } else if (viewCount < 2000000) {
            return 2000000;
        } else if (viewCount < 3000000) {
            return 3000000;
        } else if (viewCount < 400000) {
            return 400000;
        } else if (viewCount < 500000) {
            return 500000;
        } else if (viewCount < 600000) {
            return 600000;
        } else if (viewCount < 700000) {
            return 700000;
        } else if (viewCount < 800000) {
            return 800000;
        } else if (viewCount < 900000) {
            return 900000;
        } else if (viewCount < 1000000) {
            return 1000000;
        } else if (viewCount < 2000000) {
            return 2000000;
        } else if (viewCount < 3000000) {
            return 3000000;
        } else if (viewCount < 4000000) {
            return 4000000;
        } else if (viewCount < 5000000) {
            return 5000000;
        } else if (viewCount < 6000000) {
            return 6000000;
        } else if (viewCount < 7000000) {
            return 7000000;
        } else if (viewCount < 8000000) {
            return 8000000;
        } else if (viewCount < 9000000) {
            return 9000000;
        } else if (viewCount < 10000000) {
            return 10000000;
        }

        return 10000000;
    }

    setInterval(fetchVideoDetails, 300000);

    fetchVideoDetails();
});

function openOneClick() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        $('#oneClickPopMo').addClass('show');
        $('body').css('overflow', 'hidden');
    } else {
        $('#oneClickPopPC').addClass('show');
        $('body').css('overflow', 'hidden');
    }
}

/* constId = songId */
function openBuySong() {
    var isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    if (isIOS) {
        location.href = "melonapp://webview?url=https://m2.melon.com/buy/contents/purchase.htm?paramsName=contsId&contsId=37436295&byContsId=37436295&bySclasCode=FG1102&prodSclasCode=FG1102&byCodecTypeCode=AG0113&price=700&contsType=3C0001&tab=BUYSONG&menuId=1000000386&paymtAmt=700&prodId=&retUrl=&buyActUrl=%2Fcommerce%2Fm%2Fchannel%2Fcontents%2Fmobileapp%2Fandroidchannel_downloadProc.htm&viewType=&isNineteenContentExcept=N&pocId=AS20&memberKey=1";
        
    } else {
        $('#mobilePop .popup-box .text').text('아이폰 전용 기능입니다.');
        $('#mobilePop').addClass('show');
        $('body').css('overflow', 'hidden');
    }
}

function openBuyFlac() {
    var isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    if (isIOS) {
        location.href = "melonapp://webview?url=https://m2.melon.com/buy/contents/purchase.htm?paramsName=contsId&contsId=37436295&byContsId=37436295&bySclasCode=FG1106&prodSclasCode=FG1106&byCodecTypeCode=AG0113&price=1000&contsType=3C0001&tab=BUYFLACSONG&menuId=1000002721&paymtAmt=1000&downType=&prodId=&retUrl=&buyActUrl=%2Fcommerce%2Fm%2Fchannel%2Fcontents%2Fmobileapp%2Fandroidchannel_downloadProc.htm&viewType=&isNineteenContentExcept=N&pocId=AS20&memberKey=1";

    } else {
        $('#mobilePop .popup-box .text').text('아이폰 전용 기능입니다.');
        $('#mobilePop').addClass('show');
        $('body').css('overflow', 'hidden');
    }
}

function openBuyMV() {
    var isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    if (isIOS) {
        location.href = "melonapp://webview?url=https://m2.melon.com/buy/contents/purchase.htm?paramsName=contsId&contsId=50147972&byContsId=50147972&byconstsdevice=SMART&byCodecTypeCode=AG0242&byquality=AG1001&price=1000&contsType=3C0002&tab=MV&menuId=60030101&paymtAmt=1000&prodId=&retUrl=&buyActUrl=%2Fcommerce%2Fm%2Fchannel%2Fcontents%2Fmobileapp%2Fandroidchannel_downloadProc.htm&viewType=&isNineteenContentExcept=N&pocId=AS20&memberKey=1"
    } else {
        $('#mobilePop .popup-box .text').text('아이폰 전용 기능입니다.');
        $('#mobilePop').addClass('show');
        $('body').css('overflow', 'hidden');
    }
}

function openCash() {
    var mobile = /iPhone|iPad/i.test(navigator.userAgent);
    if (mobile) {
        window.open('https://m2.melon.com/buy/meloncash/charge.htm')
    } else {
        window.open('https://www.melon.com/buy/meloncash/charge.htm')
    }
}

function openMelonAwards() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var url = isMobile ?
        'https://into.melon.com/2023_weekaward' :
        'https://www.melon.com/melonaward/weekAward.htm';

    window.open(url);
}

function openRadioOneclick() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        window.open('https://sites.google.com/view/doyoungstrm/radio');
    } else {
        $('#mobilePop .popup-box .text').text('모바일 전용 기능입니다.');
        $('#mobilePop').addClass('show');
        $('body').css('overflow', 'hidden');
    }
}

function closePop() {
    $('#mobilePop').removeClass('show');
    $('#oneClickPopPC').removeClass('show');
    $('#oneClickPopMo').removeClass('show');
    $('#listPop').removeClass('show');
    $('body').css('overflow', 'auto');
}

function openCircleChart() {
    window.open('https://circlechart.kr/page_chart/onoff.circle?serviceGbn=S1040');
}


function twitterhash1() {
    window.open('https://twitter.com/intent/post?text=%23밝게_빛나던_도영이의_17 %23DOYOUNG_17_OutNow')
}

function twitterhash2() {
    window.open('https://twitter.com/intent/post?text=%23행운토끼야_7개의_네잎클로버_부탁해')
}

// 스밍 원클릭

/* melon */
function oneMelonPc() {
    window.open('https://han.gl/m-pc');
}

function oneMelonAnd1() {
    window.open('https://han.gl/m-and1');
}

function oneMelonAnd2() {
    window.open('https://han.gl/m-and2');
}

function oneMelonAnd3() {
    window.open('https://han.gl/m-and3');
}

function oneMelonAnd4() {
    window.open('https://han.gl/m-and4');
}

function oneMelonIos() {
    window.open('https://han.gl/m-ios');
}

function oneMelonIpad() {
    window.open('https://han.gl/m-ipad');
}

/* genie */
function oneGeniePc() {
    window.open('https://han.gl/genie-pc');
}

function oneGenieAnd() {
    window.open('https://han.gl/genie-and');
}

function oneGenieIos() {
    window.open('https://han.gl/genie-ios');
}

/* bugs */
function onekBugsPc() {
    window.open('https://han.gl/bugs-pc');
}

function oneBugsMo() {
    window.open('https://han.gl/bugs-mobile');
}


/* vibe */
function oneVibeMo1() {
    window.open('https://han.gl/v-1');
}

function oneVibeMo2() {
    window.open('https://han.gl/v-2');
}

function oneVibeMo3() {
    window.open('https://han.gl/v-3');
}

function oneVibeMo4() {
    window.open('https://han.gl/v-4');
}

function oneFlo() {
    window.open('https://han.gl/flo');
}



function openList() {
    $('#listPop').addClass('show');
    $('body').css('overflow', 'hidden');
}