## About JSONPath

### Syntax

JSONPath expressions start with `$.` indicating the root element.

     $.player.submissions[0].result              
     player.submissions[0].result                # With implicit "$."
     
     $['player']['submissions'][0]['result']     # Alternative notation similar to scripting languages

### Tree Traversal

     $.parentNode.childNode.field       # content of "field" of all "childNode"s of "parentNode"
     $..anyChildNode                    # all children at any depth named "anyChildNode"
     $.parentNode.*                     # all children below "parentNode"

### Array Access

     $.submissions[0]            # first element
     $.submissions[-1]           # last element
     $.submissions[2:3]          # range
     $.submissions[0,4,5]        # selection

### Filtering

     $.s[?(@.car)]                      # Only "customer"s that have attribute "car"
     $.customer[?(@.car == 'Ford Fiesta')]     # Only "customer"s with "Ford Fiesta"s
     $.customer[?(@.age > 18)]                 # Only adults

### Complex Conditions

     $.submissions[?(@.result == 'ACCEPTED' || @.grade >= 100)]     # logical or
     $.submissions[?(@.result == 'ACCEPTED' && @.grade >= 100)]     # logical and

### Output Mapping

     $.[].{Name:name, Age:age, Hobbies:details.hobbies}        # Mapping fields/nested fields to new set


## Target JSON Objects in AuthorKit

JSON Objects to which JSONPath expressions can be applied.

### EVENT
    
    {
    	... event parameters ...
    	player?: {
    		...
    	}
    }

### ACTION
    
    {
    	... action parameters ...
    	player?: {
    		...
    	}
    }

### PLAYER

    {
        user: string;
        group?: string;
        points?: number;
        rewards: [
            {
                
            },
            ...
        ];
        learningPath: [
            {
                challenge?: string;
                startedAt?: Date;
                openedAt?: Date;
                endedAt?: Date;
                refs?: string[];
                state?: 'AVAILABLE' | 'LOCKED' | 'HIDDEN' | 'OPENED' | 'FAILED' | 'COMPLETED' | 'REJECTED';
                progress?: number;
            },
            ...
        ]
        submissions: [
            {
                player?: string
                exerciseId?: string;
                evaluationEngine?: EvaluationEngine;
                language?: string;
                metrics?: Map<string, any>;
                result?: Result;
                grade?: number;
                feedback?: string;
                submittedAt?: Date;
            },
            ...
        ];
    }

### ENVIRONMENT

    {
        players: [
            {
                user: string;
                group?: string;
                points?: number;
                rewards: [Reward];
                learningPath: [
                    {
                        challenge?: string;
                        startedAt?: Date;
                        openedAt?: Date;
                        endedAt?: Date;
                        refs?: string[];
                        state?: 'AVAILABLE' | 'LOCKED' | 'HIDDEN' | 'OPENED' | 'FAILED' | 'COMPLETED' | 'REJECTED';
                        progress?: number;
                    },
                    ...
                ]
                submissions: [Submission];
            },
            ...
        ],
        submissions: [
            {
                player?: string
                exerciseId?: string;
                evaluationEngine?: EvaluationEngine;
                language?: string;
                metrics?: Map<string, any>;
                result?: Result;
                grade?: number;
                feedback?: string;
                submittedAt?: Date;
            },
            ...
        ],
        current_time: number
    }

## Example Queries

Number of exercises that the player solved in a set of two

    $.player.submissions[?((@.exerciseId === ${V0} || @.exerciseId === ${V1}) && @.result === "ACCEPTED")].length


