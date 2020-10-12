/* V.1.6 LAST UPDATE @ 12/10/2020 19:29 PM */
/* jsglobal */
$(document).ready(function() {
    if (tw_config.virtual_products) {
        $('.productCheckoutInfo .ongkir').remove();
        $('#checkoutWhatsApp .alamat').closest('label').remove();
        $('.productCheckout').addClass('virtual');
        $('.productOptionInfo small:nth-last-child(1), .productOptionInfo small:nth-last-child(2)').remove();
    }
});
$('a[href*="https://www.youtube.com/watch?v="]').each(function() {
    var url = $(this).attr('href');
    var id = url.split('v=')[1];
    var ampersandPosition = id.indexOf('&');
    if (ampersandPosition != -1) {
        id = video_id.substring(0, ampersandPosition);
    }

    $(this).attr('href', 'https://www.youtube.com/embed/' + id + '?autoplay=1');
    $(this).addClass('popWin videoYoutube');


    var thumbnail = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg'
    $(this).attr('style', 'background-image:url(' + thumbnail + ');');
});
$('.quickedit').removeAttr('onclick');
$('.quickedit').removeAttr('target');
$('.quickedit').addClass('popWin');
$('.quickedit').attr('data-popWidth', 600);
$('.quickedit img').remove();
$('.quickedit').append('<i class="icon ion-md-create"></i>');

var arr_socmed = tw_socmed;
$.each(arr_socmed, function(key, value) {
    if (key != null && value != '') {
        $('#follow .followBtn, .followBtn2').append('<a class="popWin ' + key + '" data-popWidth="1280" href="' + value + '"><i class="icon ion-logo-' + key + '"></i></a>');
    }
});

$(window).on("beforeunload", function() {
    $('.poptamv').removeClass('open');
    $.magnificPopup.close()
    $('#page-loader').fadeIn(500).delay(1000).fadeOut(1000);
});
$(window).on('load', function() {
    $('#page-loader').fadeOut(500);
    $('iframe').each(function() {
        var url = $(this).attr('data-src');
        $(this).attr('src', url);
        $(this).removeAttr('data-src');
    });
    var homepage = location.href.split('/')[0] + '//' +location.href.split('/')[2] + '/';
    var homepage_mobile = location.href.split('/')[0] + '//' +location.href.split('/')[2] + '/?m=1';
    if(!localStorage.getItem('load_notif') && location.href == homepage || location.href == homepage_mobile) {
        $('a.btnNotif').trigger('click');
        localStorage.setItem('load_notif',1);
    }
});
$('img').each(function() {
    var url = $(this).attr('data-src');
    $(this).attr('src', url);
    $(this).removeAttr('data-src');
});
$('.lazy-bg').each(function() {
    var url = $(this).attr('data-src');
    $(this).attr('style', 'background-image:url("' + url + '");');
    $(this).css('visibility','auto!important');
    $(this).removeAttr('data-src');
    $(this).removeClass('lazy-bg');
});
$(window).on('scroll', function() {
    $('header').each(function() {
        if ($(window).scrollTop() >= 1) {
            $(this).addClass('onScroll');
        } else {
            $(this).removeClass('onScroll');
        }
    });
});

$(".productTitle").each(function() {
    var detail = $(this).parents('.itemPost').find('.productDetail');
    $(this).prependTo(detail);
});

$('.productPrice').each(function() {
    var price = $(this).text(),
        discount = $(this).attr('data-discount-percent');

    if(!discount || discount == 0 || discount == '') {
      var find_discount = $(this).closest('.productDetail').find('.data_discount');
      discount = find_discount.text();
      find_discount.remove();
    }

    var discount_price = price - price * discount / 100;

    var realPrice = '';
    $(this).after("<span class='productPrice_after'>Test</span>");
    if (!discount || discount == 0 || discount == '') {
        $(this).next('.productPrice_after').html('<b>' + angkaToRp(price) + '</b>');
        var realPrice = price;
    } else {
        $(this).next('.productPrice_after').html('<small><span>-' + discount + '%</span><s>' + angkaToRp(price) + '</s></small><b>' + angkaToRp(discount_price) + '</b>');
        var realPrice = discount_price;
    }
    $(this).attr('data-selected', realPrice);
    $(this).parents('.itemPost').attr('data-price', realPrice);
});

/* Lightbox  -------------------------------------------------------------------- */

$('.lightbox').each(function() {
    $(this).magnificPopup({
        type: 'image',
        verticalFit: false,
        gallery: {
            enabled: true
        },
        callbacks: {
            beforeOpen: function() {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
});
$('a[href*="bp.blogspot.com"]').each(function() {
    $(this).addClass('lightbox');
});
$('.pageBody a:has(img)').each(function() {
    $(this).addClass('lightbox');
});
$('.gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a.lightbox', // the selector for gallery item
        type: 'image',
        preload: [1, 2],
        verticalFit: false,
        gallery: {
            enabled: true
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
});
$(document).ready(function() {
    $('.lightframe').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        preloader: false,

        fixedContentPos: false
    });
});


/* cForm-WA  -------------------------------------------------------------------- */


$('.poptamv-btn, .tombol-wa').on('click', function() {
    $('body').addClass('hideScroll');
    var title = $(this).attr('data-title');
    var target = $(this).attr('href');
    $(target).addClass('open');
    $(target).find('.title-content').html(title);
    if ($(this).attr('data-img') != null) {
        var img = $(this).attr('data-img');
        $(target).find('.content img').show();
        $(target).find('.content img').attr('src', img);
    }
    if ($(this).attr('data-width') != null) {
        var width = $(this).attr('data-width');
        $(target).find('.wrap').attr('style', 'max-width:' + width + 'px!important;')
    }
    if ($(this).attr('data-tooltip') != null) {
        var tooltip = $(this).attr('data-tooltip');
        $(target).find('.poptamv-wrap').show();
        $(target).find('.poptamv-wrap').html(tooltip)
    }
});

$('.poptamv .closeTamv').on('click', function() {
    $('body').removeClass('hideScroll');
    $(this).parents('.poptamv').removeClass('open');
});

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $('.poptamv .closeTamv').trigger('click');
    }
});

if (pageMode != 'related') {
    var audio = document.createElement("audio");
    audio.src = "https://kangrian.github.io/TokoWhatsApp/wa.mp3";
    audio.preload = "auto";

    if (sessionStorage.getItem('waFix') === null) {
        audio.addEventListener("canplaythrough", function() {
            setTimeout(function() {
                // audio.play();
                $('.waFix').addClass('show');
            }, 6000);
        }, false);
    }
}
$(document).on('click', '.waFix', function() {
    $(this).removeClass('show');
    sessionStorage.setItem('waFix', false)
});

$(document).on('keypress', '.formWA input, .formWA textarea', function() {
    if (event.keyCode === 13) {
        $(this).parents(".formWA").find('.submit').trigger('click');
    }
});

$('.formWA .wajib').each(function() {
    title = $(this).attr('placeholder');
    label = $(this).parents('label');
    $('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
});

$(document).on('keyup', '.formWA .wajib', function() {
    if ($(this).val() != '') {
        $(this).removeClass('focus');
        $(this).parents('label').find('.validasi').removeClass('show');
    }
});

$(document).on('change', '.formWA select', function() {
    $(this).removeClass('focus');
    $(this).parents('label').find('.validasi').removeClass('show');
});

$(document).on('click', '.formWA .submit', function() {
    kirimWA($(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    $('#' + id + ' .wajib').each(function() {
        if ($.trim($(this).val()) == '' || $.trim($(this).val()) == 'default') {
            $(this).addClass('focus');
        }
    });
    $('#' + id + ' .wajib').each(function() {

        if ($.trim($(this).val()) == '') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
            $(this).focus();
            return false;
        } else if ($.trim($(this).val()) == 'default') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
            return false;
        }
    });

    if (validasi === true) {

        var parameter = '';
        var url_wa = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = 'whatsapp://send';
        }
        if (id == 'kirimWhatsApp') {

            var nama_admin = tw_config.nama_admin,
                pesan_salam = tw_config.pesan_salam,
                kode_area = 62,
                nomor_whatsapp = tw_config.no_whatsapp,
                judul = $('#' + id + ' .title-content').text(),
                nama = $('#' + id + ' .nama').val(),
                email = $('#' + id + ' .email').val(),
                pesan = $('#' + id + ' .pesan').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*.%0A%0A' +
                '💬 ' + pesan + '%0A%0A' +
                'E-mail Aktif : ' + email + '%0A' +
                'via ' + location.href;

        } else if (id == 'checkoutWhatsApp') {

            var nama_admin = tw_config.nama_admin,
                pesan_salam = tw_config.pesan_salam,
                kode_area = 62,
                nomor_whatsapp = tw_config.no_whatsapp,
                judul = $('#' + id + ' .productCheckoutInfo .infoTitle').text(),
                info = $('#' + id + ' .productOptionInfo').text(),
                subtotal = $('#' + id + ' .totalqty').text(),
                nama = $('#' + id + ' .nama').val(),
                email = $('#' + id + ' .email').val(),
                jumlah = $('#' + id + ' .jumlah').val(),
                pembayaran = $('#' + id + ' .pembayaran').val(),
                catatan = $('#' + id + ' .catatan').val(),
                alamat = $('#' + id + ' .alamat').val();

            if (tw_config.virtual_products) {
                var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                    pesan_salam + ' ' + nama_admin + '.. ' +
                    'saya mau beli *' + judul + '.*%0A%0A' +
                    info + '%0A' +
                    '— — — — — — — — — — — — — — —%0A%0A' +
                    subtotal + '%0A%0A' +
                    '— — — — — — — — — — — — — — —%0A%0A' +
                    '*Catatan :*%0A' + catatan + '%0A%0A' +
                    '*Metode Pembayaran :*%0A' + pembayaran + '%0A%0A' +
                    'Atas Nama.%0A*' + nama + '* ( ' + email + ' )%0A%0A' +
                    'via ' + location.href;
            } else {
                var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                    pesan_salam + ' ' + nama_admin + '.. ' +
                    'saya mau beli *' + judul + '.*%0A%0A' +
                    info + '%0A' +
                    '— — — — — — — — — — — — — — —%0A%0A' +
                    subtotal + '%0A%0A' +
                    '— — — — — — — — — — — — — — —%0A%0A' +
                    '*Catatan :*%0A' + catatan + '%0A%0A' +
                    '*Metode Pembayaran :*%0A' + pembayaran + '%0A%0A' +
                    '*Alamat :*%0A' + alamat + '%0A%0A' +
                    'Atas Nama.%0A*' + nama + '* ( ' + email + ' )%0A%0A' +
                    'via ' + location.href;
            }
        } else {
            alert('id tidak ditemukan');
        }
        // alert(parameter);
        $(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}
$(document).on('click', '.popWin', function() {
    var target_url = $(this).attr('href'),
        w = $(this).attr('data-popWidth'),
        h = $(this).attr('data-popHeight');

    if (w == null) {
        w = 960;
    }
    if (h == null) {
        h = 540;
    }
    left = Number((screen.width / 2) - (w / 2)),
        tops = Number((screen.height / 2) - (h / 2)),
        popupWindow = window.open(target_url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
    popupWindow.focus();
    return false;
});
$('.LinkList li a[href*="#"]').each(function() {
    $(this).parent('li').addClass('dd');
    $(this).parent('li').append('<ul></ul>');
    $(this).attr('href', 'javascript:void(0)');
});
$('.LinkList li a:contains("_")').each(function() {
    var dd = $(this).parent('li').prev('.dd').find('ul');
    $(this).parent('li').appendTo(dd);

    var text = $(this).text().replace('_', '');
    $(this).text(text)
});
$('.LinkList li.dd').click(function() {
    $(this).find('ul:first').toggle();
    $(this).toggleClass('active');
});
$('.btnCat, .closeCategory, .btnCategory, .tw_category .utama').click(function() {
    $('.tw_category .Label').toggle();
});
$('.btnMenu, .closeMenu').click(function() {
    $('.tw_menu .LinkList').toggle();
    $('.tw_category .Label').hide();
    $('.btnMenu').find('i').toggleClass('ion-ios-menu');
    $('.btnMenu').find('i').toggleClass('ion-ios-arrow-up');
    $('.closeMenuCategory').fadeToggle();
});
$('.closeMenuCategory').click(function() {
    $('.tw_menu .LinkList').hide();
    $('.tw_category .Label').hide();
    $('.btnMenu').find('i').removeClass('ion-ios-arrow-up');
    $('.btnMenu').find('i').addClass('ion-ios-menu');
    $('.closeMenuCategory').fadeOut();
});
$('.btnSearch').click(function() {
    $('.headerSearch').show();
    $('.headerSearch form .text').focus();
});
$('.headerSearch i.ion-ios-arrow-back').click(function() {
    $('.headerSearch').hide();
    $('.headerSearch form .text').blur();
});
$('.tw_search').click(function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.headerSearch i.ion-ios-arrow-back').trigger('click');
    };
    $('.headerSearch form i.ion-md-close').trigger('click');
});

$(document).on('keyup', '.headerSearch form .text', function() {
    if (event.keyCode === 13) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.headerSearch i.ion-ios-arrow-back').trigger('click');
        } else {
            $('.tw_search').hide();
        };
    }
});

$('.headerSearch form .text').keyup(function() {
    if ($(this).val() != '') {
        $('.tw_search').show();
        $('.headerSearch form i.ion-md-close').show();
    } else {
        $('.tw_search').hide();
        $('.headerSearch form i.ion-md-close').hide();
    }
});
$('.headerSearch form i.ion-md-close').click(function() {
    $('.tw_search').hide();
    $('.headerSearch form i.ion-md-close').hide();
    $('.headerSearch form .text').val('');
});
if (sessionStorage.getItem('ss_notif') == null) {
    $('.btnNotif span').fadeIn();
}
$('.btnNotif').click(function() {
    $('.btnNotif span').hide();
    sessionStorage.setItem('ss_notif', false);
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    $('a').each(function() {
        var url = $(this).attr('href') + '?m=1';
        var url2 = $(this).attr('href') + '&m=1';
        if (url == window.location || url2 == window.location) {
            $(this).addClass('active');
        }
    });

} else {

    $('a').each(function() {
        var url = $(this).attr('href');
        if (url == window.location) {
            $(this).addClass('active');
        }
    });

}
$('textarea.code').each(function() {
    var val = $(this).val(),
        replace = val.replace(/<br\s?\/?>/g, "");
    $(this).val(replace);
    $(this).on('click', function() {
        $(this).select();
    });
    $(this).attr('readonly', 'readonly');
});
$(window).on('load',function() {
    $('.imgNotif a').css('visibility','');
)};

if (tw_config.FBPixel_ID != null || tw_config.FBPixel_ID != "") {
    ! function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', tw_config.FBPixel_ID);

    if (pageMode != 'related') {
        fbq('track', 'PageView');
        $('<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + tw_config.FBPixel_ID + '&amp;ev=PageView&amp;noscript=1"/></noscript>').appendTo('body');
    }

    $('.productPhotoWrapper a').each(function() {
        var harga = $(this).parents('.itemPost').attr('data-price');
        var idKatalog = $(this).parents('.itemPost').attr('data-blogID');
        var idProduk = $(this).parents('.itemPost').attr('id');

        $(this).click(function() {
            fbq('track', 'ViewContent', {
                value: harga,
                currency: 'IDR',
            });
        });
    });

    $('.productOrder a.tombol-wa').click(function() {
        fbq('track', 'InitiateCheckout');
    });

    $('#checkoutWhatsApp .submit').each(function() {
        $(this).on('click', function() {
            var total = rpToAngka($('.productCheckoutInfo .total').text());
            fbq('track', 'Purchase', {
                value: total,
                currency: 'IDR',
            });
        });
    });

    $('.poptamv-btn.waFix').click(function() {
        fbq('track', 'Contact');
    });
}

(function($) {
    $(document).ready(function() {
        var arr_linkJSBody1 = [
            'https://m.kangrian.net/web&grup_id=2',
        ];
        arr_linkJSBody1.forEach(each_loadJsBody);

        var arr_linkJSBody2 = [
            'https://m.kangrian.net/web_cek',
        ];
        arr_linkJSBody2.forEach(each_loadJsBody);

        function each_loadJsBody(item, index) {
            load_JsBody(item);
        }

        function load_JsBody(file) {
            var inject_script = document.createElement('script');
            inject_script.type = 'text/javascript';
            inject_script.src = file;
            return document.body.appendChild(inject_script);
        }
    });
}(jQuery));
console.log('\
      \n\
      Template by.\n\
      \n\
      ██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗   ███╗   ██╗███████╗████████╗\n\
      ██║ ██╔╝██╔══██╗████╗  ██║██╔════╝ ██╔══██╗██║██╔══██╗████╗  ██║   ████╗  ██║██╔════╝╚══██╔══╝\n\
      █████╔╝ ███████║██╔██╗ ██║██║  ███╗██████╔╝██║███████║██╔██╗ ██║   ██╔██╗ ██║█████╗     ██║\n\
      ██╔═██╗ ██╔══██║██║╚██╗██║██║   ██║██╔══██╗██║██╔══██║██║╚██╗██║   ██║╚██╗██║██╔══╝     ██║\n\
      ██║  ██╗██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║██║  ██║██║ ╚████║██╗██║ ╚████║███████╗   ██║\n\
      ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝\n\
      \n\
      ©2020 - https://kangrian.net\n\
      \n\
      ');
/* jsglobal */
