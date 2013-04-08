define(['jquery', 'underscore', 'backbone', 'marionette'], function ($, _, Backbone, Marionette) {

    var PlantManager = {

        start: function () {
            PlantManager.appRegion = new PlantManager.AppRegion();
            PlantManager.router = new PlantManager.Router();
            Backbone.history.start();
        }

    };

    PlantManager.AppRegion = Marionette.Region.extend({
        el: '#main'
    });

    // Collections

    PlantManager.PowerPlantList = Backbone.Collection.extend({
        url: '/api/powerplants/v2',
        comparator: function(plant1, plant2) {
            return plant1.get('powerGenerated') < plant2.get('powerGenerated');
        },
        parse: function (response) {
            this.page = response.page;
            this.totalPages = response.totalPages;
            return response.powerplants;
        }
    });

    // Models

    PlantManager.PowerPlant = Backbone.Model.extend({
        urlRoot: '/api/powerplants/v2'
    });

    // Views
    
    PlantManager.PowerPlantListItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#tmpl-powerPlantListItem'
    });

    PlantManager.PowerPlantListView = Marionette.CompositeView.extend({
        tagName: 'table',
        itemView: PlantManager.PowerPlantListItemView,
        template: '#tmpl-powerPlantList',
        itemViewContainer: 'tbody'
    });

    PlantManager.PowerPlantView = Backbone.View.extend({
        events: {
            'change #location': 'updateLocation',
            'change #type': 'updateType',
            'change #powerGenerated': 'updatePower',
            'change #maintenanceCost': 'updateCost',
            'click #save': 'save'
        },
        template: _.template($('#tmpl-powerPlantDetails').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        updateLocation: function (e) { this.model.set({ location: $(e.target).val() }); },
        updateType: function (e) { this.model.set({ type: $(e.target).val() }); },
        updatePower: function (e) { this.model.set({ powerGenerated: $(e.target).val() }); },
        updateCost: function (e) { this.model.set({ maintenanceCost: $(e.target).val() }); },
        save: function () {
            this.model.save();
        },
        returnToList: function () {
            PlantManager.router.navigate('');
        }
    });

    // Router

    PlantManager.Router = Backbone.Router.extend({
        routes: {
            '': 'list',
            'list(/:page)': 'list',
            'powerplants/:id': 'details'
        },
        list: function (page) {
            var list = new PlantManager.PowerPlantList();
            list.fetch({ data: { page: page }, success: function() {
                var view = new PlantManager.PowerPlantListView({ collection: list });
                PlantManager.appRegion.show(view);
            } });
        },
        details: function (id) {
            var item = new PlantManager.PowerPlant({ id: id });
            item.fetch({ success: function() {
                var view = new PlantManager.PowerPlantView({ model: item });
                PlantManager.appRegion.show(view);
            } });
        }
    });

    return { start: PlantManager.start };

});