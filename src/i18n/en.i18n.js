export default {
  Dashboard: "Dashboard",
  Projects: "Projects",
  Exercises: "Exercises",
  GamificationLayers: "Gamification Layers",
  Contributors: "Contributors",
  Support: "Support",
  Documentation: "Documentation",
  RaiseSupport: "Raise Support",
  ExitToDashboard: "Exit To Dashboard",

  ReturnHome: "Return Home",

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
    TermsConditions: "I accept the terms & conditions.",
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
      ItemsPerPage: "{start}-{end} of {size}"
    }
  },

  Card: {
    Actions: {
      Edit: "Edit",
      Delete: "Delete",
      Export: "Export"
    }
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

  _Project: "Project",
  Project: {
    Status: "Status"
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
      }
    },
    _TestSet: "Test Set",
    TestSet: {
      Name: "Name"
    },
    Types: {
      BlankSheet: "Blank Sheet",
      Extension: "Extension",
      Improvement: "Improvement",
      BugFix: "Bug Fix",
      FillInGaps: "Fill-in the Gaps",
      SortBlocks: "Sort Blocks",
      SpotBug: "Spot the Bug"
    },
    DifficultyLevels: {
      Beginner: "Beginner",
      Easy: "Easy",
      Average: "Average",
      Hard: "Hard",
      Master: "Master"
    },
    Statuses: {
      Draft: "Draft",
      Unpublished: "Unpublished",
      Published: "Published",
      Trash: "Trash"
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
    }
  },

  // gamification layer
  GamificationLayer: {
    Name: "Name",
    Description: "Description",
    Keywords: "Keywords",
    Status: "Status",
    Statuses: {
      Draft: "Draft",
      Unpublished: "Unpublished",
      Published: "Published",
      Trash: "Trash"
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
    criteria: "The {_field_} is not a valid conditional"
  },
  fields: {
    firstname: "first name",
    lastname: "last name",
    email: "email",
    password: "password",
    password_confirmation: "password confirmation",
    terms: "terms and conditions",
    title: "title",
    module: "module",
    keywords: "keywords",
    type: "type",
    event: "event",
    platform: "platform",
    difficulty: "difficulty",
    status: "status",
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
    format: "format",
    nat_lang: "natural language",
    prog_lang: "programming language",
    file: "file",
    command_line: "command line",
    name: "name",
    description: "description",
    metrics: "metrics",
    kind: "kind",
    mode: "mode",
    unlockable_exercises: "unlockable exercises",
    unlockable_challenges: "unlockable challenges",
    revealable_exercises: "revealable exercises",
    revealable_challenges: "revealable challenges",
    hints: "hints",
    congratulations: "congratulations",
    criteria: "criteria",
    action_types: "action types",
    parameters: "parameters",
    reward_parameters: "reward parameters"
  }
};
