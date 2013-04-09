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

    // Models

    PlantManager.PowerPlant = Backbone.Model.extend({
        urlRoot: '/api/powerplants'
    });

    PlantManager.PowerPlantList = Backbone.Collection.extend({
        url: '/api/powerplants',
        model: PlantManager.PowerPlant,
        comparator: function(left, right) {
          return right.get('powerGenerated') > left.get('powerGenerated');
        }
    });

    // Views

    PlantManager.PowerPlantListView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        render: function () {
            this.$el.empty();
            this.collection.each(this.renderOne, this);
            return this;
        },
        renderOne: function (powerPlant) {
            var view = new PlantManager.PowerPlantListItemView({ model: powerPlant });
            this.$el.append(view.render().el);
        }
    });

    PlantManager.PowerPlantListItemView = Backbone.View.extend({
        tagName: 'li',
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
            'powerplants/:id(/foo)': 'details'
        },
        list: function () {
            var list = new PlantManager.PowerPlantList();
            var view = new PlantManager.PowerPlantListView({ collection: list });
            PlantManager.appView.show(view);
            list.fetch();
        },
        details: function (id) {
            var item = new PlantManager.PowerPlant({ id: id });
            var view = new PlantManager.PowerPlantView({ model: item });
            PlantManager.appView.show(view);
            item.fetch();
        }
    });

    return { start: PlantManager.start };

});
