
function parseComplexCommand(input) {
    const lines = [];
    let valMatch = input.match(/найди.*?(\d+(\.\d+)?)/);
    if (valMatch) {
        const val = valMatch[1];
        const type = input.includes("float") ? "gg.TYPE_FLOAT" : "gg.TYPE_DWORD";
        const region = input.includes("аноним") ? "gg.REGION_ANONYMOUS" : "gg.REGION_C_ALLOC";
        lines.push(GG_FUNCTIONS["поиск"](val, type, region));
    }

    if (input.includes("замени") && input.match(/на\s+(\d+)/)) {
        const val2 = input.match(/на\s+(\d+)/)[1];
        lines.push(GG_FUNCTIONS["замени"](val2));
    }

    if (input.includes("смещен") && input.match(/на\s+(\d+)/)) {
        const offset = input.match(/на\s+(\d+)/)[1];
        lines.push(GG_FUNCTIONS["смещение"](offset));
    }

    if (input.includes("ещё") || input.includes("дальше") || input.includes("повторно") || input.includes("ещё раз")) {
        lines.push("-- 💡 Уточни шаг, не распознано");
    }

    if (input.includes("тост") || input.includes("готово")) {
        lines.push(GG_FUNCTIONS["toast"]("Готово"));
    }

    return lines.join("\n");
}
