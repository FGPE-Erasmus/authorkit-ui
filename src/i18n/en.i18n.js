export default {
  Home: "Home",
  Profile: "Profile",
  Dashboard: "Dashboard",
  Projects: "Projects",
  Exercises: "Exercises",
  ExerciseForm: "Exercise Form",
  GamificationLayers: "Gamification Layers",
  GamificationLayerForm: "Gamification Layer Form",
  Contributors: "Contributors",
  Support: "Support",
  Help: "Help",
  Documentation: "Documentation",
  RaiseSupport: "Raise Support",
  ExitToDashboard: "Exit To Dashboard",

  ReturnHome: "Return Home",

  Navbar: {
    Search: {
      Placeholder: "Search"
    }
  },

  // auth pages
  Login: {
    Title: "Login",
    Message: "Welcome back, login to your account.",
    Email: "Email",
    Password: "Password",
    RememberMe: "Remember Me",
    ForgotPassword: "Forgot Password?",
    Register: "Register",
    Login: "Login",
    DividerSocial: "OR"
  },
  Register: {
    Title: "Create Account",
    Message: "Fill the below form to create a new account.",
    FirstName: "First Name",
    LastName: "Last Name",
    Email: "Email",
    Password: "Password",
    ConfirmPassword: "Confirm Password",
    TermsConditions: "I accept the",
    ReadTermsConditions: "terms & conditions",
    Login: "Login",
    Register: "Register"
  },
  VerifyEmail: {
    Title: "Verify your email",
    Message: "Click the button below to verify your email.",
    Verify: "Verify"
  },
  ForgotPassword: {
    Title: "You forgot it again?!",
    Message:
      "Enter your email address below and we'll send you instructions on how to reset your password.",
    Email: "Email",
    BackToLogin: "Back To Login",
    Recover: "Recover Password"
  },
  ResetPassword: {
    Title: "Reset Password",
    Message: "Enter your new password.",
    Password: "Password",
    ConfirmPassword: "Confirm Password",
    BackToLogin: "Back To Login",
    Reset: "Reset"
  },
  LockScreen: {
    Title: "Unlock Session",
    Message:
      "To get back to your dashboar, you must enter your password below.",
    NotUser: "Are you not {name}?",
    Unlock: "Unlock"
  },

  // error pages
  Errors: {
    Title: "Unlock Session",
    Message:
      "To get back to your dashboar, you must enter your password below.",
    NotUser: "Are you not {name}?",
    Unlock: "Unlock",
    "401": {
      Title: "401 - Not Authorized!",
      Message: "You are not authorized to access this resource."
    },
    "403": {
      Title: "403 - Forbidden!",
      Message: "You do not have enough permissions to access this resource."
    },
    "404": {
      Title: "404 - Page Not Found!",
      Message: "This page does not exist! Go back to your cage."
    },
    "500": {
      Title: "500 - Internal Server Error!",
      Message: "An internal server error ocurred while processing your request."
    }
  },

  // user settings
  UserSettings: {
    Title: "Profile",
    Tabs: {
      General: "General",
      ChangePassword: "Change Password"
    },
    UploadPhoto: "Upload Photo",
    RemovePhoto: "Remove",
    HintPhoto: "Allowed JPG, GIF or PNG. Max size of 500kB",
    FirstName: "First Name",
    LastName: "Last Name",
    Email: "Email",
    Institution: "Institution",
    Country: "Country",
    PhoneNumber: "Phone Number",
    OldPassword: "Old Password",
    NewPassword: "New Password",
    ConfirmNewPassword: "New Password Confirmation"
  },

  // additional pages
  Maintenance: {
    Title: "Under Maintenance!",
    Message:
      "The monsters are working to fix the servers as soon as possible. Please give them some time!"
  },

  // listing
  Actions: "Actions",

  // components
  CardList: {
    Header: {
      Create: "Create",
      Import: "Import",
      ItemsPerPage: "{start}-{end} of {size}",
      Order: {
        ASC: "&uarr;",
        DESC: "&darr;"
      }
    },
    NoData: "No data available"
  },

  Card: {
    Actions: {
      Edit: "Edit",
      Delete: "Delete",
      Export: "Export",
      View: "View",
      Share: "Share"
    }
  },

  Table: {
    Actions: "Actions"
  },

  TermsConditionsPopup: {
    Title: "Terms & Conditions"
  },

  // dialogs
  Dialogs: {
    ConfirmDelete: {
      Title: "Delete {item}?",
      Message: "Are you sure about removing {item}?"
    }
  },

  // form actions
  Form: {
    Previous: "Previous",
    Next: "Next",
    Finish: "Finish",
    Done: "Done",
    Save: "Save",
    Reset: "Reset",
    Delete: "Delete",
    Cancel: "Cancel",

    Title: {
      Create: "CREATE {type}",
      Update: "UPDATE {type}"
    },
    File: {
      MaxFileSizeLabel: "Maximum file size is {filesize}",
      OpenEditor: "Open editor"
    }
  },

  // code editor
  CodeEditor: {
    Title: "Code Editor",
    Name: "File Name",
    ProgLang: "Programming Language"
  },

  FileList: {
    Create: "Create file",
    Edit: "Edit file",
    Translate: "Clone and translate file",
    Delete: "Remove file"
  },

  SharePopup: {
    Title: "Share Access",
    Email: "Email",
    User: "User",
    AccessLevel: "Access Level",
    AccessLevels: {
      Viewer: "Viewer",
      Contributor: "Contributor",
      Admin: "Administrator",
      Owner: "Owner"
    },
    Save: "Save",
    Cancel: "Cancel"
  },

  TranslatePopup: {
    Title: "Translate to ...",
    NatLang: "Target Language",
    Translate: "Translate",
    Cancel: "Cancel"
  },

  _Project: "Project",
  Project: {
    Name: "Name",
    Description: "Description",
    Status: "Status",
    Statuses: {
      DRAFT: "Draft",
      ANNOUNCED: "Announced",
      OPEN: "Open",
      CLOSED: "Closed"
    }
  },

  // exercises
  Exercise: {
    Title: "Title",
    Module: "Module",
    Keywords: "Keywords",
    Type: "Type",
    Event: "Event",
    Platform: "Platform",
    Difficulty: "Difficulty",
    Status: "Status",
    Instructions: "Instructions",
    Statements: "Statements",
    Embeddables: "Embeddables",
    Libraries: "Libraries",
    StaticCorrectors: "Source-code Checkers",
    DynamicCorrectors: "Output Checkers",
    TestGenerators: "Test Generators",
    FeedbackGenerators: "Feedback Generators",
    Skeletons: "Skeletons",
    Solutions: "Solutions",
    Templates: "Templates",
    Tests: "Tests",
    TestSets: "Test Sets",
    Instruction: "Instruction",
    Statement: "Statement",
    Embeddable: "Embeddable",
    Library: "Library",
    StaticCorrector: "Source-code Checker",
    DynamicCorrector: "Output Checker",
    TestGenerator: "Test Generator",
    FeedbackGenerator: "Feedback Generator",
    Skeleton: "Skeleton",
    Solution: "Solution",
    Template: "Template",
    _Test: "Test",
    Test: {
      Input: "Input",
      Output: "Output",
      Arguments: "Arguments",
      Weight: "Weight",
      Visible: "Visible",
      File: {
        UploadInputFile: "Upload INPUT File",
        UploadOutputFile: "Upload OUTPUT File"
      },
      Create: "Create a test case"
    },
    _TestSet: "Test Set",
    TestSet: {
      Name: "Name",
      Create: "Create a new set of test cases",
      Edit: "Edit set of test cases",
      Delete: "Remove set of test cases"
    },
    Types: {
      BLANK_SHEET: "Blank Sheet",
      EXTENSION: "Extension",
      IMPROVEMENT: "Improvement",
      BUG_FIX: "Bug Fix",
      FILL_IN_GAPS: "Fill-in the Gaps",
      SORT_BLOCKS: "Sort Blocks",
      SPOT_BUG: "Spot the Bug"
    },
    DifficultyLevels: {
      BEGINNER: "Beginner",
      EASY: "Easy",
      AVERAGE: "Average",
      HARD: "Hard",
      MASTER: "Master"
    },
    Statuses: {
      DRAFT: "Draft",
      UNPUBLISHED: "Unpublished",
      PUBLISHED: "Published",
      TRASH: "Trash"
    },
    Form: {
      Metadata: "Metadata",
      Presentation: "Presentation",
      Evaluation: "Evaluation",
      Tools: "Tools",
      Previous: "Previous",
      Next: "Next",
      Finish: "Finish"
    },
    File: {
      Format: "Format",
      NatLang: "Natural Language",
      ProgLang: "Programming Language",
      CommandLine: "Command Line",
      UploadFile: "Upload File"
    },
    ImportDialog: {
      Title: "Choose importing format",
      Format: {
        yapexil: "YAPExIL",
        sipe: "SIPE",
        mef: "MEF"
      },
      Action: {
        Ok: "OK",
        Cancel: "Cancel"
      }
    },
    Hints: {
      Title: "The title of the exercise.",
      Module:
        "The module in which the exercise is in (or description of its main topic).",
      Keywords: "The set of keywords of the exercise.",
      Type: "The type of programming exercise to be solved.",
      Event: "Event at which the exercise was created (if any).",
      Platform: "Platform requirements (if any).",
      Difficulty: "The difficulty of the exercise.",
      Status: "The status of the exercise.",
      Instructions: "Instructions to teachers about the exercise.",
      Statements:
        "The statement of the exercise to present to the student in the various languages.",
      Embeddables:
        "Images, videos, and other files that can be embedded in the statement.",
      Skeletons: "Part of a solution that is provided to the students.",
      Libraries:
        "Code libraries that can be used by solutions, either in compilation or execution phase.",
      StaticCorrectors:
        "External programs that are invoked before dynamic correction to classify/process the program's source code.",
      DynamicCorrectors:
        "External programs that are invoked after the main correction to classify each run.",
      Solutions: "Solutions provided by the author(s) of the exercise.",
      Templates:
        "Part of a solution that wraps students' code without their awareness.",
      Tests: "Set(s) of test cases to validate if attempts are correct.",
      TestGenerators:
        "External programs that generate the test cases to validate a solution.",
      FeedbackGenerators:
        "External programs that generate additional feedback to give to the student about his/her attempt to achieve a solution."
    }
  },

  // gamification layer
  GamificationLayer: {
    Name: "Name",
    Description: "Description",
    Keywords: "Keywords",
    Status: "Status",
    Statuses: {
      DRAFT: "Draft",
      UNPUBLISHED: "Unpublished",
      PUBLISHED: "Published",
      TRASH: "Trash"
    },
    Challenges: "Challenges",
    Rules: "Rules",
    Rewards: "Rewards",
    Leaderboards: "Leaderboards",
    Tree: {},
    Form: {
      Metadata: "Metadata",
      Structure: "Structure",
      Previous: "Previous",
      Next: "Next",
      Finish: "Finish"
    },
    _Challenge: "Challenge",
    Challenge: {
      Name: "Name",
      Description: "Description",
      Mode: "Mode",
      Modes: {
        NORMAL: "NORMAL",
        SHAPESHIFTER: "SHAPESHIFTER",
        SHORTENING: "SHORTENING",
        SPEEDUP: "SPEEDUP",
        HACK_IT: "HACK IT",
        TIME_BOMB: "TIME BOMB",
        DUEL: "DUEL"
      },
      ModeParameters: "Mode Parameters",
      Locked: "Locked",
      Hidden: "Hidden",
      Difficulty: "Difficulty",
      Difficulties: {
        BEGINNER: "BEGINNER",
        EASY: "EASY",
        AVERAGE: "AVERAGE",
        HARD: "HARD",
        MASTER: "MASTER"
      },
      LinkedExercises: "Linked Exercises"
    },
    _Leaderboard: "Leaderboard",
    Leaderboard: {
      Name: "Name",
      Metrics: "Metrics",
      Metric: "Metric",
      SortingOrder: "Sorting Order",
      SortingOrders: {
        ASC: "ASC",
        DESC: "DESC"
      }
    },
    _Reward: "Reward",
    Reward: {
      Name: "Name",
      Description: "Description",
      Kind: "Kind",
      Kinds: {
        POINT: "POINT",
        BADGE: "BADGE",
        VIRTUAL_ITEM: "VIRTUAL ITEM",
        COUPON: "COUPON",
        REVEAL: "REVEAL",
        UNLOCK: "UNLOCK",
        HINT: "HINT",
        MESSAGE: "MESSAGE"
      },
      Amount: "Amount",
      UnlockableExercises: "Unlockable Exercises",
      UnlockableChallenges: "Unlockable Challenges",
      RevealableExercises: "Revealable Exercises",
      RevealableChallenges: "Revealable Challenges",
      Hints: "Hints",
      Hint: "Hint",
      Congratulations: "Congratulations",
      Congratulation: "Congratulation"
    },
    _Criteria: "Criteria",
    Criteria: {
      LeftEntity: "Left Entity",
      LeftProperty: "Left Property",
      RightEntity: "Right Entity",
      RightProperty: "Right Property",
      Subject: "Subject",
      Subjects: {
        FIXED: "FIXED",
        EVENT: "EVENT",
        ACTION: "ACTION",
        PLAYER: "PLAYER",
        ENVIRONMENT: "ENVIRONMENT"
      },
      ComparingFunction: "Comparing Function",
      ComparingFunctions: {
        LESS_THAN: "LESS THAN",
        GREATER_THAN: "GREATER THAN",
        LESS_OR_EQUAL: "LESS OR EQUAL",
        GREAT_OR_EQUAL: "GREAT OR EQUAL",
        EQUALS: "EQUALS",
        NOT_EQUALS: "NOT EQUALS",
        STARTS_WITH: "STARTS WITH",
        MATCHES: "MATCHES",
        NOT_MATCHES: "NOT MATCHES",
        IS_EMPTY: "IS EMPTY",
        NOT_EMPTY: "NOT EMPTY",
        IN: "IN",
        NOT_IN: "NOT IN"
      },
      Junctor: "Junctor",
      Junctors: {
        AND: "AND",
        OR: "OR"
      }
    },
    _Rule: "Rule",
    Rule: {
      Name: "Name",
      ActionType: "Type of Action",
      ActionTypes: {
        GIVE: "GIVE",
        TAKE: "TAKE",
        UPDATE: "UPDATE"
      },
      Actions: "Actions",
      ActionParameters: "Action Parameters"
    },
    OpenExercisePicker: "Open Picker",
    PickExercisesDialog: {
      Title: "Pick Exercises",
      SelectAll: "Select All"
    }
  },

  validation: {
    alpha: "The {_field_} field may only contain alphabetic characters",
    alpha_num: "The {_field_} field may only contain alpha-numeric characters",
    alpha_dash:
      "The {_field_} field may contain alpha-numeric characters as well as dashes and underscores",
    alpha_spaces:
      "The {_field_} field may only contain alphabetic characters as well as spaces",
    between: "The {_field_} field must be between {min} and {max}",
    confirmed: "The {_field_} field confirmation does not match",
    digits:
      "The {_field_} field must be numeric and exactly contain {length} digits",
    dimensions: "The {_field_} field must be {width} pixels by {height} pixels",
    email: "The {_field_} field must be a valid email",
    excluded: "The {_field_} field is not a valid value",
    ext: "The {_field_} field is not a valid file",
    image: "The {_field_} field must be an image",
    integer: "The {_field_} field must be an integer",
    length: "The {_field_} field must be {length} long",
    max_value: "The {_field_} field must be {max} or less",
    max: "The {_field_} field may not be greater than {length} characters",
    eachMax:
      "Each value in {_field_} field may not be greater than {length} characters",
    mimes: "The {_field_} field must have a valid file type",
    min_value: "The {_field_} field must be {min} or more",
    min: "The {_field_} field must be at least {length} characters",
    minLength: "{_field_} field should have at least {length} entries",
    sameLength:
      "{_field_} field should have the same number of entries as {other}",
    numeric: "The {_field_} field may only contain numeric characters",
    oneOf: "The {_field_} field is not a valid value",
    regex: "The {_field_} field format is invalid",
    required_if: "The {_field_} field is required",
    required: "The {_field_} field is required",
    size: "The {_field_} field size must be less than {size}KB",
    maxFileSize: "The field size must be less than {filesize}",
    passwordConfirmation:
      "The password confirmation does not match the password",
    criteria: "The {_field_} is not a valid conditional",
    strongPassword:
      "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (e.g. , . _ & ? etc)"
  },
  fields: {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    password: "Password",
    password_confirmation: "Password Confirmation",
    old_password: "Old Password",
    new_password: "New Password",
    new_password_confirmation: "New Password Confirmation",
    terms: "Terms and Conditions",
    title: "Title",
    module: "Module",
    keywords: "Keywords",
    type: "Type",
    event: "Event",
    platform: "Platform",
    difficulty: "Difficulty",
    status: "Status",
    Instructions: "Instructions",
    Statements: "Statements",
    Embeddables: "Embeddables",
    Libraries: "Libraries",
    StaticCorrectors: "Static Correctors",
    DynamicCorrectors: "Dynamic Correctors",
    TestGenerators: "Test Generators",
    FeedbackGenerators: "Feedback Generators",
    Skeletons: "Skeletons",
    Solutions: "Solutions",
    Templates: "Templates",
    Tests: "Tests",
    TestSets: "Test Sets",
    format: "Format",
    nat_lang: "Natural Language",
    prog_lang: "Programming Language",
    file: "File",
    command_line: "Command Line",
    name: "Name",
    description: "Description",
    metrics: "Metrics",
    kind: "Kind",
    mode: "Mode",
    unlockable_exercises: "Unlockable Exercises",
    unlockable_challenges: "Unlockable Challenges",
    revealable_exercises: "Revealable Exercises",
    revealable_challenges: "Revealable Challenges",
    hints: "Hints",
    congratulations: "Congratulations",
    criteria: "Criteria",
    action_types: "Action Types",
    parameters: "Parameters",
    reward_parameters: "Reward Parameters",
    updated_at: "Last Modified Date",
    created_at: "Created Date"
  },

  Messages: {
    Success: {
      ProfileSaved: {
        Title: "Profile saved successfully",
        Description: "Your profile has been updated."
      },
      PasswordChanged: {
        Title: "Password changed successfully",
        Description: "Your password has been updated."
      }
    },
    Error: {
      ProfileNotSaved: {
        Title: "Failed to save profile",
        Description: ""
      },
      PasswordNotChanged: {
        Title: "Failed to change password",
        Description: ""
      }
    }
  }
};
