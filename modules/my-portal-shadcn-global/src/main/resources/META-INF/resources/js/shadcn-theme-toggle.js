(function () {
	'use strict';

	var STORAGE_KEY = 'my-portal-shadcn-theme';
	var TOGGLE_ID = 'my-portal-theme-toggle-toolbar';
	var TOGGLE_ITEM_CLASS = 'my-portal-theme-toggle-item';

	function getPreferredTheme() {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			return 'dark';
		}

		return 'light';
	}

	function getCurrentTheme() {
		return document.documentElement.getAttribute('data-theme') || 'light';
	}

	function applyTheme(theme, persist) {
		var root = document.documentElement;

		root.setAttribute('data-theme', theme);
		root.classList.toggle('dark', theme === 'dark');
		root.classList.remove('mp-shell-loading');
		root.classList.add('mp-shell-ready');

		if (persist !== false) {
			try {
				localStorage.setItem(STORAGE_KEY, theme);
			}
			catch (error) {
			}
		}

		updateToggleButton(theme);
	}

	function toggleTheme() {
		applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
	}

	function updateToggleButton(theme) {
		var button = document.getElementById(TOGGLE_ID);

		if (!button) {
			return;
		}

		var isDark = theme === 'dark';

		button.setAttribute(
			'aria-label',
			'Switch to ' + (isDark ? 'light' : 'dark') + ' mode'
		);
		button.title = isDark ? 'Light mode' : 'Dark mode';
		button.innerHTML =
			'<span class="my-portal-theme-toggle-icon" aria-hidden="true">' +
			(isDark ? '\u2600' : '\u263E') +
			'</span>';
	}

	function findControlMenuNav() {
		return (
			document.querySelector(
				'.cadmin .control-menu-nav, .control-menu-nav'
			) || null
		);
	}

	function mountToolbarToggle() {
		if (document.getElementById(TOGGLE_ID)) {
			updateToggleButton(getCurrentTheme());

			return;
		}

		var nav = findControlMenuNav();

		if (!nav) {
			return;
		}

		var item = document.createElement('li');

		item.className =
			'control-menu-nav-item ' + TOGGLE_ITEM_CLASS;

		var button = document.createElement('button');

		button.id = TOGGLE_ID;
		button.type = 'button';
		button.className =
			'control-menu-nav-link my-portal-theme-toggle--toolbar btn btn-unstyled';

		button.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			toggleTheme();
		});

		item.appendChild(button);
		nav.appendChild(item);
		updateToggleButton(getCurrentTheme());
	}

	function removeLegacyFab() {
		var fab = document.getElementById('my-portal-theme-toggle-fab');

		if (fab) {
			fab.remove();
		}
	}

	function boot() {
		document.documentElement.classList.remove('mp-shell-loading');
		document.documentElement.classList.add('mp-shell-ready');
		removeLegacyFab();
		mountToolbarToggle();
	}

	function init() {
		var root = document.documentElement;

		if (!root.getAttribute('data-theme')) {
			var stored;

			try {
				stored = localStorage.getItem(STORAGE_KEY);
			}
			catch (error) {
				stored = null;
			}

			applyTheme(stored || getPreferredTheme(), false);
		}
		else {
			root.classList.remove('mp-shell-loading');
			root.classList.add('mp-shell-ready');
		}

		boot();
	}

	init();

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	}

	if (window.Liferay && Liferay.on) {
		Liferay.on('endNavigate', boot);
	}

	window.MyPortalShadcnTheme = {
		apply: applyTheme,
		toggle: toggleTheme,
		get: getCurrentTheme,
	};
})();
