/**
 * Connect preview modals.
 * All titles, descriptions, and destination URLs live in block markup so they
 * stay editable in the Site Editor. This file only handles show/hide + focus.
 */
(function () {
	function ready(fn) {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", fn);
		} else {
			fn();
		}
	}

	ready(function () {
		var items = document.querySelectorAll(".pd-connect-item");
		if (!items.length) return;

		var lastFocus = null;

		function isMobile() {
			return window.matchMedia("(max-width: 640px)").matches;
		}

		function getTrigger(item) {
			return item.querySelector(".pd-connect-trigger, a.pd-connect-card, .pd-connect-card a");
		}

		function getModal(item) {
			return item.querySelector(".pd-modal");
		}

		function closeAll() {
			document.querySelectorAll(".pd-modal.is-open").forEach(function (modal) {
				modal.classList.remove("is-open");
				modal.setAttribute("hidden", "hidden");
				modal.setAttribute("aria-hidden", "true");
			});
			document.body.classList.remove("pd-modal-lock");
			if (lastFocus && typeof lastFocus.focus === "function") {
				lastFocus.focus();
			}
		}

		function openModal(item) {
			var modal = getModal(item);
			var trigger = getTrigger(item);
			if (!modal) return;

			var openLink = modal.querySelector(".pd-modal-open");
			if (openLink && trigger && trigger.getAttribute("href")) {
				openLink.setAttribute("href", trigger.getAttribute("href"));
			}

			closeAll();
			lastFocus = document.activeElement;
			modal.classList.add("is-open");
			modal.removeAttribute("hidden");
			modal.setAttribute("aria-hidden", "false");
			document.body.classList.add("pd-modal-lock");

			var focusEl = modal.querySelector(".pd-modal-open, .pd-modal-close, button, a");
			if (focusEl) focusEl.focus();
		}

		items.forEach(function (item) {
			var trigger = getTrigger(item);
			var modal = getModal(item);
			if (modal) {
				modal.setAttribute("hidden", "hidden");
				modal.setAttribute("aria-hidden", "true");
				modal.setAttribute("role", "dialog");
				modal.setAttribute("aria-modal", "true");
			}

			item.addEventListener("click", function (event) {
				if (event.target.closest(".pd-modal-close")) {
					event.preventDefault();
					closeAll();
					return;
				}
				if (event.target.closest(".pd-modal-open")) {
					return;
				}
				if (event.target.closest(".pd-modal-panel")) {
					return;
				}
				if (event.target.closest(".pd-modal") && !event.target.closest(".pd-modal-panel")) {
					event.preventDefault();
					closeAll();
					return;
				}

				if (!trigger) return;
				if (isMobile()) return;

				event.preventDefault();
				openModal(item);
			});
		});

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") closeAll();
		});
	});
})();
