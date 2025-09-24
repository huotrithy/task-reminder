export const ERROR_MESSAGE = {
  USER_NOT_EXIST: "This account does not exist.",
  INCORRECT_PASSWORD: "Incorrect password.",
  EMAIL_ALREADY_EXIST: "This email is already exist.",
  CATEGORY_NOT_FOUND: "Category not found.",
  TASK_NOT_FOUND: "Task not found.",
  USER_NOT_FOUND: "User not found.",

  // Warning
  DELETE_ACTIVE_CATEGORY:
    "You cannot delete this Cateogory, There are task under it.",

  UNAUTHENTICATED: "Unauthenticated Access.",

  SERVER_ERROR: "Unexpected Error Occured, Please try again later.",
};

export const SUCCESS_MESSAGE = {
  DELETE_CATEGORY: "Category deleted successfully!",
  DELETE_TASK: "Task deleted successfully!",
};

export const VALIDATION_ERROR_MESSAGE = {
  REMINDER_PERIOD_NOT_SET: "Please set a reminder period for this task.",
  REMINDER_PERIOD_BIGGER_THAN_3_MONTH:
    "Reminder period cannot be larger than 3 months.",

  REMINDER_DEADLINE_NOT_SET: "Please set a reminder deadline for this task.",
};
