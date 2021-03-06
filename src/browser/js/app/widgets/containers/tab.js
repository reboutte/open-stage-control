var Panel = require('./panel'),
    resize = require('../../events/resize')

module.exports = class Tab extends Panel {

    static defaults() {

        return {
            type:'tab',
            id:'auto',
            linkId:'',

            _style:'style',

            label:'auto',
            color:'auto',
            css:'',

            _panel:'panel',

            layout:'',
            spacing:0,

            _value: 'value (tab selection)',
            
            default: '',
            value: '',

            _osc:'osc (tab selection)',

            precision:0,
            address:'auto',
            preArgs:[],
            target:[],
            bypass:false,

            _children:'children',

            variables:'@{parent.variables}',

            widgets:[],
            tabs:[]
        }

    }

    constructor(options) {

        options.props.scroll = true

        super(options)

        this.container.classList.add('show')
        this.widget.classList.add('tab')

        this.detached = false

    }

    hide() {
        if (this.detached) return
        this.container.removeChild(this.widget)
        this.container.classList.remove('show')
        this.detached = true

    }
    show() {
        if (!this.detached) return
        this.container.appendChild(this.widget)
        this.container.classList.add('show')
        this.detached = false
        resize.check(this.widget, true)
    }

    onPropChanged(propName, options, oldPropValue) {

        if (super.onPropChanged(...arguments)) return true

        switch (propName) {

            case 'label':
            case 'color':
                if (this.parent.createNavigation) this.parent.createNavigation()
                return

        }

    }

}
