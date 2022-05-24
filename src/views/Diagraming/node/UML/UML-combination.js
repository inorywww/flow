import { HtmlResize } from '@logicflow/extension'

class Model extends HtmlResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 300;
    this.height = 200;
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
    const el = document.createElement("div");
    el.className = "uml-wrapper";
    const html = `
      <div class="UML-combination edit-node">
        <input value="${properties.head || 'Opt | Alt | Loop'}" contenteditable="true" oninput="setData('.UML-combination .head-${this.props.model.id}', 'name')" class="head edit-node head-${this.props.model.id}"/>
        <input value="${properties.body || '[Condition]'}" contenteditable="true" oninput="setData('.UML-combination .body-${this.props.model.id}', 'body')" class="body edit-node body-${this.props.model.id}"/>
        
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
  type: "uml-combination",
  view: View,
  model: Model
};
