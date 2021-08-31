"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
      // @Column({
      //     type: DataType.INTEGER,
      //     primaryKey: true,
      //     autoIncrement: true,
      //     unique: true,
      //   })
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },

      //   @Column({ type: DataType.STRING })
      body: { type: Sequelize.STRING },

      //   @BelongsTo(() => User)
      //   user: User;

      //   @ForeignKey(() => User)
      //   @Column({
      //     type: DataType.STRING,
      //     allowNull: false,
      //   })
      //   userId: string;
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  },
};
