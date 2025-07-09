
const GG_FUNCTIONS = {
  'поиск': (val, type, region) =>
    \`gg.setRanges(\${region})\ngg.searchNumber("\${val}", \${type})\nresults = gg.getResults(100)\`,

  'замени': val =>
    \`for i,v in ipairs(results) do v.value = \${val} end\ngg.setValues(results)\`,

  'смещение': offset =>
    \`shifted = {}\nfor i,v in ipairs(results) do shifted[i] = {address = v.address + \${offset}, flags = v.flags} end\`,

  'toast': msg => \`gg.toast("\${msg}")\`,
  'очисти': () => \`gg.clearResults()\`,
  'задержка': sec => \`gg.sleep(\${Math.floor(sec * 1000)})\`,

  'заморозь': val =>
    \`for i,v in ipairs(results) do v.value = \${val}; v.freeze = true end\ngg.setValues(results)\`,

  'разморозь': () =>
    \`for i,v in ipairs(results) do v.freeze = false end\ngg.setValues(results)\`,

  'если_нашли': body =>
    \`if gg.getResultsCount() > 0 then\n\${body}\nend\`,

  'иначе': body =>
    \`else\n\${body}\nend\`,

  'ввывод': text => \`print("\${text}")\`,

  'уведомление': text => \`gg.alert("\${text}")\`,

  'список_сохранить': name => \`gg.saveList("\${name}")\`,

  'список_загрузить': name => \`gg.loadList("\${name}")\`,

  'цикл': (count, body) =>
    \`for i = 1, \${count} do\n\${body}\nend\`
};
