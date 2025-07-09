
function parseCommand(input) {
    if (input.includes("найди") && input.match(/\d+/)) {
        const val = input.match(/\d+/)[0];
        const type = input.includes("float") ? "gg.TYPE_FLOAT" : "gg.TYPE_DWORD";
        const region = input.includes("аноним") ? "gg.REGION_ANONYMOUS" : "gg.REGION_C_ALLOC";
        return GG_FUNCTIONS["поиск"](val, type, region);
    }
    if (input.includes("замени") && input.match(/\d+/)) {
        const val = input.match(/\d+/)[0];
        return GG_FUNCTIONS["замени"](val);
    }
    if (input.includes("смещение") && input.match(/\d+/)) {
        const offset = input.match(/\d+/)[0];
        return GG_FUNCTIONS["смещение"](offset);
    }
    if (input.includes("тост") || input.includes("toast") || input.includes("готово")) {
        return GG_FUNCTIONS["toast"]("Готово");
    }
    if (input.includes("очисти")) {
        return GG_FUNCTIONS["очисти"]();
    }
    if (input.includes("задерж") && input.match(/\d+(\.\d+)?/)) {
        const sec = parseFloat(input.match(/\d+(\.\d+)?/)[0]);
        return GG_FUNCTIONS["задержка"](sec);
    }
    return null;
}
