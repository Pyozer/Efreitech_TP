(function () {
    class ReactComponent {
        constructor(props) {
            this.props = props
        }

        setState(newState) {
            this.state = Object.assign({}, this.state, newState)
            this.reRender()
        }

        onUpdate(callback) {
            this.reRender = callback
        }

        render() {
            throw 'You need to override this method !'
        }
    }

    class React {
        static createElement(element, props, ...content) {
            if (isComponent(element))
                return new element(props).render()
            if (isFunction(element))
                return element(props)

            const el = document.createElement(element)
            content.forEach(elem => {
                console.log(typeof elem);
                
                if (isComponent(elem)) {                    
                    let component = new elem(props)
                    let htmlComponent = component.render()
                    component.onUpdate(() => {
                        while (htmlComponent.firstChild) {
                            htmlComponent.removeChild(htmlComponent.firstChild);
                        }
                        component.render().childNodes.forEach(child => htmlComponent.appendChild(child))
                    })
                    el.appendChild(htmlComponent)

                } else if (elem instanceof Node)
                    el.appendChild(elem)
                else
                    el.innerHTML += elem
            })

            for (const key in props) {
                if (/^on/.test(key))
                    el.addEventListener(key.substr(2).toLowerCase(), props[key])
                else
                    el.setAttribute(formatAttr(key), props[key])
            }

            return el
        }
    }

    class ReactDOM {
        static render(el, domElement) {
            domElement.appendChild(el)
        }
    }

    window.React = React
    window.ReactComponent = ReactComponent
    window.ReactDOM = ReactDOM
})()

const isFunction = (el) => el instanceof Function
const isComponent = (el) => typeof el === 'function';

const formatAttr = (attr) => (attr == "className") ? "class" : attr