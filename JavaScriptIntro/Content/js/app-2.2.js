define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    var PlantManager = {

        start: function () {
            PlantManager.appView = new PlantManager.AppView();
            PlantManager.router = new PlantManager.Router();
            Backbone.history.start();
        }

    };

    PlantManager.AppView = Backbone.View.extend({
        el: '#main',
        show: function (view) {
            this.$el.html(view.el);
        }
    });

    // Collections

    PlantManager.PowerPlantList = Backbone.Collection.extend({
        url: '/api/powerplants/v2',
        comparator: function(plant1, plant2) {
            return plant1.get('powerGenerated') < plant2.get('powerGenerated');
        },
        parse: function(response) {
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

    PlantManager.PowerPlantListView = Backbone.View.extend({
        tagName: 'table',
        template: _.template($('#tmpl-powerPlantList').html()),
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        render: function () {
            var output = _.template(this.template, { page: this.collection.page, totalPages: this.collection.totalPages});

            this.$el.html(output);
            this.collection.each(this.renderOne, this);

            return this;
        },
        renderOne: function (powerPlant) {
            var view = new PlantManager.PowerPlantListItemView({ model: powerPlant });
            this.$el.append(view.render().el);
        }
    });

    PlantManager.PowerPlantListItemView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template($('#tmpl-powerPlantListItem').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
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
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'create', this.returnToList);
        },
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
            'powerplants/:id': 'details',
            'list(:/page)': 'list'
        },
        list: function (page) {
            var list = new PlantManager.PowerPlantList();
            list.fetch({
                data: { page: page },
                success: function () {
                    var view = new PlantManager.PowerPlantListView({ collection: list });
                    PlantManager.appView.show(view);
                }
            });
        },
        details: function (id) {
            var item = new PlantManager.PowerPlant({ id: id });
            item.fetch({
                success: function () {
                    var view = new PlantManager.PowerPlantView({ model: item });
                    PlantManager.appView.show(view);
                }
            });
        }
    });

    return { start: PlantManager.start };

});
