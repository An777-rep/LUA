
function normalize(text) {
    const synonyms = {
        'зомени': 'замени',
        'найд': 'найди',
        'анонимус': 'аноним',
        'регон': 'регион',
        'смещен': 'смещение',
        'смешение': 'смещение',
        'сам': '',
        'полученное': 'результат',
        'дворд': 'dword',
        'флоат': 'float',
        'дабл': 'double',
        'блоч': 'заморозь',
        'тост': 'toast',
        'покажи': 'toast'
    };
    for (let key in synonyms) {
        text = text.replaceAll(key, synonyms[key]);
    }
    return text;
}
