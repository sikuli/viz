var makeRequest = Reflux.createAction();

var PollingDataStore = Reflux.createStore({
  init: function() {
    this.listenTo(makeRequest, this.onMakeRequest);
  },

  onMakeRequest: function() {
    return $.getJSON("blobs/deptGrades.json")
      .done((data) => {
        this.trigger(data);
      })
      .fail((jqxhr, textSatus, err) => {
        console.error(err);
      });
  }
});

setInterval(makeRequest, 1000);

module.exports = PollingDataStore;
