import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; // Adjust the path to your Sequelize instance
import bcrypt from 'bcrypt';

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;

    // Method to compare a plain text password with the hashed password
    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false, // Set to true if you want createdAt/updatedAt fields
    }
);

// Hook to hash the password before creating a new user
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Hook to hash the password before updating an existing user
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

export default User;