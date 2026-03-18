$(document).ready(() => {
	$("a").on("click", function (r) {
		r.preventDefault(), window.location.replace(window.location.href);
	});
	$(".hide-input").on("blur", function () {
		$(this).attr("type", "password");
	});
	$(".hide-input").on("focus", function () {
		$(this).attr("type", "text");
	});
	$(".cb-message-close-x").on("click", function () {
		$(".cb-message").hide();
	});

	$(".cb-input-text").on("keyup blur", function () {
		if ($(this).val().trim().length < 3) {
			$(this).addClass("cb-error-form-input--required");
			$(this).prev().addClass("cb-error-form-label--required");
			$(this).parent().children(".cb-input-error-message").show();
		} else {
			$(this).removeClass("cb-error-form-input--required");
			$(this).prev().removeClass("cb-error-form-label--required");
			$(this).parent().children(".cb-input-error-message").hide();
		}
	});

	$(".submitBtn").on("click", function (e) {
		$(".cb-input-text").each(function () {
			if ($(this).val().trim().length < 3) {
				$(this).addClass("cb-error-form-input--required");
				$(this).prev().addClass("cb-error-form-label--required");
				$(this).parent().children(".cb-input-error-message").show();
				e.preventDefault();
			}
		});
	});
});
