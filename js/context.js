
async function loadTypoMap() {
  const res = await fetch("data/typo_map_extensive.json");
  return await res.json();
}

function normalizeText(text, typoMap) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => typoMap[word] || word)
    .join(" ");
}

async function parseComplexCommand(rawInput) {
  const typoMap = await loadTypoMap();
  const input = normalizeText(rawInput, typoMap);
  const lines = [];

  let valMatch = input.match(/найти.*?(\d+(\.\d+)?)/);
  if (valMatch) {
    const val = valMatch[1];
    const type = input.includes("float") ? "gg.TYPE_FLOAT" :
                 input.includes("qword") ? "gg.TYPE_QWORD" : "gg.TYPE_DWORD";
    const region = input.includes("анонимный") ? "gg.REGION_ANONYMOUS" : "gg.REGION_C_ALLOC";
    lines.push(GG_FUNCTIONS["поиск"](val, type, region));
  }

  if (input.includes("заменить") && input.match(/на\s+(\d+)/)) {
    const val2 = input.match(/на\s+(\d+)/)[1];
    lines.push(GG_FUNCTIONS["замени"](val2));
  }

  if (input.includes("смещение") && input.match(/на\s+(\d+)/)) {
    const offset = input.match(/на\s+(\d+)/)[1];
    lines.push(GG_FUNCTIONS["смещение"](offset));
  }

  if (input.includes("toast") || input.includes("готово")) {
    lines.push(GG_FUNCTIONS["toast"]("Готово"));
  }

  if (input.includes("заморозить") && input.match(/\d+/)) {
    const val = input.match(/\d+/)[0];
    lines.push(GG_FUNCTIONS["заморозь"](val));
  }

  if (input.includes("разморозить")) {
    lines.push(GG_FUNCTIONS["разморозь"]());
  }

  if (input.includes("выйти")) {
    lines.push(GG_FUNCTIONS["выйти"]());
  }

  if (input.includes("пауза")) {
    lines.push(GG_FUNCTIONS["пауза"]());
  }

  if (input.includes("скрыть")) {
    lines.push(GG_FUNCTIONS["скрыть"]());
  }

  if (input.includes("ввод")) {
    lines.push(GG_FUNCTIONS["ввод"]("Введите значение"));
  }

  return lines.length ? lines.join("\n") : "-- ❓ Команда не распознана";
}
