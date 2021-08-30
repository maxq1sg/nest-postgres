"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("files", "files_post_id_fkey", {
        transaction,
      });
      await queryInterface.addConstraint("files", {
        type: "foreign key",
        name: "files_post_id_fkey",
        fields: ["post_id"],
        references: {
          table: "posts",
          field: "id",
        },
        onDelete: "CASCADE",
        transaction,
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {},
};
