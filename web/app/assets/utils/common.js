export const updateDjangoScriptTags = () => {
    const cmsScripts = document.querySelectorAll('script[data-cms]');
    for (let i = 0; i < cmsScripts.length; i++) {
        const script = cmsScripts[i];
        if (!script.hasAttribute('type')) {
            script.setAttribute('type', 'application/javascript');
        }
    }
};

export default {
    updateDjangoScriptTags,
}