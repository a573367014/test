import template from './ellipse.html';
import { i18n } from '../../i18n';

export default {
    template,
    props: ['element', 'editor'],
    data() {
        return {
            svgContent: '',
        };
    },
    computed: {
        title() {
            return i18n.$tsl('椭圆形');
        },
    },
    mounted() {
        const vm = this.editor.getComponentById(this.element.$id);
        const svg = vm.$el.querySelector('svg');
        this.svgContent = new XMLSerializer().serializeToString(svg);
    },
};
