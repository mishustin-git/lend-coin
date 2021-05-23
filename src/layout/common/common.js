import {
	header
} from "../blocks/header/header.js";

document.addEventListener("DOMContentLoaded", function (event) {
	header();
	var selector = document.querySelectorAll('input[type="tel"]');

	var im = new Inputmask("+7 (999) 999-99-99");
	im.mask(selector);
});