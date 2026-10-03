// Dark theme

const isDarkMode = localStorage.getItem('darkMode') === 'true';
const isLightMode = localStorage.getItem('lightMode') === 'true';


if (isDarkMode)
{
    // themeToggle.checked = true
    document.body.classList.remove('dark-theme');
    document.documentElement.style.colorScheme = 'light';
}
if (isLightMode)
{
    // themeToggle.checked = false
    document.body.classList.add('dark-theme');
    document.documentElement.style.colorScheme = 'dark';
}
if (!isLightMode && !isDarkMode)
{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        document.body.classList.add('dark-theme');
        document.documentElement.style.colorScheme = 'dark';
        // themeToggle.checked = true
    } else
    {
        document.body.classList.remove('dark-theme');
        document.documentElement.style.colorScheme = 'light';
        // themeToggle.checked = false
    }
}