L.PM.Toolbar = L.Class.extend({
    initialize(map) {
        this.map = map;

        // console.log(this.map);

        this.defineButtons();
        this.show();
    },
    defineButtons: function() {

        this.buttons = [];

        // some buttons are still in their respective classes, like L.PM.Draw.Poly
        var deleteButton = {
              'className': 'icon-delete',
              'onClick': function() {

              },
              'afterClick': function(e) {
                  console.log('after click');
              },
              'doToggle': true,
              'toggleStatus': false
        };

        this.addButton(deleteButton);


    },
    addButton: function(btn) {

        var leafletButton = new L.Control.PMButton(btn);
        this.buttons.push(leafletButton);

        this.show();

        return leafletButton;

    },
    show: function() {

        this.buttons.forEach((button) => {
            button.addTo(this.map);
        });

    }
});
