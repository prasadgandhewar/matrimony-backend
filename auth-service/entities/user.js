import { EntitySchema } from 'typeorm';

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    hashedPassword: {
      type: 'varchar',
      notNull: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      updateDate: true,
    },
    firstName: {
      type: 'varchar',
      notNull: true,
    },
    lastName: {
      type: 'varchar',
      notNull: true,
    },
    mobileNumber: {
      type: 'varchar',
    }
  }
});

export default User;