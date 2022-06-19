import _pick from "lodash/pick";
import editorDefaults from "@gaoding/editor-framework/lib/base/editor-defaults";
export default {
  /**
   * `maskElement` 元素进入编辑状态
   * @memberof EditorMaskElementMixin
   * @param {element} element - 蒙版元素
   */
  showMaskEditor: function showMaskEditor(element) {
    element = this.getElement(element);
    this.currentEditMask = element;
  },

  /**
   * 编辑器的当前处于编辑状态的 `maskElement` 图片元素，退出编辑状态
   * @memberof EditorMaskElementMixin
   */
  hideMaskEditor: function hideMaskEditor() {
    this.currentEditMask = null;
  },

  /**
   * 蒙版元素转换为图片元素
   * @memberof EditorMaskElementMixin
   * @param  {element} element - 被转换蒙版元素
   * @param  {layout} layout  - 元素所在的布局
   * @return {element}        创建的图片元素
   */
  convertMaskToImage: function convertMaskToImage(element, layout, url) {
    element = this.getElement(element);

    if (!element) {
      return;
    }

    var defaultElement = editorDefaults.element;
    var defaultImageElement = editorDefaults.imageElement;
    var props = [].concat(Object.keys(defaultImageElement)).concat(Object.keys(defaultElement));

    var data = _pick(element, props); // image props


    data.type = 'image';
    data.url = url || element.url || element.mask;
    data.version = editorDefaults.version;
    var newElement = this.replaceElement(element, data, layout);
    this.focusElement(newElement);
    return newElement;
  }
};