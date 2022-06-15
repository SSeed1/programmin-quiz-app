const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('User',{ 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'USER'
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.NOW,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.NOW,
  }
})
const Question = sequelize.define('Question',{
  question_id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question_text: {
    type: DataTypes.TEXT,
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.NOW,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.NOW,
  }
})

const Question_Choice = sequelize.define('Question_Choice', {
  choice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  is_right_choice: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  update_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
  choice: {
    type: DataTypes.TEXT,
    defaultValue:'',
  }
})

const Lessons = sequelize.define('Lessons', {
  lesson_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lesson_title: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  lesson_text: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  update_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
  image_url: {
    type: DataTypes.TEXT,
    defaultValue: '',
  }
})
const Tests = sequelize.define('Tests', {
  test_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  update_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue:Sequelize.NOW,
  },
})

const User_Question_Answer = sequelize.define('User_Question_Answer',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
})


Users.hasMany(User_Question_Answer)
User_Question_Answer.belongsTo(Users)

Question.hasOne(User_Question_Answer)
User_Question_Answer.belongsTo(Question)

Lessons.hasOne(Tests)
Tests.belongsTo(Lessons)

Question_Choice.hasMany(Question)
Question.belongsTo(Question_Choice)

// Question_Choice.hasOne(Tests)
// Tests.belongsTo(Question_Choice)

//нужно до

User_Question_Answer.belongsToMany(Question)
Question.belongsToMany(User_Question_Answer)
User_Question_Answer.belongsToMany(Question_Choice,{through:User_Question_Answer})
Question_Choice.belongsToMany(User_Question_Answer,{through:User_Question_Answer})

module.exports = {
  Users,
  Tests, 
  Lessons,
  Question,
  Question_Choice,
  User_Question_Answer,
}