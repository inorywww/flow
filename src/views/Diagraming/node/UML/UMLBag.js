import { HtmlResize } from '@logicflow/extension'

class Model extends HtmlResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 140;
    this.text.draggable = true;
    this.text.editable = false;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#f1a131";
    style.strokeWidth = 1;
    return style;
  }
  // setAttributes() {
  //   this.width = 300;
  //   this.height = 130;
  //   this.text.editable = false;
  // }
}

class View extends HtmlResize.view {
  setHtml(rootEl) {
    const { properties } = this.props.model;
    console.log(properties);
    const el = document.createElement("div");
    el.className = "uml-wrapper";
    const html = `
      <div class="UML-all edit-node">
        <div class="head edit-node">
          <input value="${properties.head || '包'}" contenteditable="true" oninput="setData('.UML-all .head-${this.props.model.id}', 'name')" class="inner edit-node head-${this.props.model.id}">
        </div>
        <input value="${properties.body || '属性'}" contenteditable="true" oninput="setData('.UML-all .body-${this.props.model.id}', 'body')" class="body edit-node body-${this.props.model.id}">
        
      </div>
    `;
    el.innerHTML = html;
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
    window.setData = (e, key) => {
      const el = document.querySelector(e)
      const { graphModel, model } = this.props;
      graphModel.eventCenter.emit("input:change", { model, key, val: el.value });
    }
  }
}


export default {
  type: "uml-bag",
  view: View,
  model: Model
};
