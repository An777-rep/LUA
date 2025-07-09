
function parseInput() {
    const raw = document.getElementById("input").value.toLowerCase();
    const normalized = normalize(raw);
    const parsed = parseComplexCommand(normalized);
    document.getElementById("output").value = parsed || "-- ❓ Команда не распознана";
}

function downloadLua() {
    const code = document.getElementById("output").value;
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "script.lua";
    a.click();
    URL.revokeObjectURL(a.href);
}

function clearAll() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
}

async function handleParse() {
    const input = document.getElementById("input").value;
    const result = await parseComplexCommand(input);
    const outputEl = document.getElementById("output");
    outputEl.value = result;
    outputEl.scrollIntoView({ behavior: "smooth" });
}
