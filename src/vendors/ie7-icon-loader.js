/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'moji-clarity\'">' + entity + '</span>' + html;
	}
	var icons = {
		'u-icon--chevron-left': '&#xf053;',
		'u-icon--chevron-right': '&#xf054;',
		'u-icon--chevron-up': '&#xf077;',
		'u-icon--chevron-down': '&#xf078;',
		'u-icon--thumbs-o-up': '&#xf087;',
		'u-icon--caret-left': '&#xf0d9;',
		'u-icon--caret-right': '&#xf0da;',
		'u-icon--sort-desc': '&#xf0dd;',
		'u-icon--sort-down': '&#xf0dd;',
		'u-icon--sort-asc': '&#xf0de;',
		'u-icon--sort-up': '&#xf0de;',
		'u-icon--angle-left': '&#xf104;',
		'u-icon--angle-right': '&#xf105;',
		'u-icon--angle-up': '&#xf106;',
		'u-icon--angle-down': '&#xf107;',
		'u-icon--mail-reply': '&#xf112;',
		'u-icon--reply': '&#xf112;',
		'u-icon--thumbs-up': '&#xf164;',
		'u-icon--share-alt': '&#xf1e0;',
		'u-icon--share-alt-square': '&#xf1e1;',
		'u-icon--if_11-linkedin_104493': '&#xe902;',
		'u-icon--user-circle-o': '&#xf2be;',
		'u-icon--chat_bubble2': '&#xe0cb;',
		'u-icon--chat_bubble_outline': '&#xe0cc;',
		'u-icon--chat_bubble': '&#xe0ca;',
		'u-icon--quotes-left': '&#xe977;',
		'u-icon--quotes-right': '&#xe978;',
		'u-icon--spinner10': '&#xe983;',
		'u-icon--search': '&#xe986;',
		'u-icon--zoom-in': '&#xe987;',
		'u-icon--zoom-out': '&#xe988;',
		'u-icon--home': '&#xe901;',
		'u-icon--redo2': '&#xe968;',
		'u-icon--menu-down': '&#xe9bf;',
		'u-icon--menu-up': '&#xe9c0;',
		'u-icon--share2': '&#xea82;',
		'u-icon--plus': '&#xea0a;',
		'u-icon--minus': '&#xea0b;',
		'u-icon--info': '&#xea0c;',
		'u-icon--cancel-circle': '&#xea0d;',
		'u-icon--link': '&#xe9cb;',
		'u-icon--cross': '&#xea0f;',
		'u-icon--checkmark': '&#xea10;',
		'u-icon--yammer': '&#xe91c;',
		'u-icon--twitter': '&#xe91d;',
		'u-icon--people-finder': '&#xe900;',
		'u-icon--court-and-tribunal-finder': '&#xe904;',
		'u-icon--travel-booking': '&#xe905;',
		'u-icon--sop': '&#xe906;',
		'u-icon--it-portal': '&#xe907;',
		'u-icon--jobs': '&#xe908;',
		'u-icon--civil-service-learning': '&#xe909;',
		'u-icon--moj-logo': '&#xe90a;',
		'u-icon--webchat': '&#xe90b;',
		'u-icon--pension': '&#xe90c;',
		'u-icon--form-finder': '&#xe90d;',
		'u-icon--room-booking': '&#xe90e;',
		'u-icon--provider-information': '&#xe90f;',
		'u-icon--laa-online-portal': '&#xe910;',
		'u-icon--laa-manual-civil': '&#xe911;',
		'u-icon--laa-manual-crime': '&#xe912;',
		'u-icon--public-site': '&#xe913;',
		'u-icon--means-assessment-administration-tool': '&#xe914;',
		'u-icon--etarmis': '&#xe915;',
		'u-icon--bright-ideas': '&#xe916;',
		'u-icon--mitrefinch': '&#xe917;',
		'u-icon--shield': '&#xe918;',
		'u-icon--jac': '&#xe919;',
		'u-icon--crown': '&#xe91a;',
		'u-icon--tpb': '&#xe91b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/u-icon--[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
