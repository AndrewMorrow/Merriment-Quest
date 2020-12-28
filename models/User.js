const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// call checkpassword to compare hashed passwords
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    // hooks hash the password before it is saved to the database
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.user_password = await bcrypt.hash(
                    newUserData.user_password,
                    10
                );
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.user_password = await bcrypt.hash(
                    updatedUserData.user_password,
                    10
                );
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;
