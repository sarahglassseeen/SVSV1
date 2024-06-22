
$(function() {
    Wstoast.config({
        autoClose: true,
        showClose: true,
        html: true
    })
let WsLoaded = false; 
const messages = [
    { message: 'Đang tải tài nguyên...', delay: 0 },
    { message: 'Đang tải các plugins...', delay: 5000 },
    { message: 'Chờ xíu sắp tải xong....', delay: 12000 },
    { message: 'Có thể mất nhiều thời gian', delay: 20000 }
];
messages.forEach(msg => {
    setTimeout(() => {
        if (!WsLoaded) {
            Wstoast.closeAll();
            WsToast('loading', msg.message);
        }
    }, msg.delay);
});
    function WsToast(type, message) {
        switch (type) {
            case 'error':
                Wstoast.error(message);
                break;
            case 'success':
                Wstoast.success(message);
                break;
            case 'info':
                Wstoast.info(message);
                break;
            case 'loading':
                Wstoast.loading(message);
                break;
            default:
                console.error('error toast');
        }
    }

    /**
     * Frame FPS inspection area.
     */
    if (null == window.localStorage.getItem("fpson") || "1" == window.localStorage.getItem("fpson")) {
        var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                window.setTimeout(e, 1e3 / 60)
            },
            Frame = 0,
            AllFrameCount = 0,
            LastTime = Date.now(),
            LastFameTime = Date.now(),
            loop = function() {
                var e = Date.now(),
                    a = e - LastFameTime,
                    o = Math.round(1e3 / a);
                if (LastFameTime = e, AllFrameCount++, Frame++, e > 1e3 + LastTime) {
                    var o = Math.round(1e3 * Frame / (e - LastTime));
                    var n;
                    if (o >= 120) {
                        n = '<span style="color:#00c78f">Máy Khoẻ😛</span>';
                    } else if (o <= 5) {
                        n = '<span style="color:#c70000">Lag Nổ Máy🤢</span>';
                    } else if (o <= 10) {
                        n = '<span style="color:red">Siêu Lag😭</span>';
                    } else if (o <= 15) {
                        n = '<span style="color:red">Quá Lag😖</span>';
                    } else if (o <= 25) {
                        n = '<span style="color:orange">Khó Chịu😨</span>';
                    } else if (o < 35) {
                        n = '<span style="color:#9338e6">Không Mượt Lắm🙄</span>';
                    } else if (o <= 45) {
                        n = '<span style="color:#f51698">Tạm Ổn😧</span>';
                    } else if (o <= 55) {
                        n = '<span style="color:#068c18">Ổn Định😁</span>';
                    } else if (o >= 80 && o <= 120) {
                        n = '<span style="color:#c70000">Mượt Quá😘</span>';
                    } else {
                        n = '<span style="color:#009e45">Bình Thường😂</span>';
                    }
                    $("#fps").html(`<font color="#640366">FPS:${o} ${n}</font>`);
                    Frame = 0;
                    LastTime = e;
                }
                rAF(loop)
            };
        loop()
    } else $("#fps").css("display", "none!important");
    /**
     * Type Text.
     */
    var usernames = $('#userName').data('username');
    if (usernames) {
        new Typed('#userName', {
            strings: usernames,
            typeSpeed: 60,
            loop: true
        });
    } else {
        Wstoast.error('Username is undefined or null');
    }

   

    //- @Mở & Ẩn Màn Hình Khoá -//
    $('.td-lock-screen').click(function() {
        $('.td-welcome').slideUp('slow');
        $('.td-lock-screen').animate({
            opacity: 0
        }, 'slow').css('pointer-events', 'none');
    });

    //- @Ấn Hoặc Vuốt Sẽ Ẩn Màn Hình Khoá -//
    $(document).on('swiperight', function() {
        $('.td-welcome').slideDown('slow');
        $('.td-lock-screen').animate({
            opacity: 1
        }, 'fast').css('pointer-events', 'auto');
    });

    $(document).on('swipeleft', function() {
        $('.td-welcome').slideUp('slow');
        $('.td-lock-screen').animate({
            opacity: 0
        }, 'slow').css('pointer-events', 'none');
    });

    $(document).on("visibilitychange", function() {
        if (!document.hidden) {
            setTimeout(function() {
                var scrollPos = $(window).scrollTop();
                var windowHeight = $(window).height();
                var documentHeight = $(document).height();
                var scrollPercentage = (scrollPos / (documentHeight - windowHeight)) * 100;

                if (scrollPos === 0) {
                    $('.td-welcome').slideDown('slow');
                    $('.td-lock-screen').animate({
                        opacity: 1
                    }, 'fast').css('pointer-events', 'auto');
                }

                if (scrollPercentage === 100) {
                    $('.td-welcome').slideUp('slow');
                    $('.td-lock-screen').animate({
                        opacity: 0
                    }, 'slow').css('pointer-events', 'none');
                }
            }, 200);
        }
    });
    //- @Activite Menu -//
    if (GetCookie("SettingPanelShown") !== "true") {
        $("#SettingPanel").addClass("open"); // Tự động mở bảng setting nếu trong 1 ngày họ vào trang web lần đầu tiên
        document.cookie = "SettingPanelShown=true; max-age=" + (60 * 60 * 24) + "; path=/";
    }
    //- @Nhấn Để Mở Menu Setting -//
    $(".toggle").click(function() {
        $("#SettingPanel").toggleClass("open");
    });
    //- ==@ Nhấn Bất Kì Ở Đâu Để Đóng Menu Setting @== -//
    $(document).mouseup(function(e) {
        var container = $("#SettingPanel");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("open");
        }
    });
    //- @Change Background -//
    if (GetCookie("background-theme")) {
        $("body").css("background-image", "url(" + GetCookie("background-theme") + ")");
        $(".nk-opt-item.active").removeClass("active");
        $(".nk-opt-item[data-bg='" + GetCookie("background-theme") + "']").addClass("active");
    } else {
        var DefaultBg = $(".nk-opt-item[data-bg]:eq(0)").data("bg"); // Chọn Background Mặc Định (eq tức chọn ảnh nào là mặc định 0->4)
        $("body").css("background-image", "url(" + DefaultBg + ")");
        $(".nk-opt-item.active").removeClass("active");
        $(".nk-opt-item[data-bg='" + DefaultBg + "']").addClass("active");
        document.cookie = "background-theme=" + DefaultBg;
    }
    $(".nk-opt-set").on("click", ".nk-opt-item[data-bg]", function() {
        var $nkOptSet = $(this).closest(".nk-opt-set");
        $nkOptSet.find(".nk-opt-item[data-bg].active").removeClass("active");
        $(this).addClass("active");
        $("body").css("background-image", "url(" + $(this).data("bg") + ")");
        document.cookie = "background-theme=" + $(this).data("bg");
    });
    //- @Mode Destroy -//
    $(".nk-opt-set").on("click", ".nk-opt-item[data-mode]", function() {
        var mode = $(this).data("mode");
        if (mode === "DisableDestroy") {
            $(".nk-opt-item[data-mode='EnableDestroy']").removeClass("active");
            $(this).addClass("active");
            $("#main-container2").fadeOut(2000);
            $("#main-container").delay(2000).fadeIn(2000);
        } else if (mode === "EnableDestroy") {
            function A() {
                for (i = 0; i < DIL; i++)(DIS = DI[i].style).position = "absolute", DIS.left = Math.sin(R * x1 + i * x2 + x3) * x4 + x5 + "px", DIS.top = Math.cos(R * y1 + i * y2 + y3) * y4 + y5 + "px";
                R++
            }
            R = 0, x1 = .1, y1 = .05, x2 = .25, y2 = .24, x3 = 1.6, y3 = .24, x4 = 10, y4 = 10, x5 = 0, y5 = 0, DIL = (DI = document.getElementsByTagName("img")).length, setInterval(A, 5);
            OpenWindowError();
            WindowErrorSound()
            $("#SettingPanel").hide();
            $(".nk-opt-item[data-mode='DisableDestroy']").removeClass("active");
            $(this).addClass("active");
            $("#main-container").fadeOut(2000);
            $("#main-container2").delay(2000).fadeIn(2000);
        }
    });
   //- @Theme Menu -//
$(document).ready(function() {
    // Set default theme to dark mode
    $(".nk-demo-panel").addClass("dark-mode");
    $(".nk-demo-panel").attr("style", "background:#101924!important;color:#b6c6e3");
    $(".loading-bg").addClass("dark-loader");
    document.cookie = "theme-mode=dark";

    $(".nk-opt-item[data-update]").click(function() {
        var UpdateMode = $(this).data("update");
        $(".nk-opt-item[data-update]").removeClass("active");
        $(this).addClass("active");
        if (UpdateMode === "dark-mode") {
            $(".nk-demo-panel").addClass("dark-mode");
            $(".nk-demo-panel").attr("style", "background:#101924!important;color:#b6c6e3");
            $(".loading-bg").addClass("dark-loader");
            document.cookie = "theme-mode=dark";
        }
    });
});

    //- ==@ Thay Đổi Giao Diện Profile @== -//
   $(".change-skin").click(function() {
    var $html = $('html');
    if (!$html.hasClass('dark')) {
        $html.addClass('dark');
        document.cookie = "theme-skin=dark";
        $('.theme-icon').removeClass('ni-sun').addClass('ni-moon');
    }
});

var $html = $('html');
$html.addClass('dark');
$('.theme-icon').removeClass('ni-sun').addClass('ni-moon');

//- @Cookie Theme Menu-//
if (GetCookie("theme-mode") === "dark") {
    $(".nk-opt-item[data-update='dark-mode']").click();
}

$(".setting-site").click(function(event) {
    event.stopPropagation();
    $("#nav").toggleClass("hide");
    $("#share_card").addClass("td-popup_on");
});

$(".close-nav").click(function() {
    $("#nav").addClass("hide");
    $("#share_card").addClass("td-popup_on");
});

    //- ==@ Sài ToolTip Của jBox @== -//
    new jBox('Tooltip', {
        attach: '.td_copy',
        trigger: 'mouseenter',
        content: $(this).attr('title'),
        position: {
            x: 'center',
            y: 'bottom'
        }
    });
    $(".td_copy").on("click touchend", function() {
        var textarea = $("<textarea>")
            .val($(this).text().trim())
            .css({
                position: "fixed",
                top: 0,
                left: 0,
                opacity: 0
            })
            .appendTo("body");
        textarea[0].focus();
        textarea[0].select();
        try {
            var successful = document.execCommand("copy");
            var message = successful ? "Đã sao chép liên kết" : "Không thể sao chép liên kết.";
            if (successful) {
                WsToast('success', message);
            } else {
                WsToast('error', message);
            }
        } catch (err) {
            WsToast('error', 'Không thể sao chép liên kết.');
        }

        textarea.remove();
    });

    //- @Chuyển Hướng Trong Data-Href-//
    class Redirection {
        constructor(href) {
            this.href = encodeURIComponent(href);
        }
        RedirectClick() {
            window.open(decodeURIComponent(this.href), '_blank'); // Sài window.open thay cho window.location.href, nếu muốn sài thì cứ thay.
        }
    }
    $('.link-item').click(function(e) {
        e.preventDefault();
        new Redirection($(this).attr('data-href')).RedirectClick();
    });
    $(document).click(function(event) {
        if (!$(event.target).closest('.td-popup').length && !$(event.target).is('.setting-site')) {
            $("#nav").addClass("hide");
            $("#share_card").removeClass("td-popup_on").addClass("td-popup_off");
        }
    });
    //- @Hàm Lấy Cookie-//
    function GetCookie(name) {
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
    //- @Click To Full Screen -//
    $(".full-screen").on("click", function() {
        var elem = document.documentElement;
        if (fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled) {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    /* Chrome, Safari & Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
        } else {
            WsToast('error', 'Trình duyệt không hỗ trợ chế độ này.');
        }
    });
    //- @Music Play-//
   // Check if music should play
if (GetCookie('WsPlayMusic') && GetCookie('MusicDisabled') !== 'true') {
    new Audio(GetCookie('WsPlayMusic')).addEventListener('canplay', function () { this.play(); });
}

class MusicPlayer {
    constructor() {
        this.u = "";
        this.a = null;
        this.l = true;
        this.n = null;
        this.te = null;
        this.tt = "";
        this.initials = {};
        $(".music_menu_list li").each((index, element) => {
            const url = $(element).attr("url");
            const title = $(element).find(".title").text();
            this.initials[url] = title;
        });
        $(".music_menu_list li").click(this.MusicPlay.bind(this));
    }

    MusicPlay(event) {
        const selectedLi = $(event.currentTarget);
        const url = selectedLi.attr("url");

        if (this.u === url && this.a && !this.a.paused) {
            this.a.pause();
            this.te.text(this.tt);
            WsToast('info', 'Đã Tắt Nhạc:');
            document.cookie = "MusicDisabled=true; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Lưu trạng thái tắt nhạc vào cookie
        } else {
            $(".music_menu_list li").removeClass("selected");
            selectedLi.addClass("selected");

            Wstoast.closeAll();

            let titleElement = selectedLi.find(".title");
            let title = titleElement.text();

            if (this.u !== url || !this.a || this.a.paused) {
                titleElement.text("Đang phát...");
            }
            WsToast('success', 'Đang phát: ' + title);
            if (this.a && !this.a.paused) {
                this.a.pause();
            }
            const newAudio = new Audio(url);
            newAudio.addEventListener('ended', this.NextMusic.bind(this));
            newAudio.play();

            this.a = newAudio;
            this.u = url;
            this.te = titleElement;
            this.tt = title;

            document.cookie = `WsPlayMusic=${url}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        }
    }

    NextMusic() {
        let s = $(".music_menu_list li.selected");
        let n = s.next();

        if (n.length === 0 && !this.l) {
            return;
        }

        if (n.length === 0 && this.l) {
            n = $(".music_menu_list li:first-child");
        }

        s.removeClass("selected");
        n.addClass("selected");

        const nu = n.attr("url");
        const na = new Audio(nu);
        na.addEventListener('ended', this.NextMusic.bind(this));
        na.play();

        let t = n.find(".title");
        let o = t.text();

        let te = this.te;
        let tt = this.tt;

        t.text("Đang phát...");
        WsToast('success', 'Bài kế tiếp: ' + o);

        if (this.a && !this.a.paused) {
            this.a.pause();
        }

        if (this.u === nu && !this.a.paused) {
            return;
        }
        const currentUrl = this.u;
        const currentTitle = this.initials[currentUrl];
        s.find(".title").text(currentTitle);

        this.a = na;
        this.u = nu;
        this.n = null;
    }
}

    //- ==@ OBF Class Use Hex String (Fake) @== -//
    class O {
        constructor() {
            this.o = Array.from({
                length: 20
            }, () => '\\x' + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16)).join('');
        }
    }
    (($) => {
        const o = new O();
        $('*').each(function() { // Sài * Tức Là Root (Chọn Tất Cả Thẻ HTML)
            $(this).addClass(o.o);
        });
    })(jQuery);
    setInterval(() => $('#real-time').text(new Date().toLocaleTimeString()), 1000);
    function ShowToast() {
        x.addClass('show');
        setTimeout(function(){ x.removeClass('show'); }, 5000);
    }      
    var x = $('#Toast');
    x.html('Resources Code V5.0.0');
    //- @Hiện/Ẩn Loader Screen Thông Minh-//
    const LoadingPercentage = $('#loading-percentage');
    let LoadingPercentageTimer;
    $(document).ready(function() {
        LoadingPercentageTimer = setInterval(function() {
            var progressBar = $('.pace-progress');
            if (!progressBar.length) return;
            var currentValue = progressBar.attr('data-progress-text');

            if (currentValue !== LoadingPercentage.text()) {
                LoadingPercentage.text(currentValue);
                var percentage = parseInt(currentValue);
                var translateValue = 'translate3d(' + percentage + '%, 0px, 0px)';
                progressBar.css('transform', translateValue);

                if (currentValue === '100%') {
                    $('.pace-active').animate({
                        top: '-100px'
                    }, 'slow', function() {
                        $(this).hide();
                    });
                    // Đây là đoạn mã ẩn loader screen dự phòng (theo tiến trình thư viện pace-progress), nếu pjax ko hoạt động
                    if ($('#loading-box').is(':visible')) {
                        ShowToast();
                        Wstoast.closeAll();
                        WsToast('info', 'Tài nguyên đã tải xong :)');
                        WsLoaded = true;
                        $('#loading-box').fadeOut('slow');
                    }
                    clearInterval(LoadingPercentageTimer);
                }
            }
        }, 100);
        //- @Sài pjax để ẩn khi trang đã tải xong-//
        const preloader = {
            endLoading: () => {
                Wstoast.closeAll();
                WsToast('info', 'Tài nguyên đã tải xong :)');
                $('#loading-box').fadeOut('slow');
                WsLoaded = true;
            },
            initLoading: () => {
                document.body.style.overflow = '';
                $('#loading-box').removeClass('loaded');
            }
        }

        $(window).on('load', () => {
            preloader.endLoading();
        });

        if (true) {
            $(document).on('pjax:send', () => {
                preloader.initLoading();
            });
            $(document).on('pjax:complete', () => {
                preloader.endLoading();
            });
        }
    });
    //- @Tự động thêm cache thông minh (khi sửa code trình duyệt sẽ lưu code cũ nên đây là đoạn mã giúp code luôn là mới nhất) có thể gây lag nếu host quá íu-//
    // $('script[src], link[rel="stylesheet"]').each(function() {
    //     var src=$(this).attr('src') || $(this).attr('href');
    //     if (src && (src.endsWith('.js') || src.endsWith('.css'))) {
    //         $(this).attr('src',src+src.includes('?')?'&':'?'+'v='+Math.random().toString(36).substr(2, 5));
    //     }
    // });
    //- @Thời Gian Đồng Hồ Ở Màn Hình Khoá (Lock-Screen)-//
    class ClockTime {
        constructor(element) {
            this.element = $(element);
            this.TimeNows();
            setInterval(() => this.TimeNows(), 1000);
        }

        TimeNows() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            this.element.text(`${hours}:${minutes}`);
        }
    }
    //- @Random Description & Chuyển Description Tự Động-//
    class Description {
        constructor(descriptions) {
            this.descriptions = descriptions;
            this.element = $('.web_desc');
            this.Description();
        }

        Description() {
            const description = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
            this.element.fadeOut(500, () => {
                this.element.html(description).fadeIn(500);
            });
        }
    }
    const descriptions = [
        "Gọi em là công chúa vì hoàng tử đang đứng chờ em nè!",
        "Chưa được sự cho phép mà đã tự ý thích em. Anh xin lỗi nhé công chúa!",
        "Em nhìn rất giống người họ hàng của anh. Đó chính là con dâu của mẹ anh!",
        "Trái Đất quay quanh Mặt Trời. Còn em thì quay mãi trong tâm trí anh!",
        "Vector chỉ có một chiều. Anh dân chuyên toán chỉ yêu một người.",
        "Anh béo thế này là bởi vì trong lòng anh có em nữa.",
        "Nghe đây! Em đã bị bắt vì tội quá xinh đẹp.",
        "Anh chỉ muốn bên cạnh em hai lần đó là bây giờ và mãi mãi.",
        "Bao nhiêu cân thính cho vừa? Bao nhiêu cân bả mới lừa được em?",
        "Vũ trụ của người ta là màu đen huyền bí. Còn vũ trụ của anh bé tí, thu nhỏ lại là em.",
        "Anh rất yêu thành phố này. Không phải vì nó có gì, mà vì nó có em.",
        "Anh bận với tất cả mọi điều. Nhưng vẫn luôn rảnh để nhớ đến em.",
        "Cành cây còn có lá. Chú cá vẫn đang bơi. Sao em cứ mải chơi. Chẳng chịu yêu anh thế!",
        "Em nhà ở đâu thế? Cứ tới lui trong tim anh không biết đường về nhà à?",
        "Cuộc đời anh vốn là một đường thẳng, chỉ vì gặp em mà rẽ ngang.",
        "Với thế giới em chỉ là một người. Nhưng với anh, em là cả thế giới.",
        "Em có thể đừng cười nữa được không? Da anh đen hết rồi.",
        "Anh đây chẳng thích nhiều lời. Nhìn em là biết cả đời của anh.",
        "Cảm lạnh có thể do gió, nhưng, cảm nắng thì chắc chắn do em.",
        "Trứng rán cần mỡ, bắp cần bơ. Yêu không cần cớ, cần em cơ!",
        "Cafe đắng thêm đường sẽ ngọt, còn cuộc đời anh thêm em sẽ hạnh phúc.",
        "Giữa cuộc đời hàng ngàn cám dỗ, nhưng, anh vẫn chỉ cần bến đỗ là em.",
        "Có người rủ anh đi ăn tối, nhưng anh từ chối vì thực đơn không có em.",
        "Em có biết vì sao đầu tuần lại bắt đầu bằng thứ hai không? Bởi vì em là thứ nhất!",
        "Oxy là nguồn sống của nhân loại. Còn em chính là nguồn sống của anh.",
        "Em bị cận thị à? Nếu không tại sao không nhìn thấy anh thích em chứ?",
        "Hôm qua anh gặp ác mộng vì trong giấc mộng đó không có em.",
        "Uống nhầm một ánh mắt, cơn say theo cả đời. Thương nhầm một nụ cười, cả một đời phiêu lãng.",
        "Dạo này em có thấy mỏi chân không? Sao cứ đi mãi trong đầu anh thế?",
        "Hình như em thích trà sữa lắm phải không? Anh cũng thích em như thế đấy.",
        "Nếu em là nước mắt thì anh sẽ không bao giờ khóc để lạc mất em đâu.",
        "Đôi mắt em còn xanh hơn cả Đại Tây Dương và anh thì bị lạc trên biển cả mất rồi.",
        "Nếu nụ hôn là những bông tuyết thì anh sẽ gửi đến em một cơn bão tuyết",
        "Phải chăng em là một ảo thuật gia? Bởi mỗi khi anh nhìn em là mọi thứ xung quanh đều biến mất.",
        "Anh có thể chụp ảnh em được không? Để chứng minh với lũ bạn rằng thiên thần là có thật.",
        "Anh có thể đi theo em được không? Bởi anh được bố mẹ dạy rằng phải theo đuổi giấc mơ của mình.",
        "Nếu khi anh nghĩ đến em mà có một ngôi sao biến mất. Vậy chắc cả bầu trời này không còn sao.",
    ];
    const description = new Description(descriptions);
    setInterval(() => description.Description(), 7000); // Chuyển Desc Mới Sau 7s
    new MusicPlayer();
    new TimeLove();
    new ClockTime('.date');

    // End Coder
});
