var makeRequest = Reflux.createAction({ asyncResult: true });

var PollingDataStore = Reflux.createStore({
    init: function() {
      this.listenTo(makeRequest, "onMakeRequest");
    },

    onMakeRequest: function(url) {
      $.getJSON("blobs/deptGrades.json")
        .done((data) => {
          makeRequest.completed();
        })
        .fail((jqxhr, textSatus, err) => {
          console.error(err);
          makeRequest.failed(err);
        });
    }
});

setInterval(makeRequest, 1000);

module.export = PollingDataStore;
