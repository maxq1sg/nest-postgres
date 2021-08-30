module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("posts", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("posts", "user_id");
  },
};
