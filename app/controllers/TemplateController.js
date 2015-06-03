export var changeTemplate = Reflux.createAction();

export var TemplateController = Reflux.createStore({
  init: function() {
    this.listenTo(changeTemplate, (template) => {
      this.onChangeTemplate(template);
    });
  },

  onChangeTemplate: function(template) {
    return this.trigger(template);
  }
});
