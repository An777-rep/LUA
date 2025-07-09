
let templates = [];
let currentTemplateIndex = -1;

async function loadTemplates() {
  const res = await fetch("data/templates.json");
  templates = await res.json();
  buildTemplateUI();
}

function buildTemplateUI() {
  const sel = document.createElement("select");
  sel.id = "templateSelector";
  sel.onchange = () => loadTemplate(sel.value);
  templates.forEach((t, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = t.title;
    sel.appendChild(opt);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️ Редактировать";
  editBtn.onclick = editCurrentTemplate;

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 Экспорт шаблонов";
  exportBtn.onclick = exportTemplates;

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.onchange = importTemplates;

  document.body.prepend(importInput);
  document.body.prepend(exportBtn);
  document.body.prepend(editBtn);
  document.body.prepend(sel);
}

function loadTemplate(index) {
  currentTemplateIndex = index;
  const tmpl = templates[index];
  document.getElementById("input").value = tmpl.steps.join(", ");
}

function editCurrentTemplate() {
  if (currentTemplateIndex === -1) return alert("Шаблон не выбран");
  const newSteps = prompt("Редактируй шаги (через запятую):", templates[currentTemplateIndex].steps.join(", "));
  if (!newSteps) return;
  templates[currentTemplateIndex].steps = newSteps.split(",").map(x => x.trim());
  alert("Шаблон обновлён в памяти. Для сохранения экспортируй шаблоны.");
}

function exportTemplates() {
  const blob = new Blob([JSON.stringify(templates, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "templates.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importTemplates(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      templates = JSON.parse(reader.result);
      alert("Импорт успешно выполнен.");
      location.reload();
    } catch (e) {
      alert("Ошибка при импорте шаблонов: " + e);
    }
  };
  reader.readAsText(file);
}
