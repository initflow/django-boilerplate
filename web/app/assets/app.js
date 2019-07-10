// v.1.0.4 - 06.06.19
class App {
    components = [];

    _getComponentName = (Component) => {
        return Component.name || Component.toString().match(/^function\s*([^\s(]+)/)[1];
    }

    setComponents(components) {
        components.forEach(Component => {
            const componentConfig = {
                isSingleton: false,
                Component,
                name: this._getComponentName(Component),
                instances: []
            };
            if (!!Component.singleton) {
                componentConfig.isSingleton = true;
                componentConfig.instances.push({
                    node: null,
                    instance: new Component()
                });
            }

            this.components.push(componentConfig);
        });
    }

    getComponentByName = (name) => {
        return this.components.filter(x => x.name === name)[0];
    }
    getComponentClassByName = (name) => {
        const component = this.getComponentByName(name);
        return component !== null ? component.Component : null;
    }
    getComponentInstancesByName = (name) => {
        const component = this.getComponentByName(name);
        return component !== null ? component.instances : null;
    }
    getComponentInstanceByName = (name) => {
        const instances = this.getComponentInstancesByName(name);
        if (instances.length > 0) {
            return instances[0].instance;
        }
        return null;
    }
    getInstancesByNode = (node, name = null) => {
        if (name !== null) {
            const component = this.getComponentByName(name);
            const instances = component !== null ? component.instances.filter(x => x.node === node) : [];
            return instances.map(x => x.instance);
        }

        const components = [];
        this.components.forEach(component => {
            const instances = component.instances.filter(x => x.node === node);
            if (instances.length > 0) {
                components.push({
                    componentName: component.name,
                    instances: instances.map(x => x.instance)
                });
            }
        });
        return components;
    }
    
    initializeComponents() {
        this.components.forEach(component => {
            if (component.Component.selector === undefined || component.Component.selector === null) {
                return;
            }
            const nodeList = document.querySelectorAll(component.Component.selector);
            
            for (let i = 0; i < nodeList.length; i++) {
                const node = nodeList[i];
                if (node.dataset[`appComponent${component.name}Initialized`]) {
                    continue;
                }
                node.dataset[`appComponent${component.name}Initialized`] = true;
                if (!component.isSingleton) {
                    component.instances.push({
                        node,
                        instance: new component.Component(node)
                    });
                } else if (component.instances.length > 0 && component.instances[0].instance.onEntryElement !== undefined) {
                    component.instances[0].instance.onEntryElement(node);
                }
            }
        });
    }

    initInstanceElements(instance) {
        if (!instance.elements || !instance.dataCode || !instance.root) {
            return;
        }
        Object.keys(instance.elements).forEach(key => {
            const allIndex = key.indexOf('_all');
            if (allIndex > -1) {
                const selector = `[${instance.dataCode}-element="${key.substring(0, allIndex)}"]`;
                instance.elements[key] = instance.root.querySelectorAll(selector);
            } else {
                const selector = `[${instance.dataCode}-element="${key}"]`;
                instance.elements[key] = instance.root.querySelector(selector);
            }
        });
    }
}

const app = new App();
window.app = app;

export default app;