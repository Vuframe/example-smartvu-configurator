var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) || (navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            navigator.userAgent.match(/Intel\ Mac|MacIntel/i));
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(document).ready(function () {
    var containerElement = document.getElementById("webar-container");
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute('class', 'smartvu');
    ifrm.setAttribute("src", "https://share.vuframe.com/1a0a44c4/embed?hide_sidebar=1&enable_shadows=0&hide_applink=1&autoplay=1&format=aura&resolution=2048&autopause=0");
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.style.minHeight = "400px";
    ifrm.style.border = "none";
    ifrm.style.borderRadius = "4px";
    containerElement.replaceWith(ifrm);
});

$(".close-sidebar").click(function () {
    $(".sidebar").toggle("fast", "swing");

    if ($(this).hasClass('pe-7s-close')) {
        $(this).addClass('fa fa-ellipsis-v');
        $(this).removeClass('pe-7s-close');
        $(this).css("color", "black");
    } else {
        $(this).addClass('pe-7s-close');
        $(this).removeClass('fa fa-ellipsis-v');
        $(this).css("color", "white");
    }
});

$(".open-filter").click(function () {
    $(".sidebar").toggle("fast", "swing");
});

var smartvuPlayer;

window.addEventListener('message', onVuframeMessageFromPlayer, false);

function onVuframeMessageFromPlayer(e) {
    if (e.origin.includes("vuframe.com")) {
        if (e.data.event_id === "vf.did_complete_scene_load") {
            $('#loading-screen').hide('slow');
            onsmartvuPlayerLoaded();
        }
    }
}

function onsmartvuPlayerLoaded() {
    smartvuPlayer = $("iframe.smartvu")[0];
    $('.sidebar').show();
    $('.sidebar-button').show();

    //init Robot Color first with red
    vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_orange'});
    vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_chrome'});

    //init robot Gripper first with gripper 1
    vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-3'});
    vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-2'});
}


function colorSelection(color) {
    if (color === 'red') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Vuframe-Robot-2021/vuframe_robot_red'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_orange'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_chrome'});
    }
    if (color === 'orange') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Vuframe-Robot-2021/vuframe_robot_orange'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_red'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_chrome'});
    }
    if (color === 'chrome') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Vuframe-Robot-2021/vuframe_robot_chrome'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_red'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Vuframe-Robot-2021/vuframe_robot_orange'});
    }

}

function gripperSelection(color) {
    if (color === 'gripper-1') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Gripper-1'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-2'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-3'});
    }
    if (color === 'gripper-2') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Gripper-2'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-1'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-3'});
    }
    if (color === 'gripper-3') {
        vuframeSendMessageWithParams("vf.show_object", {path: '/Gripper-3'});

        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-1'});
        vuframeSendMessageWithParams("vf.hide_object", {path: '/Gripper-2'});
    }
}

function vuframeSendMessageWithParams(message, params) {

    if (smartvuPlayer) {
        params['method'] = message;
        smartvuPlayer.contentWindow.postMessage(params, '*');
    } else {
        console.log("player not yet loaded");
    }
}

