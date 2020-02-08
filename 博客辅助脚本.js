// ==UserScript==
// @name         博客辅助脚本
// @version      0.1
// @author       memset0
// @match        https://memset0.cn/admin/write-post.php
// ==/UserScript==

(function() {
	'use strict';

	$("#visibility").val("private");

	$("head").append(
		"<style>"+
		".resize,.typecho-foot,.editormd-toolbar,.editormd-preview,.typecho-option-tabs,.editormd-preview-container,#advance-panel-btn{display:none!important}"+
		".CodeMirror{margin-top:0!important;width:100%!important}"+
		"#advance-panel{display:block!important;}"+
		"#edit-secondary{margin-top:-50px!important;}"+
		"</style>"
	);

	$("#btn-submit").hover(()=>{
		let ele_title = $("#title"), title = ele_title.val();
		let ele_slug = $("#slug"), slug = ele_slug.val();
		title = title
			.replace(/^lg/, "洛谷")
			.replace(/^luogu/, "洛谷")
			.replace(/^lgt/, "洛谷T")
			.replace(/^luogut/, "洛谷T")
			.replace(/^loj/, "LOJ")
			.replace(/^uoj/, "UOJ")
			.replace(/^cf/, "CF")
			.replace(/^gym/, "GYM")
			.replace(/^noi/, "NOI 模拟赛 ")
			.replace(/^mns/, "NOI 模拟赛 ")
			.replace(/^cc/, "CodeChef-");
		ele_title.val(title);
		if (!slug) {
			let key = null;
			if (key = title.match(/^洛谷T(\d+)/)) {
				slug = "luogu-t";
			} else if (key = title.match(/^洛谷(\d+)/)) {
				slug = "luogu";
			} else if (key = title.match(/^LOJ(\d+)/)) {
				slug = "loj";
			} else if (key = title.match(/^UOJ(\d+)/)) {
				slug = "uoj";
			} else if (key = title.match(/^CF(\d+[a-zA-Z]\d)/)) {
				slug = "cf";
			} else if (key = title.match(/^CF(\d+[a-zA-Z])/)) {
				slug = "cf";
			} else if (key = title.match(/^GYM(\d+[a-zA-Z]\d)/)) {
				slug = "gym";
			} else if (key = title.match(/^GYM(\d+[a-zA-Z])/)) {
				slug = "gym";
			} else if (key = title.match(/^NOI 模拟赛 (\d+[a-zA-Z])/)) {
				slug = "contest";
			} else if (key = title.match(/^NOI 模拟赛 (\d+)/)) {
				slug = "contest";
			} else if (key = title.match(/^CodeChef-([\da-zA-Z]+)/)) {
				slug = "codechef-";
			}
			if (key) {
				slug = slug + key[1].toLowerCase().replace(' ', '');
				ele_slug.val(slug);
				ele_slug.css("width", "");
				ele_slug.css("color", "white");
				ele_slug.css("background", "green");
				ele_slug.get(0).size = ele_slug.val().length;
				console.log(slug);
			}
		}
	});
})();
