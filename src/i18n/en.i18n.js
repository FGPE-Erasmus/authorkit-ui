export default {
  Home: "Home",
  Profile: "Profile",
  Dashboard: "Dashboard",
  Exercises: "Exercises",
  ExerciseForm: "Exercise Form",
  GamificationLayers: "Gamification Layers",
  GamificationLayerForm: "Gamification Layer Form",
  Help: "Help",
  ExitToDashboard: "Exit To Dashboard",

  ReturnHome: "Return Home",

  Navbar: {
    Profile: "Profile",
    Logout: "Logout",
    Search: {
      Button: "Search",
      Placeholder: "Search"
    },
    Lights: {
      On: "Turn the lights off",
      Off: "Turn the lights on"
    },
    HelpTutorial: "Show help tutorial"
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
      "To get back to your dashboard, you must enter your password below.",
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
  Tour: {
    Skip: "Skip",
    Previous: "Previous",
    Next: "Next",
    Finish: "Finish",
    Navbar: {
      languageSwitch: "You can change UI language from here.",
      searchButton:
        "You can click here to filter results by some field values. Use &lt;field&gt;:&lt;value&gt; for fields" +
        " whose value belongs to a well-defined set of possible values and/or any text for open text fields.",
      themeButton: "You can switch between light and dark mode here.",
      tutorialButton: "Use this button to toggle this contextual help.",
      loginButton: "Click here to go to sign-in form.",
      userAvatar:
        "This is your identification. Click to open a dropdown to open user profile or exit session."
    },
    Projects: {
      createButton:
        "Click here to create a project. A project is just an organizational unit within AuthorKit, which can be " +
        "exported/imported in different AuthorKit instances and shared among users within the same AuthorKit instance.",
      importButton:
        "Click here to import a project. A project archive contains a JSON metadata file describing the project, " +
        "a folder <code>exercises</code> with all exercises in YAPExIL format, and a folder " +
        "<code>gamification-layers</code> with all gamification layers in GEdIL format.",
      sortingFieldSelector: "Choose a field and the order to sort results by.",
      pageSizeSelector: "Select the size of the page.",
      listViewToggle: "Toggle between the list and card views.",
      pagination: "Navigate among results' pages.",
      content:
        "<p>Here are the projects that you can see.</p><p>Clicking in a row/card opens the project context, where" +
        " you will be able to manage/view exercises and gamification layers.</p>"
    },
    Exercises: {
      createButton:
        "Click here to create an exercise. An exercise is a non-gamified task that the learners will solve, supported" +
        " with feedback from the automated assessment system we load it into.",
      importButton:
        "Click here to import an exercise in a supported exercise format. AuthorKit uses YAPExIL format for exercises," +
        " but it allows to import existing exercises in other formats such as SIPE and MEF. The same for exporting " +
        "exercises.",
      sortingFieldSelector: "Choose a field and the order to sort results by.",
      pageSizeSelector: "Select the size of the page.",
      listViewToggle: "Toggle between the list and card views.",
      pagination: "Navigate among results' pages.",
      content:
        "<p>Here are the exercises of the project.</p><p>Clicking in a row/card opens the exercise form, where" +
        " you will be able to edit/view exercise data and files. </p>"
    },
    GamificationLayers: {
      createButton:
        "Click here to create a gamification layer. A gamification layer is an envelope for a set of exercises that " +
        "adds rules, rewards, leaderboards, and some mods to them.",
      importButton:
        "Click here to import a gamification layer in GEdIL format.",
      sortingFieldSelector: "Choose a field and the order to sort results by.",
      pageSizeSelector: "Select the size of the page.",
      listViewToggle: "Toggle between the list and card views.",
      pagination: "Navigate among results' pages.",
      content:
        "<p>Here are the gamification layers of the project.</p><p>Clicking in a row/card opens the gamification " +
        "layer form, where you will be able to edit/view the gamification layer. </p>"
    }
  },

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
    Send: "Send",
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

  ImageUpload: {
    Hint: "Drop an image here"
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

  SelectExercises: {
    Exercises: "Exercises",
    OpenPicker: "Open Picker"
  },

  Select: {
    OpenPicker: "Open Picker"
  },

  PickerDialog: {
    PickOption: "Pick an Option",
    PickOptions: "Pick Options",
    SelectAll: "Select All",
    Query: "Search ..."
  },

  // projects
  Projects: {
    Title: "Projects",
    Card: {
      Contributors: "Contributors",
      GamificationLayers: "Gamification Layers",
      Exercises: "Exercises",
      Open: "Open project ..."
    }
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
      CLOSED: "Closed",
      UNPUBLISHED: "Unpublished"
    },
    Public: "Public?"
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
    Timeout: "Timeout",
    ProgrammingLanguages: "Programming Languages",
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
    ExportDialog: {
      Title: "Choose exporting format for exercise",
      Format: {
        yapexil: "YAPExIL",
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
      ProgrammingLanguages:
        "Programming languages to which the exercise was designed.",
      Timeout: "Maximum execution time of the exercise (in seconds).",
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
      GroupScope: "Group scoped?",
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
      Challenges: "Challenges",
      Exercise: "Exercise",
      Hints: "Hints",
      Hint: "Hint",
      Congratulations: "Congratulations",
      Congratulation: "Congratulation",
      Message: "Message",
      Recurrent: "Recurrent",
      Cost: "Cost",
      Purchasable: "Purchasable"
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
    Triggers: "Triggers",
    Trigger: {
      Type: "Type of Trigger",
      Types: {
        TIME: "TIME",
        ACTION: "ACTION"
      },
      Event: "Event",
      Events: {
        INTERVAL: "INTERVAL",
        CRONJOB: "CRONJOB",
        GAME_STARTED: "GAME STARTED",
        GAME_FINISHED: "GAME FINISHED",
        PLAYER_ENROLLED: "PLAYER ENROLLED",
        PLAYER_LEFT: "PLAYER LEFT",
        SUBMISSION_RECEIVED: "SUBMISSION RECEIVED",
        SUBMISSION_EVALUATED: "SUBMISSION EVALUATED",
        SUBMISSION_ACCEPTED: "SUBMISSION ACCEPTED",
        SUBMISSION_REJECTED: "SUBMISSION REJECTED",
        CHALLENGE_OPENED: "CHALLENGE OPENED",
        CHALLENGE_REVEALED: "CHALLENGE REVEALED",
        CHALLENGE_COMPLETED: "CHALLENGE COMPLETED",
        CHALLENGE_FAILED: "CHALLENGE FAILED",
        REWARD_GRANTED: "REWARD GRANTED",
        PLAYER_UPDATED: "PLAYER UPDATED",
        POINTS_UPDATED: "POINTS UPDATED",
        DUEL_INITIATED: "DUEL INITIATED",
        DUEL_INVITATION_RECEIVED: "DUEL INVITATION RECEIVED",
        DUEL_ACCEPTED: "DUEL ACCEPTED",
        DUEL_REJECTED: "DUEL REJECTED",
        DUEL_COMPLETED: "DUEL COMPLETED"
      },
      Recurrent: "Recurrent",
      Challenge: "Challenge",
      Exercise: "Exercise",
      Reward: "Reward",
      Cronjob: {
        InvalidExpression: "Invalid cron expression"
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
    },
    ExportDialog: {
      Title: "Choose exporting format",
      Format: {
        yapexil: "GEdIL + YAPExIL",
        mef: "GEdIL + MEF",
        doNotIncludeExercises: "GEdIL (i.e., do not include exercises)"
      },
      Action: {
        Ok: "OK",
        Cancel: "Cancel"
      }
    }
  },
  ValueExtractor: {
    Title: "JSON Path",
    _Variables: "Variables",
    Variables: {
      _Type: "Type",
      Type: {
        CHALLENGE: "CHALLENGE",
        EXERCISE: "EXERCISE",
        REWARD: "REWARD"
      }
    },
    EditVariables: "Edit Variables ...",
    Popup: {
      Title: "Edit Variables ...",
      _Variables: "Variables",
      Variables: {
        Challenge: "Challenge",
        Exercise: "Exercise",
        _Type: "Type",
        Type: {
          CHALLENGE: "CHALLENGE",
          EXERCISE: "EXERCISE",
          REWARD: "REWARD"
        }
      }
    }
  },
  ArgumentsInput: {
    Title: "Arguments",
    _Variables: "Variables",
    Variables: {
      _Type: "Type",
      Type: {
        CHALLENGE: "CHALLENGE",
        EXERCISE: "EXERCISE",
        REWARD: "REWARD"
      }
    },
    EditVariables: "Edit Variables ...",
    Popup: {
      Title: "Edit Variables ...",
      _Variables: "Variables",
      Variables: {
        Challenge: "Challenge",
        Exercise: "Exercise",
        Reward: "Reward",
        _Type: "Type",
        Type: {
          CHALLENGE: "CHALLENGE",
          EXERCISE: "EXERCISE",
          REWARD: "REWARD"
        }
      }
    }
  },

  // sidebars
  ExecutableFile: {
    CommandLine: "Command Line",
    Hints: {
      CommandLine:
        "The command line to execute the file with. Use $FILE to refer to the absolute path to the file."
    }
  },
  FormattedTextFile: {
    Format: "Format",
    NatLang: "Natural Language",
    Hints: {
      Format:
        "The format of the uploaded file. Either PDF (Portable Document Format), MARKDOWN (a lightweight markup language), HTML (HyperText Markup Language), or TXT (text).",
      NatLang:
        "Language used in the file to communicate with people (NOT the programming language)."
    }
  },
  CodeFile: {
    ProgLang: "Programming Language",
    Hints: {
      ProgLang:
        "An artificial language used to write instructions that can be translated into machine language and then executed by a computer."
    }
  },
  TestSetFile: {
    Name: "Name",
    Weight: "Weight",
    Visible: "Visible?",
    Hints: {
      Name: "Name to identify this test set.",
      Weight: "Weight of this test set in the overall grade.",
      Visible: "Is this test set visible?"
    }
  },
  TestFile: {
    Input: "Input",
    Output: "Output",
    Arguments: "Arguments",
    Weight: "Weight",
    Visible: "Visible?",
    Timeout: "Timeout",
    Feedback: "Feedback",
    FeedbackMessage: "Message",
    FeedbackWeight: "Weight",
    Hints: {
      Input: "Input test file to feed the program with.",
      Output: "Output test file to compare the program's output with.",
      Arguments: "Arguments to pass to the tested program.",
      Weight: "Weight of this test in the overall grade.",
      Visible: "Is this test visible?",
      Timeout: "Maximum execution time of this test (in seconds)",
      Feedback:
        "Feedback messages and respective weight to display when the test fails."
    }
  },

  // Documentation
  Documentation: {
    Title: "Documentation",
    Topics: {
      Title: "Topics",
      All: "All",
      General: "General",
      Project: "Project",
      Exercise: "Exercise",
      GamificationLayer: "Gamification Layer"
    },
    Questions: {
      Q1: "What is this?",
      A1:
        "AuthorKit is a web application to support the authors through the whole process of preparing gamified programming exercises. The authoring process aims for simplicity and reusability, allowing you to import content from popular non-gamified exercise formats, and export it or share it with other peers, internally or via a GitHub repository.",
      Q2: "Can I load my existing set of programming exercises?",
      A2:
        "As of now, AuthorKit supports programming exercises adhering to one of three formats: YAPExIL, MEF, and SIPE. Hence, you are able to upload them if they comply to one of those formats. Otherwise, if you think your format is a must-have to AuthorKit, ask us to integrate it or make a PR.",
      Q3: "Q",
      A3: "A",
      Q4: "Q",
      A4: "A",
      Q5: "How to create a project?",
      A5:
        '<p>See the video below</p><br/><video width="100%" controls><source src="{src}" type="video/mp4"></video>',
      Q6: "Q",
      A6: "A",
      Q7: "Q",
      A7: "A",
      Q8: "Q",
      A8: "A",
      Q9: "How to create an exercise?",
      A9:
        '<p>See the video below</p><br/><video width="100%" controls><source src="{src}" type="video/mp4"></video>',
      Q10: "How to develop a source-code checker?",
      A10:
        "<p class='my-1'>A source-code checker is an external program that is invoked before dynamic correction to classify/process the program's source code. In this field you can write a command line to invoke a source-code checker and you may use these variables:</p>" +
        "<ul style='list-style: none; padding-inline-start: 40px; margin: 1em 0'>" +
        "<li>$home         - Mooshak's home director</li>" +
        "<li>$program      - absolute pathname of file with submitted program</li>" +
        "<li>$problem      - absolute pathname of problem</li>" +
        "<li>$solution     - absolute pathname of problem solution file</li>" +
        "<li>$environment  - absolute pathname of environment data file</li>" +
        "</ul>" +
        "<p class='my-1'>The values of these variables will also be available to the process as environment variables with the same names in capitals. For instance, the command line variable $home will be available as the environment variable HOME.</p>" +
        "<p class='my-1'>The special corrector must return the new classification as its exit code. The correspondence between exit values and classifications is the following:</p>" +
        "<ul style='list-style: none; padding-inline-start: 40px; margin: 1em 0'>" +
        "<li>  0 - Accepted</li>" +
        "<li>  1 - Presentation Error</li>" +
        "<li>  2 - Wrong Answer</li>" +
        "<li>  3 - Evaluation Skipped</li>" +
        "<li>  4 - Output Limit Exceeded</li>" +
        "<li>  5 - Memory Limit Exceeded</li>" +
        "<li>  6 - Time Limit Exceeded</li>" +
        "<li>  7 - Invalid Function</li>" +
        "<li>  8 - Invalid Exit Value</li>" +
        "<li>  9 - Runtime Error</li>" +
        "<li> 10 - Compile Time Error</li>" +
        "<li> 11 - Invalid Submission</li>" +
        "<li> 12 - Program Size Exceeded</li>" +
        "<li> 13 - Requires Reevaluation</li>" +
        "<li> 14 - Evaluating</li>" +
        "</ul>" +
        "<p class='my-1'>If the exit value is a negative value, then its symmetric is taken as the submission mark, and the classification is Accepted (e.g. If exit value is -100 then the mark is 100).</p>" +
        "<p class='my-1'>Use $FILE to refer to the absolute path to the script file.</p>",
      Q11: "How to develop a output checker?",
      A11:
        "<p class='my-1'>An output checker is an external program that is invoked after Mooshak's correction to classify each run. In this field you can write a command line to invoke a dynamic corrector and you may use these variables:</p>" +
        "<ul style='list-style: none; padding-inline-start: 40px; margin: 1em 0'>" +
        "<li>$home       - Mooshak's home directory</li>" +
        "<li>$program    - absolute pathname of file with submitted program</li>" +
        "<li>$problem    - absolute pathname of problem</li>" +
        "<li>$input      - absolute pathname of input data file</li>" +
        "<li>$expected   - absolute pathname of file with expected output</li>" +
        "<li>$obtained   - absolute pathname of file with obtained output</li>" +
        "<li>$error      - absolute pathname of file with obtained error output</li>" +
        "<li>$args       - command line arguments</li>" +
        "<li>$context    - absolute path name of context file</li>" +
        "<li>$classify_code  - (integer) current classification on Mooshak</li>" +
        "</ul>" +
        "<p class='my-1'>The values of these variables will also be available to the process as environment variables with the same names in capitals.For instance, the command line variable $classify will be available as as the environment variable CLASSIFY_CODE</p>" +
        "<p class='my-1'>The special corrector must return the new classification as its exit code, i.e. the new value for CLASSIFY_CODE. The correspondence between exit values and classifications is the following:</p>" +
        "<ul style='list-style: none; padding-inline-start: 40px; margin: 1em 0'>" +
        "<li>  0 - Accepted</li>" +
        "<li>  1 - Presentation Error</li>" +
        "<li>  2 - Wrong Answer</li>" +
        "<li>  3 - Evaluation Skipped</li>" +
        "<li>  4 - Output Limit Exceeded</li>" +
        "<li>  5 - Memory Limit Exceeded</li>" +
        "<li>  6 - Time Limit Exceeded</li>" +
        "<li>  7 - Invalid Function</li>" +
        "<li>  8 - Invalid Exit Value</li>" +
        "<li>  9 - Runtime Error</li>" +
        "<li> 10 - Compile Time Error</li>" +
        "<li> 11 - Invalid Submission</li>" +
        "<li> 12 - Program Size Exceeded</li>" +
        "<li> 13 - Requires Reevaluation</li>" +
        "<li> 14 - Evaluating</li>" +
        "</ul>" +
        "<p class='my-1'>If the exit value is a negative value, then its symmetric is taken as the submission mark, and the classification is Accepted (e.g. If exit value is -100 then the mark is 100).</p>" +
        "<p class='my-1'>Use $FILE to refer to the absolute path to the script file.</p>",
      Q12: "Q",
      A12: "A",
      Q13: "How to create a gamification layer?",
      A13:
        '<p>See the video below</p><br/><video width="100%" controls><source src="{src}" type="video/mp4"></video>',
      Q14: "Q",
      A14: "A",
      Q15: "How to define actions in rules?",
      A15: "A",
      Q16: "How to define criteria properties?",
      A16:
        "<p>Criteria properties are defined using JSONPath.</p>" +
        "<h5>Syntax</h5>\n" +
        "<p>JSONPath expressions start with <code>$.</code> indicating the root element.</p>\n" +
        "<pre> $.player.submissions[0].result              \n" +
        ' player.submissions[0].result                # With implicit "$."\n' +
        "\n" +
        " $['player']['submissions'][0]['result']     # Alternative notation similar to scripting languages\n" +
        "</pre><h6>Tree Traversal</h6>\n" +
        '<pre> $.parentNode.childNode.field       # content of "field" of all</span> <span>"childNode"</span>s <span>of</span> <span>"parentNode"</span>\n' +
        ' $..anyChildNode                    # <span>all</span> children <span>at</span> any depth named <span>"anyChildNode"</span>\n' +
        ' $.parentNode.*                     # <span>all</span> children below <span>"parentNode"</span>\n' +
        "</pre><h6>Array Access</h6>\n" +
        "<pre> <span>$.</span>submissions[<span>0</span>]            <span># first element</span>\n" +
        " <span>$.</span>submissions[-<span>1</span>]           <span># last element</span>\n" +
        " <span>$.</span>submissions[<span>2</span><span>:</span><span>3</span>]          <span># range</span>\n" +
        " <span>$.</span>submissions[<span>0</span>,<span>4</span>,<span>5</span>]        <span># selection</span>\n" +
        "</pre><h6>Filtering</h6>\n" +
        "<pre>" +
        ' $.player[?(@.group)]                    # Only player that have attribute <span>"group"</span>\n' +
        " $.player[?(@.submissions.length === 5)] # Only player with 5 submissions\n" +
        " $.player[?(@.points &gt; 20)]              # Only player with more than 20 points\n" +
        "</pre><h6>Complex Conditions</h6>\n" +
        "<pre> $.submissions[?(@.result == <span>'ACCEPTED'</span> || @.grade &gt;= <span>100</span>)]     # logical or\n" +
        " $.submissions[?(@.result == <span>'ACCEPTED'</span> &amp;&amp; @.grade &gt;= <span>100</span>)]     # logical and\n" +
        "</pre><h6>Output Mapping</h6>\n" +
        "<pre> $.[].<span>{Name:name, Age:age, Hobbies:details.hobbies}</span>        # Mapping fields/<span>nested</span> fields <span>to</span> <span>new</span> <span>set</span>\n" +
        "</pre><h5>Target JSON Objects in AuthorKit</h5>\n" +
        "<p>JSON Objects to which JSONPath expressions can be applied.</p>\n" +
        "<h6>EVENT</h6>\n" +
        "<pre>{\n" +
        "    ... event parameters ...\n" +
        "    player?: {\n" +
        "        ...\n" +
        "    }\n" +
        "}\n" +
        "</pre><h6>ACTION</h6>\n" +
        "<pre>{\n" +
        "    ... action parameters ...\n" +
        "    player?: {\n" +
        "        ...\n" +
        "    }\n" +
        "}\n" +
        "</pre><h6>PLAYER</h6>\n" +
        "<pre>{\n" +
        "    user: string;\n" +
        "    group?: string;\n" +
        "    points?: number;\n" +
        "    rewards: [\n" +
        "        {\n" +
        "\n" +
        "        },\n" +
        "        ...\n" +
        "    ];\n" +
        "    learningPath: [\n" +
        "        {\n" +
        "            challenge?: string;\n" +
        "            startedAt?: Date;\n" +
        "            openedAt?: Date;\n" +
        "            endedAt?: Date;\n" +
        "            refs?: string[];\n" +
        "            state?: 'AVAILABLE' | 'LOCKED' | 'HIDDEN' | 'OPENED' | 'FAILED' | 'COMPLETED' | 'REJECTED';\n" +
        "            progress?: number;\n" +
        "        },\n" +
        "        ...\n" +
        "    ]\n" +
        "    submissions: [\n" +
        "        {\n" +
        "            player?: string\n" +
        "            exerciseId?: string;\n" +
        "            evaluationEngine?: EvaluationEngine;\n" +
        "            language?: string;\n" +
        "            metrics?: Map&lt;string, any&gt;;\n" +
        "            result?: Result;\n" +
        "            grade?: number;\n" +
        "            feedback?: string;\n" +
        "            submittedAt?: Date;\n" +
        "        },\n" +
        "        ...\n" +
        "    ];\n" +
        "}\n" +
        "</pre><h6>ENVIRONMENT</h6>\n" +
        "<pre>{\n" +
        "    players: [\n" +
        "        {\n" +
        "            user: string;\n" +
        "            group?: string;\n" +
        "            points?: number;\n" +
        "            rewards: [Reward];\n" +
        "            learningPath: [\n" +
        "                {\n" +
        "                    challenge?: string;\n" +
        "                    startedAt?: Date;\n" +
        "                    openedAt?: Date;\n" +
        "                    endedAt?: Date;\n" +
        "                    refs?: string[];\n" +
        "                    state?: 'AVAILABLE' | 'LOCKED' | 'HIDDEN' | 'OPENED' | 'FAILED' | 'COMPLETED' | 'REJECTED';\n" +
        "                    progress?: number;\n" +
        "                },\n" +
        "                ...\n" +
        "            ]\n" +
        "            submissions: [Submission];\n" +
        "        },\n" +
        "        ...\n" +
        "    ],\n" +
        "    submissions: [\n" +
        "        {\n" +
        "            player?: string\n" +
        "            exerciseId?: string;\n" +
        "            evaluationEngine?: EvaluationEngine;\n" +
        "            language?: string;\n" +
        "            metrics?: Map&lt;string, any&gt;;\n" +
        "            result?: Result;\n" +
        "            grade?: number;\n" +
        "            feedback?: string;\n" +
        "            submittedAt?: Date;\n" +
        "        },\n" +
        "        ...\n" +
        "    ],\n" +
        "    current_time: number\n" +
        "}\n" +
        '</pre><h5 id="example-queries">Example Queries</h5>\n' +
        "<p>Exercises that the player solved from a set of two</p>\n" +
        '<pre>$.player.submissions[?((@.exerciseId === ${V0} || @.exerciseId === ${V1}) &amp;&amp; @.result === <span>"ACCEPTED"</span>)]\n' +
        "</pre>"
    }
  },
  Support: {
    Title: "Support",
    Partners: {
      Title: "Partners",
      Poland: "Uniwersytet Szczeciński (Poland)",
      Porto:
        "INESC TEC – Instituto de Engenharia de Sistemas e Computadores, Tecnologia e Ciência (Portugal)",
      Denmark: "Aalborg Universitet (Denmark)",
      Italy: "Universita Degli Studi Di Napoli Parthenope (Italy)"
    },
    Information: {
      Title: "Contact Information",
      Address:
        "Faculty of Economics and Management, Institute of IT in Management, University of Szczecin, Mickiewicza 64, Szczecin 71-101, Poland"
    },
    Form: {
      Title: "Send Message",
      Subject: "Subject",
      Description: "Description"
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
      "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (e.g. , . _ & ? etc)",
    triggers: "Invalid triggers found",
    cronjob: "Invalid cron expression"
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
    triggers: "Triggers",
    action_types: "Action Types",
    parameters: "Parameters",
    cronjob: "Cron",
    reward_parameters: "Reward Parameters",
    updated_at: "Last Modified Date",
    created_at: "Created Date",
    challenge: "Challenge",
    exercise: "Exercise",
    reward: "Reward",
    message: "Message",
    subject: "Subject",
    inputFile: "Input File",
    outputFile: "Output File",
    timeout: "Time out",
    weight: "Weight"
  },

  Messages: {
    Success: {
      SupportMessage: {
        Title: "Message Sent",
        Description: "Your support message has been sent."
      },
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
      SupportMessage: {
        Title: "Message NOT Sent",
        Description: "Failed to send your support message. Reason: {reason}"
      },
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
