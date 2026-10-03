async function translateContent(language, jsonFilePath)
{
    try
    {
        const response = await fetch(jsonFilePath);
        const translations = await response.json();

        const elementsToTranslate = document.querySelectorAll('[data-translate]');

        document.documentElement.lang = language;

        document.title = translations[language]['meta']['title'];
        //document.querySelector('meta[name="description"]').content = translations[language]['meta']['description'];

        elementsToTranslate.forEach(element =>
        {
            const key = element.dataset.translate;
            if (translations[language] && translations[language][key])
            {
                element.textContent = translations[language][key];
            }
        });
    } catch (error)
    {
        console.error('Error loading translations:', error);
    }
}

const language = localStorage.getItem('language') || 'ro';
document.documentElement.lang = language;


function getJsonFilePath(pageName)
{
    // Assuming a common folder structure for translations (adjust as needed)
    const translationsFolder = '/translations/';

    // Assuming the JSON file name is the same as the page name with ".json" extension
    const jsonFileName = pageName + '.json';
    // Construct the full JSON file path
    const jsonFilePath = translationsFolder + jsonFileName;
    console.log(jsonFilePath)

    return jsonFilePath;
}

let path = window.location.pathname;
let pageName = path.split('/').pop();
pageName = pageName.replace(/\.html/, '');
if (pageName == '')
{
    pageName = 'index';
}

const jsonFilePath = getJsonFilePath(pageName);

translateContent(language, jsonFilePath);