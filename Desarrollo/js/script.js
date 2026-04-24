const STORAGE_KEY = "paletas-guardadas-v1";

const state = {
	count: 6,
	format: "hex",
	palette: [],
	savedPalettes: []
};

const elements = {
	amountSelect: document.querySelector("#cantidad"),
	generateButton: document.querySelector("#generar"),
	saveButton: document.querySelector("#guardar"),
	palette: document.querySelector("#paleta"),
	saved: document.querySelector("#guardadas"),
	toast: document.querySelector("#toast"),
	formatButtons: Array.from(document.querySelectorAll("[data-format]"))
};

let toastTimeoutId;

function randomChannel() {
	return Math.floor(Math.random() * 256);
}

function componentToHex(value) {
	return value.toString(16).padStart(2, "0").toUpperCase();
}

function rgbToHex(red, green, blue) {
	return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function rgbToHsl(red, green, blue) {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const lightness = (max + min) / 2;
	let hue = 0;
	let saturation = 0;

	if (max !== min) {
		const diff = max - min;
		saturation = lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);

		switch (max) {
			case r:
				hue = (g - b) / diff + (g < b ? 6 : 0);
				break;
			case g:
				hue = (b - r) / diff + 2;
				break;
			default:
				hue = (r - g) / diff + 4;
				break;
		}

		hue /= 6;
	}

	return {
		h: Math.round(hue * 360),
		s: Math.round(saturation * 100),
		l: Math.round(lightness * 100)
	};
}

function getReadableTextColor(red, green, blue) {
	const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
	return luminance > 0.62 ? "#201812" : "#FFF9F0";
}

function createRandomColor(locked = false) {
	const red = randomChannel();
	const green = randomChannel();
	const blue = randomChannel();
	const hex = rgbToHex(red, green, blue);
	const hsl = rgbToHsl(red, green, blue);

	return {
		hex,
		hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
		rgb: { red, green, blue },
		textColor: getReadableTextColor(red, green, blue),
		locked
	};
}

function normalizePaletteSize() {
	if (state.palette.length > state.count) {
		state.palette = state.palette.slice(0, state.count);
		return;
	}

	while (state.palette.length < state.count) {
		state.palette.push(createRandomColor());
	}
}

function generatePalette() {
	normalizePaletteSize();

	state.palette = state.palette.map((color) => {
		if (color.locked) {
			return color;
		}

		return createRandomColor(false);
	});

	renderPalette();
}

function setFormat(nextFormat) {
	state.format = nextFormat;

	elements.formatButtons.forEach((button) => {
		const isActive = button.dataset.format === nextFormat;
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", String(isActive));
	});

	renderPalette();
}

function showToast(message) {
	clearTimeout(toastTimeoutId);
	elements.toast.textContent = message;
	elements.toast.classList.add("is-visible");

	toastTimeoutId = window.setTimeout(() => {
		elements.toast.classList.remove("is-visible");
	}, 1800);
}

function lockIcon(isLocked) {
	if (isLocked) {
		return `
			<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<path fill="currentColor" d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 0V7a2 2 0 1 1 4 0v2Z" />
			</svg>
		`;
	}

	return `
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path fill="currentColor" d="M17 8h-6V7a2 2 0 1 1 4 0h2a4 4 0 1 0-8 0v1H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z" />
		</svg>
	`;
}

function renderPalette() {
	elements.palette.innerHTML = "";

	state.palette.forEach((color, index) => {
		const card = document.createElement("article");
		card.className = "color-card";
		card.style.backgroundColor = color.hex;
		card.style.color = color.textColor;

		const mainValue = state.format === "hex" ? color.hex : color.hsl;
		const secondaryValue = state.format === "hex" ? color.hsl : color.hex;

		card.innerHTML = `
			<div class="card-top">
				<span class="badge">Color ${index + 1}</span>
				<button
					type="button"
					class="lock-button"
					data-index="${index}"
					aria-label="${color.locked ? "Desbloquear color" : "Bloquear color"}"
					aria-pressed="${String(color.locked)}"
					title="${color.locked ? "Desbloquear color" : "Bloquear color"}"
				>
					${lockIcon(color.locked)}
				</button>
			</div>
			<div class="card-bottom">
				<button
					type="button"
					class="color-copy"
					data-hex="${color.hex}"
					aria-label="Copiar ${color.hex} al portapapeles"
					title="Copiar ${color.hex}"
				>
					${mainValue}
				</button>
				<p class="format-secondary">${secondaryValue}</p>
				<p class="copy-hint">Clic para copiar HEX</p>
			</div>
		`;

		elements.palette.appendChild(card);
	});
}

function saveCurrentPalette() {
	const savedPalette = {
		id: Date.now(),
		count: state.count,
		colors: state.palette.map((color) => ({
			hex: color.hex,
			hsl: color.hsl,
			rgb: color.rgb,
			textColor: color.textColor,
			locked: false
		}))
	};

	state.savedPalettes.unshift(savedPalette);
	state.savedPalettes = state.savedPalettes.slice(0, 8);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedPalettes));
	renderSavedPalettes();
	showToast("Paleta guardada en tu navegador.");
}

function loadSavedPalettes() {
	const stored = localStorage.getItem(STORAGE_KEY);

	if (!stored) {
		state.savedPalettes = [];
		return;
	}

	try {
		state.savedPalettes = JSON.parse(stored);
	} catch (error) {
		state.savedPalettes = [];
		localStorage.removeItem(STORAGE_KEY);
	}
}

function renderSavedPalettes() {
	elements.saved.innerHTML = "";

	if (state.savedPalettes.length === 0) {
		elements.saved.innerHTML = '<p class="empty-state">Todavía no guardaste ninguna paleta.</p>';
		return;
	}

	state.savedPalettes.forEach((palette) => {
		const item = document.createElement("article");
		item.className = "saved-item";

		const dateLabel = new Date(palette.id).toLocaleString("es-AR", {
			dateStyle: "short",
			timeStyle: "short"
		});

		item.innerHTML = `
			<div>
				<p class="saved-meta">${palette.count} colores · ${dateLabel}</p>
				<div class="saved-swatches">
					${palette.colors.map((color) => `<span class="saved-swatch" style="background:${color.hex}" title="${color.hex}"></span>`).join("")}
				</div>
			</div>
			<button type="button" data-load-id="${palette.id}">Cargar</button>
		`;

		elements.saved.appendChild(item);
	});
}

async function copyHexValue(hexValue) {
	try {
		await navigator.clipboard.writeText(hexValue);
		showToast(`${hexValue} copiado al portapapeles.`);
	} catch (error) {
		showToast("No se pudo copiar automáticamente.");
	}
}

function handlePaletteClick(event) {
	const lockButton = event.target.closest(".lock-button");

	if (lockButton) {
		const index = Number(lockButton.dataset.index);
		state.palette[index].locked = !state.palette[index].locked;
		renderPalette();
		showToast(state.palette[index].locked ? "Color bloqueado." : "Color desbloqueado.");
		return;
	}

	const copyButton = event.target.closest(".color-copy");

	if (copyButton) {
		copyHexValue(copyButton.dataset.hex);
	}
}

function handleSavedClick(event) {
	const button = event.target.closest("[data-load-id]");

	if (!button) {
		return;
	}

	const paletteId = Number(button.dataset.loadId);
	const savedPalette = state.savedPalettes.find((palette) => palette.id === paletteId);

	if (!savedPalette) {
		return;
	}

	state.count = savedPalette.count;
	elements.amountSelect.value = String(savedPalette.count);
	state.palette = savedPalette.colors.map((color) => ({
		...color,
		locked: false
	}));
	renderPalette();
	showToast("Paleta recuperada.");
}

function bindEvents() {
	elements.amountSelect.addEventListener("change", (event) => {
		state.count = Number(event.target.value);
		normalizePaletteSize();
		renderPalette();
		showToast(`La paleta ahora mostrará ${state.count} colores.`);
	});

	elements.generateButton.addEventListener("click", generatePalette);
	elements.saveButton.addEventListener("click", saveCurrentPalette);
	elements.palette.addEventListener("click", handlePaletteClick);
	elements.saved.addEventListener("click", handleSavedClick);

	elements.formatButtons.forEach((button) => {
		button.addEventListener("click", () => setFormat(button.dataset.format));
	});
}

function init() {
	loadSavedPalettes();
	bindEvents();
	normalizePaletteSize();
	generatePalette();
	renderSavedPalettes();
}

init();
