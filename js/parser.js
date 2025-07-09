
async function parseInput() {
    const raw = document.getElementById("input").value.toLowerCase();
    const normalized = normalize(raw);
    const parsed = parseCommand(normalized);
    document.getElementById("output").textContent = parsed || "-- ❓ Команда не распознана";
}
