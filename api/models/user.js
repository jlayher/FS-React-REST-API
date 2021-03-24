'use strict'
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');

// Create and Export User Model and Validate firstName, lastName, emailAddress, and password
module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A First-Name must be added'
                },
                notEmpty: {
                    msg: 'First-Name cannot be empty'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Last-Name must be added'
                },
                notEmpty: {
                    msg: 'Last-Name cannot be empty'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This Email Address Already Exists'
            },
            validate: {
                notNull: {
                    msg: 'An Email must be added'
                },
                notEmpty: {
                    msg: 'Email cannot be empty'
                },
                isEmail: {
                    msg: 'Your Email Address Is Not Valid'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
            },
            validate: {
                notNull: {
                    msg: 'A Password is Required'
                },
                notEmpty: {
                    msg: 'Please Enter a Password'
                }
            }
        }
    }, { sequelize });

    // Set one-to-many association
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: 'userId'
        });
    };
    return User;
};